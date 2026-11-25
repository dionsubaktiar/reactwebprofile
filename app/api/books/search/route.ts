import { NextRequest, NextResponse } from "next/server";
import { booksStore } from "../../_booksStore";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const filtered = booksStore.items.filter(
    (b) =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.genre.toLowerCase().includes(q),
  );
  return NextResponse.json({ message: "Success", data: filtered });
}
