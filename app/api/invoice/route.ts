import { NextRequest, NextResponse } from "next/server";
import { initialInvoices, Invoice, initialUnits, initialPackages } from "../mockData";

let invoicesStore: Invoice[] = [...initialInvoices];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = 10;
  const total = invoicesStore.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const pagedData = invoicesStore.slice(start, start + perPage);

  return NextResponse.json({
    message: "Success",
    data: {
      current_page: page,
      data: pagedData,
      last_page: lastPage,
      prev_page_url: page > 1 ? `/api/invoice?page=${page - 1}` : null,
      next_page_url: page < lastPage ? `/api/invoice?page=${page + 1}` : null,
      total: total
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newInvoice: Invoice = {
      id: Date.now(),
      kilometer: Number(body.kilometer) || 10000,
      tanggal: body.tanggal || new Date().toISOString().split("T")[0],
      harga: Number(body.harga) || 1500000,
      id_package: Number(body.id_package) || 1,
      status_invoice: body.status_invoice || "Pending",
      status_spk: body.status_spk || "Dalam Pengerjaan",
      units: initialUnits[0],
      packages: initialPackages[0]
    };
    invoicesStore.unshift(newInvoice);
    return NextResponse.json({ message: "Invoice created successfully", data: newInvoice }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Failed to create invoice" }, { status: 400 });
  }
}
