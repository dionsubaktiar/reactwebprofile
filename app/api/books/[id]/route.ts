import { NextRequest, NextResponse } from "next/server";
import { booksStore } from "../../_booksStore";
import { getByIdOr404, parsePositiveId, removeById } from "../../_store";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numId = parsePositiveId(id);
  const found = numId === null ? null : getByIdOr404(booksStore, numId);
  if (!found) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Success", data: found });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numId = parsePositiveId(id);
  if (numId === null || !removeById(booksStore, numId)) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Book deleted" });
}
