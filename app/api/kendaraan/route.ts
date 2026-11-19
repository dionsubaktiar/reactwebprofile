import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "success",
    data: [
      { id: 1, nama_kendaraan: "Toyota Avanza 1.5 G MT", nomor_polisi: "L 1420 AB", tahun: 2022, harga: 215000000 },
      { id: 2, nama_kendaraan: "Honda HR-V 1.5 SE CVT", nomor_polisi: "B 2891 UJK", tahun: 2023, harga: 399000000 }
    ]
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({ status: "success", message: "Kendaraan berhasil disimpan", data: { id: Date.now(), ...body } }, { status: 201 });
  } catch {
    return NextResponse.json({ status: "error", message: "Gagal menyimpan kendaraan" }, { status: 400 });
  }
}
