import { NextRequest, NextResponse } from "next/server";
import { nextId, paginate, partsStore } from "../_store";
import { validatePart } from "../_validate";
import type { Part } from "@/app/lib/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") || "10", 10);

  return NextResponse.json({
    message: "Success",
    data: paginate(partsStore, page, perPage, "/api/part"),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const error = validatePart(body);
    if (error) {
      return NextResponse.json({ message: error }, { status: 400 });
    }
    const newPart: Part = {
      id: nextId(partsStore),
      part_number: body.part_number || "PRT-NEW",
      nama_barang: body.nama_barang.trim(),
      merk: body.merk || "Generic",
      kendaraan: body.kendaraan || "All Trucks",
      harga: Number(body.harga) || 0,
      jasa: Number(body.jasa) || 0,
    };
    partsStore.items.unshift(newPart);
    return NextResponse.json(
      { message: "Part created successfully", data: newPart },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Failed to create part" },
      { status: 400 },
    );
  }
}
