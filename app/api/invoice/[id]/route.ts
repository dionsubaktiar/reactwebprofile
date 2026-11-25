import { NextRequest, NextResponse } from "next/server";
import {
  getByIdOr404,
  invoicesStore,
  packagesStore,
  removeById,
  replaceById,
  unitsStore,
} from "../../_store";
import { normalizeInvoiceParts, validateInvoice, validateInvoiceStatusTransition } from "../../_validate";

function parseId(id: string): number | null {
  const numId = parseInt(id, 10);
  return Number.isFinite(numId) ? numId : null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numId = parseId(id);
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
    const numId = parseId(id);
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
    // `id` dan `id_part` bukan field Invoice yang tersimpan — `id_part`
    // dinormalisasi ke `parts` di bawah, `id` tidak boleh diubah.
    const { id: _ignoredId, id_part, ...rest } = body;
    const merged = { ...existing, ...rest, id: numId };
    if (id_part !== undefined) {
      merged.parts = normalizeInvoiceParts(id_part);
    }
    if (body.id_unit !== undefined) {
      const unit = getByIdOr404(unitsStore, Number(body.id_unit));
      if (unit) {
        merged.units = unit;
        merged.id_unit = unit.id;
      }
    }
    if (body.id_package !== undefined) {
      const pkg = getByIdOr404(packagesStore, Number(body.id_package));
      if (pkg) {
        merged.packages = pkg;
        merged.id_package = pkg.id;
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
  const numId = parseId(id);
  if (numId === null || !removeById(invoicesStore, numId)) {
    return NextResponse.json(
      { message: "Invoice not found" },
      { status: 404 },
    );
  }
  return NextResponse.json({ message: "Invoice deleted successfully" });
}
