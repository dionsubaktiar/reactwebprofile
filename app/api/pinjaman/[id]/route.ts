import { NextRequest, NextResponse } from "next/server";
import { pinjamanStore } from "../../_creditStore";
import { getByIdOr404, parsePositiveId } from "../../_store";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numId = parsePositiveId(id);
  const found = numId === null ? null : getByIdOr404(pinjamanStore, numId);
  if (!found) {
    return NextResponse.json(
      { status: "error", message: "Pengajuan pinjaman tidak ditemukan." },
      { status: 404 },
    );
  }
  return NextResponse.json({ status: "success", data: found });
}
