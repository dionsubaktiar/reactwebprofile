import { NextRequest, NextResponse } from "next/server";
import { initialParts, Part } from "../mockData";

let partsStore: Part[] = [...initialParts];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = 10;
  const total = partsStore.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const pagedData = partsStore.slice(start, start + perPage);

  return NextResponse.json({
    message: "Success",
    data: {
      current_page: page,
      data: pagedData,
      last_page: lastPage,
      prev_page_url: page > 1 ? `/api/part?page=${page - 1}` : null,
      next_page_url: page < lastPage ? `/api/part?page=${page + 1}` : null,
      total: total
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newPart: Part = {
      id: Date.now(),
      part_number: body.part_number || "PRT-NEW",
      nama_barang: body.nama_barang || "Sparepart Baru",
      merk: body.merk || "Generic",
      kendaraan: body.kendaraan || "All Trucks",
      harga: Number(body.harga) || 0,
      jasa: Number(body.jasa) || 0
    };
    partsStore.unshift(newPart);
    return NextResponse.json({ message: "Part created successfully", data: newPart }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create part" }, { status: 400 });
  }
}
