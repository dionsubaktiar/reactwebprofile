import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mockDetail = {
    id: parseInt(id, 10),
    nama_konsumen: "Ahmad Subagio",
    nik: "3578012345670001",
    telepon: "0812-3456-7890",
    alamat: "Jl. Rungkut Menanggal Harapan B-12, Surabaya",
    nama_kendaraan: "Toyota Avanza 1.5 G MT",
    nomor_polisi: "L 1420 AB",
    tahun: 2022,
    harga_kendaraan: 215000000,
    dp: 43000000,
    pokok_hutang: 172000000,
    tenor: 36,
    bunga_tahunan: 7.5,
    angsuran_per_bulan: 5847778,
    status_pengajuan: "APPROVED",
    created_at: "2026-03-10"
  };
  return NextResponse.json({ status: "success", data: mockDetail });
}
