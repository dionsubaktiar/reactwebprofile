import { NextRequest, NextResponse } from "next/server";
import {
  kendaraanStore,
  konsumenStore,
  pinjamanStore,
  type PinjamanItem,
} from "../_creditStore";
import { getByIdOr404, nextId } from "../_store";

export async function GET() {
  return NextResponse.json({
    status: "success",
    data: pinjamanStore.items,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const idKendaraan = Number(body?.id_kendaraan);
    const idUser = Number(body?.id_user);
    const tenor = Number(body?.tenor);
    const dp = Math.max(0, Number(body?.down_payment) || 0);

    if (
      !Number.isFinite(idKendaraan) ||
      idKendaraan <= 0 ||
      !Number.isFinite(idUser) ||
      idUser <= 0 ||
      !Number.isFinite(tenor) ||
      tenor <= 0
    ) {
      return NextResponse.json(
        {
          status: "error",
          message: "Kendaraan, konsumen, dan tenor (> 0) wajib diisi.",
        },
        { status: 400 },
      );
    }

    const kendaraan = getByIdOr404(kendaraanStore, idKendaraan);
    const konsumen = getByIdOr404(konsumenStore, idUser);
    if (!kendaraan || !konsumen) {
      return NextResponse.json(
        {
          status: "error",
          message: "Data kendaraan atau konsumen tidak ditemukan.",
        },
        { status: 400 },
      );
    }

    const otr = Number(kendaraan.harga_kendaraan) || 0;
    const pokok = Math.max(0, otr - dp);
    const totalBunga = pokok * 0.075 * (tenor / 12);
    const computedAngsuran = Math.round((pokok + totalBunga) / tenor);

    const newPinjaman: PinjamanItem = {
      id: nextId(pinjamanStore),
      asuransi:
        body?.asuransi !== undefined && String(body.asuransi).trim() !== ""
          ? String(body.asuransi)
          : "5000000",
      down_payment: String(Math.round(dp)),
      tenor,
      angsuran:
        Number(body?.angsuran) > 0
          ? String(Math.round(Number(body.angsuran)))
          : String(computedAngsuran),
      status: "Dalam Review",
      kendaraan,
      konsumen,
    };

    pinjamanStore.items.unshift(newPinjaman);
    return NextResponse.json(
      {
        status: "success",
        message: "Pengajuan pinjaman berhasil dibuat",
        data: newPinjaman,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { status: "error", message: "Gagal membuat pengajuan pinjaman" },
      { status: 400 },
    );
  }
}
