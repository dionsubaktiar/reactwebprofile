import { NextRequest, NextResponse } from "next/server";
import {
  getByIdOr404,
  invoicesStore,
  packagesStore,
  parsePositiveId,
  removeById,
  replaceById,
  unitsStore,
} from "../../_store";
import { normalizeInvoiceParts, validateInvoice, validateInvoiceStatusTransition } from "../../_validate";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numId = parsePositiveId(id);
  const found = numId === null ? null : getByIdOr404(invoicesStore, numId);
  if (!found) {
    return NextResponse.json(
      { message: "Invoice not found" },
      { status: 404 },
    );
  }
  return NextResponse.json({ message: "Success", data: found });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const numId = parsePositiveId(id);
    if (numId === null) {
      return NextResponse.json(
        { message: "Invoice not found" },
        { status: 404 },
      );
    }
    const existing = getByIdOr404(invoicesStore, numId);
    if (!existing) {
      return NextResponse.json(
        { message: "Invoice not found" },
        { status: 404 },
      );
    }
    const body = await request.json();
    const merged = {
      ...existing,
      kode_invoice:
        body.kode_invoice !== undefined
          ? String(body.kode_invoice)
          : existing.kode_invoice,
      tanggal:
        body.tanggal !== undefined ? String(body.tanggal) : existing.tanggal,
      status_invoice:
        body.status_invoice !== undefined
          ? body.status_invoice
          : existing.status_invoice,
      status_spk:
        body.status_spk !== undefined ? body.status_spk : existing.status_spk,
      id: numId,
    };
    if (body.id_part !== undefined) {
      merged.parts = normalizeInvoiceParts(body.id_part);
    }
    if (body.id_unit !== undefined) {
      const unit = getByIdOr404(unitsStore, Number(body.id_unit));
      if (unit) {
        merged.units = unit;
        merged.id_unit = unit.id;
      }
    }
    if (body.id_package !== undefined) {
      const pkgId = Number(body.id_package);
      if (pkgId === 0) {
        merged.packages = null;
        merged.id_package = 0;
      } else {
        const pkg = getByIdOr404(packagesStore, pkgId);
        if (pkg) {
          merged.packages = pkg;
          merged.id_package = pkg.id;
        }
      }
    }
    if (body.kilometer !== undefined) {
      merged.kilometer = Number(body.kilometer);
    }
    if (body.harga !== undefined) {
      merged.harga = Number(body.harga);
    }
    const error = validateInvoice(merged);
    if (error) {
      return NextResponse.json({ message: error }, { status: 400 });
    }
    // Transisi status (Hari 6): hanya mengikuti alur Pending → Lunas
    // (invoice) dan Pending → Dalam Pengerjaan → Selesai (SPK).
    const transitionError = validateInvoiceStatusTransition(existing, merged);
    if (transitionError) {
      return NextResponse.json({ message: transitionError }, { status: 400 });
    }
    const updated = replaceById(invoicesStore, numId, merged);
    return NextResponse.json({
      message: "Invoice updated successfully",
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to update invoice" },
      { status: 400 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numId = parsePositiveId(id);
  if (numId === null || !removeById(invoicesStore, numId)) {
    return NextResponse.json(
      { message: "Invoice not found" },
      { status: 404 },
    );
  }
  return NextResponse.json({ message: "Invoice deleted successfully" });
}
