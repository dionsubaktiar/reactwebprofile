import { NextRequest, NextResponse } from "next/server";

const mockPinjaman = [
  {
    id: 1,
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
  },
  {
    id: 2,
    nama_konsumen: "Dewi Lestari",
    nik: "3171098765430002",
    telepon: "0813-8899-7711",
    alamat: "Jl. Tebet Barat Dalam Raya No. 40, Jakarta Selatan",
    nama_kendaraan: "Honda HR-V 1.5 SE CVT",
    nomor_polisi: "B 2891 UJK",
    tahun: 2023,
    harga_kendaraan: 399000000,
    dp: 79800000,
    pokok_hutang: 319200000,
    tenor: 48,
    bunga_tahunan: 7.0,
    angsuran_per_bulan: 8512000,
    status_pengajuan: "IN_REVIEW",
    created_at: "2026-03-12"
  }
];

export async function GET() {
  return NextResponse.json({
    status: "success",
    data: mockPinjaman
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({
      status: "success",
      message: "Pengajuan pinjaman berhasil dibuat",
      data: { id: Date.now(), ...body }
    }, { status: 201 });
  } catch {
    return NextResponse.json({ status: "error", message: "Failed" }, { status: 400 });
  }
}
