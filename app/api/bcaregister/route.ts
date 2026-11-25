import { NextRequest, NextResponse } from "next/server";
import { konsumenStore } from "../_creditStore";
import { nextId } from "../_store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const nama = typeof body?.nama === "string" ? body.nama.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const nik = typeof body?.nik === "string" ? body.nik.trim() : "";

    if (!nama || !email || !nik) {
      return NextResponse.json(
        { status: "error", message: "Nama, email, dan NIK wajib diisi." },
        { status: 400 },
      );
    }

    const newItem = {
      id: nextId(konsumenStore),
      username:
        typeof body?.username === "string" && body.username.trim()
          ? body.username.trim()
          : email.split("@")[0],
      email,
      nama,
      nik,
      tanggal_lahir:
        typeof body?.tanggal_lahir === "string" && body.tanggal_lahir.trim()
          ? body.tanggal_lahir.trim()
          : "1995-01-01",
      status_perkawinan:
        typeof body?.status_perkawinan === "string" &&
        body.status_perkawinan.trim()
          ? body.status_perkawinan.trim()
          : "Single",
      data_pasangan: null,
    };

    konsumenStore.items.unshift(newItem);
    return NextResponse.json(
      {
        status: "success",
        message: "Registrasi konsumen berhasil",
        data: newItem,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { status: "error", message: "Gagal registrasi konsumen" },
      { status: 400 },
    );
  }
}
