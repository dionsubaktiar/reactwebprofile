import { NextRequest, NextResponse } from "next/server";
import {
  getByIdOr404,
  parsePositiveId,
  partsStore,
  removeById,
  replaceById,
} from "../../_store";
import { validatePart } from "../../_validate";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numId = parsePositiveId(id);
  const found = numId === null ? null : getByIdOr404(partsStore, numId);
  if (!found) {
    return NextResponse.json({ message: "Part not found" }, { status: 404 });
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
      return NextResponse.json({ message: "Part not found" }, { status: 404 });
    }
    const existing = getByIdOr404(partsStore, numId);
    if (!existing) {
      return NextResponse.json({ message: "Part not found" }, { status: 404 });
    }
    const body = await request.json();
    const merged = {
      ...existing,
      part_number:
        body.part_number !== undefined
          ? String(body.part_number)
          : existing.part_number,
      nama_barang:
        body.nama_barang !== undefined
          ? String(body.nama_barang)
          : existing.nama_barang,
      kendaraan:
        body.kendaraan !== undefined ? String(body.kendaraan) : existing.kendaraan,
      merk: body.merk !== undefined ? String(body.merk) : existing.merk,
      id: numId,
      harga:
        body.harga !== undefined ? Number(body.harga) || 0 : existing.harga,
      jasa: body.jasa !== undefined ? Number(body.jasa) || 0 : existing.jasa,
    };
    const error = validatePart(merged);
    if (error) {
      return NextResponse.json({ message: error }, { status: 400 });
    }
    const updated = replaceById(partsStore, numId, merged);
    return NextResponse.json({
      message: "Part updated successfully",
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to update part" },
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
  if (numId === null || !removeById(partsStore, numId)) {
    return NextResponse.json({ message: "Part not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Part deleted successfully" });
}
