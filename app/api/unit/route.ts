import { NextRequest, NextResponse } from "next/server";
import { initialUnits, Unit, initialCustomers } from "../mockData";

let unitsStore: Unit[] = [...initialUnits];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = 10;
  const total = unitsStore.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const pagedData = unitsStore.slice(start, start + perPage);

  return NextResponse.json({
    message: "Success",
    data: {
      current_page: page,
      data: pagedData,
      last_page: lastPage,
      prev_page_url: page > 1 ? `/api/unit?page=${page - 1}` : null,
      next_page_url: page < lastPage ? `/api/unit?page=${page + 1}` : null,
      total: total
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newUnit: Unit = {
      id: Date.now(),
      nopol: body.nopol || "L 0000 XX",
      tipe: body.tipe || "Truk Standard",
      driver: body.driver || "-",
      tahun: body.tahun || "2024",
      id_customer: Number(body.id_customer) || 1,
      customers: initialCustomers[0]
    };
    unitsStore.unshift(newUnit);
    return NextResponse.json({ message: "Unit created successfully", data: newUnit }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Failed to create unit" }, { status: 400 });
  }
}
