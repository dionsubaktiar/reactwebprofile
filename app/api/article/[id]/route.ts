import { NextRequest, NextResponse } from "next/server";
import { articlesStore } from "../../_articlesStore";
import {
  getByIdOr404,
  parsePositiveId,
  removeById,
  replaceById,
} from "../../_store";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numId = parsePositiveId(id);
  const found = numId === null ? null : getByIdOr404(articlesStore, numId);
  if (!found) {
    return NextResponse.json(
      { message: "Artikel tidak ditemukan." },
      { status: 404 },
    );
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
      return NextResponse.json(
        { message: "Artikel tidak ditemukan." },
        { status: 404 },
      );
    }
    const existing = getByIdOr404(articlesStore, numId);
    if (!existing) {
      return NextResponse.json(
        { message: "Artikel tidak ditemukan." },
        { status: 404 },
      );
    }

    const body = await request.json();
    const title =
      typeof body?.title === "string" ? body.title.trim() : existing.title;
    const article =
      typeof body?.article === "string"
        ? body.article.trim()
        : typeof body?.content === "string"
          ? body.content.trim()
          : existing.article;

    if (!title || !article) {
      return NextResponse.json(
        { message: "Judul dan isi artikel wajib diisi." },
        { status: 400 },
      );
    }

    const updated = replaceById(articlesStore, numId, {
      title,
      article,
      status:
        body?.status === "Draft" || body?.status === "Published"
          ? body.status
          : existing.status,
    });
    return NextResponse.json({ message: "Article updated", data: updated });
  } catch {
    return NextResponse.json(
      { message: "Gagal memperbarui artikel." },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numId = parsePositiveId(id);
  if (numId === null || !removeById(articlesStore, numId)) {
    return NextResponse.json(
      { message: "Artikel tidak ditemukan." },
      { status: 404 },
    );
  }
  return NextResponse.json({ message: "Article deleted" });
}
