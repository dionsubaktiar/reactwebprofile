import { NextRequest, NextResponse } from "next/server";
import { usersStore, type UserProfile } from "../_usersStore";

export async function GET() {
  return NextResponse.json({ message: "Success", data: usersStore.items });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!name || !email) {
      return NextResponse.json(
        { message: "Nama dan email wajib diisi." },
        { status: 400 },
      );
    }

    const id = String(usersStore.nextIdCounter);
    usersStore.nextIdCounter += 1;

    const newUser: UserProfile = {
      id,
      name,
      email,
      bio:
        typeof body?.bio === "string" && body.bio.trim()
          ? body.bio.trim()
          : null,
      image: null,
    };

    usersStore.items.unshift(newUser);
    return NextResponse.json(
      { message: "User created", data: newUser },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Gagal menambahkan pengguna." },
      { status: 400 },
    );
  }
}
