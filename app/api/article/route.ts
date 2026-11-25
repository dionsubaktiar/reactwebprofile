import { NextRequest, NextResponse } from "next/server";
import { articlesStore } from "../_articlesStore";
import { nextId } from "../_store";

export async function GET() {
  return NextResponse.json({ message: "Success", data: articlesStore.items });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const article =
      typeof body?.article === "string"
        ? body.article.trim()
        : typeof body?.content === "string"
          ? body.content.trim()
          : "";

    if (!title || !article) {
      return NextResponse.json(
        { message: "Judul dan isi artikel wajib diisi." },
        { status: 400 },
      );
    }

    const newArt = {
      id: nextId(articlesStore),
      title,
      article,
      author:
        typeof body?.author === "string" && body.author.trim()
          ? body.author.trim()
          : "Admin Orbiz",
      created_at: new Date().toISOString().split("T")[0],
      status: (body?.status === "Draft" ? "Draft" : "Published") as
        | "Published"
        | "Draft",
    };

    articlesStore.items.unshift(newArt);
    return NextResponse.json(
      { message: "Article created", data: newArt },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Gagal membuat artikel." },
      { status: 400 },
    );
  }
}
