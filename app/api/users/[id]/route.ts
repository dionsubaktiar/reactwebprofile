import { NextRequest, NextResponse } from "next/server";
import { usersStore } from "../../_usersStore";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const found = usersStore.items.find((u) => u.id === id);
  if (!found) {
    return NextResponse.json(
      { message: "Pengguna tidak ditemukan." },
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
    const index = usersStore.items.findIndex((u) => u.id === id);
    if (index === -1) {
      return NextResponse.json(
        { message: "Pengguna tidak ditemukan." },
        { status: 404 },
      );
    }

    const body = await request.json();
    const existing = usersStore.items[index];
    const name =
      typeof body?.name === "string" ? body.name.trim() : existing.name;
    const email =
      typeof body?.email === "string" ? body.email.trim() : existing.email;

    if (!name || !email) {
      return NextResponse.json(
        { message: "Nama dan email wajib diisi." },
        { status: 400 },
      );
    }

    const updated = {
      ...existing,
      name,
      email,
      bio:
        body?.bio !== undefined
          ? typeof body.bio === "string"
            ? body.bio
            : null
          : existing.bio,
    };
    usersStore.items[index] = updated;
    return NextResponse.json({ message: "User updated", data: updated });
  } catch {
    return NextResponse.json(
      { message: "Gagal memperbarui profil pengguna." },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const index = usersStore.items.findIndex((u) => u.id === id);
  if (index === -1) {
    return NextResponse.json(
      { message: "Pengguna tidak ditemukan." },
      { status: 404 },
    );
  }
  usersStore.items.splice(index, 1);
  return NextResponse.json({ message: "User deleted" });
}
