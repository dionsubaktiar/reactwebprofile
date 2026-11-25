import { NextRequest, NextResponse } from "next/server";
import { booksStore } from "../../../_booksStore";
import { getByIdOr404, parsePositiveId, replaceById } from "../../../_store";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numId = parsePositiveId(id);
  const found = numId === null ? null : getByIdOr404(booksStore, numId);
  if (!found || numId === null) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  let action: "like" | "unlike" = "like";
  try {
    const body = await request.json();
    if (body?.action === "unlike") action = "unlike";
  } catch {
    // Body opsional — default "like"
  }

  const nextCount =
    action === "unlike"
      ? Math.max(0, found.likes_count - 1)
      : found.likes_count + 1;
  const updated = replaceById(booksStore, numId, { likes_count: nextCount });
  return NextResponse.json({
    message: action === "unlike" ? "Book unliked" : "Book liked",
    data: updated,
    likes_count: updated?.likes_count ?? nextCount,
  });
}
