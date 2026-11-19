import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "success",
    data: [
      { id: 1, nama: "Ahmad Subagio", nik: "3578012345670001", telepon: "0812-3456-7890" },
      { id: 2, nama: "Dewi Lestari", nik: "3171098765430002", telepon: "0813-8899-7711" }
    ]
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({ status: "success", message: "Konsumen berhasil disimpan", data: { id: Date.now(), ...body } }, { status: 201 });
  } catch {
    return NextResponse.json({ status: "error", message: "Gagal menyimpan konsumen" }, { status: 400 });
  }
}
