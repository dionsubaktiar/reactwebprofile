import { NextRequest, NextResponse } from "next/server";
import { booksStore } from "../_booksStore";
import { nextId } from "../_store";

export async function GET() {
  return NextResponse.json({ message: "Success", data: booksStore.items });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const author = typeof body?.author === "string" ? body.author.trim() : "";
    if (!title || !author) {
      return NextResponse.json(
        { message: "Judul dan nama penulis wajib diisi." },
        { status: 400 },
      );
    }

    const newBook = {
      id: nextId(booksStore),
      title,
      author,
      genre:
        typeof body?.genre === "string" && body.genre.trim()
          ? body.genre.trim()
          : "Engineering",
      description:
        typeof body?.description === "string" && body.description.trim()
          ? body.description.trim()
          : "Buku referensi arsitektur dan rekayasa perangkat lunak.",
      likes_count: 0,
    };

    booksStore.items.unshift(newBook);
    return NextResponse.json(
      { message: "Book created", data: newBook },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Gagal menambahkan buku." },
      { status: 400 },
    );
  }
}
