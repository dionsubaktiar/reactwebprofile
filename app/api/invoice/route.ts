import { NextRequest, NextResponse } from "next/server";
import {
  getByIdOr404,
  invoicesStore,
  nextId,
  packagesStore,
  paginate,
  unitsStore,
} from "../_store";
import { normalizeInvoiceParts, validateInvoice } from "../_validate";
import type { Invoice } from "@/app/lib/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") || "10", 10);

  return NextResponse.json({
    message: "Success",
    data: paginate(invoicesStore, page, perPage, "/api/invoice"),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const error = validateInvoice(body);
    if (error) {
      return NextResponse.json({ message: error }, { status: 400 });
    }
    const idUnit = Number(body.id_unit);
    if (Number.isFinite(idUnit) && idUnit > 0) {
      const foundUnit = getByIdOr404(unitsStore, idUnit);
      if (!foundUnit) {
        return NextResponse.json(
          { message: "Unit tidak ditemukan" },
          { status: 400 },
        );
      }
    }
    const idPackage = Number(body.id_package);
    const hasPackage = Number.isFinite(idPackage) && idPackage > 0;
    const parts = normalizeInvoiceParts(body.id_part);
    const partsTotal = parts.reduce((sum, p) => sum + (p.total_price ?? 0), 0);
    const newInvoice: Invoice = {
      id: nextId(invoicesStore),
      kilometer: Number(body.kilometer),
      tanggal: body.tanggal,
      harga:
        Number(body.harga) > 0
          ? Number(body.harga)
          : partsTotal > 0
            ? partsTotal
            : 1500000,
      id_package: hasPackage ? idPackage : 0,
      id_unit:
        Number.isFinite(idUnit) && idUnit > 0 ? idUnit : undefined,
      status_invoice: body.status_invoice || "Pending",
      status_spk: body.status_spk || "Dalam Pengerjaan",
      units:
        (Number.isFinite(idUnit) && idUnit > 0
          ? getByIdOr404(unitsStore, idUnit)
          : null) ?? unitsStore.items[0],
      packages: hasPackage
        ? (getByIdOr404(packagesStore, idPackage) ?? null)
        : null,
      parts,
    };
    invoicesStore.items.unshift(newInvoice);
    return NextResponse.json(
      { message: "Invoice created successfully", data: newInvoice },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Failed to create invoice" },
      { status: 400 },
    );
  }
}
