import { NextRequest, NextResponse } from "next/server";
import { kendaraanStore } from "../_creditStore";
import { nextId } from "../_store";

export async function GET() {
  return NextResponse.json({
    status: "success",
    data: kendaraanStore.items,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const merk =
      typeof body?.merk_kendaraan === "string"
        ? body.merk_kendaraan.trim()
        : "";
    const model =
      typeof body?.model_kendaraan === "string"
        ? body.model_kendaraan.trim()
        : "";
    const harga = Number(body?.harga_kendaraan);

    if (!merk || !model || !Number.isFinite(harga) || harga <= 0) {
      return NextResponse.json(
        {
          status: "error",
          message: "Merk, model, dan harga kendaraan (> 0) wajib diisi.",
        },
        { status: 400 },
      );
    }

    const newItem = {
      id: nextId(kendaraanStore),
      dealer:
        typeof body?.dealer === "string" && body.dealer.trim()
          ? body.dealer.trim()
          : "Dealer Rekanan",
      merk_kendaraan: merk,
      model_kendaraan: model,
      warna_kendaraan:
        typeof body?.warna_kendaraan === "string" && body.warna_kendaraan.trim()
          ? body.warna_kendaraan.trim()
          : "Hitam",
      harga_kendaraan: String(Math.round(harga)),
    };

    kendaraanStore.items.unshift(newItem);
    return NextResponse.json(
      {
        status: "success",
        message: "Kendaraan berhasil disimpan",
        data: newItem,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { status: "error", message: "Gagal menyimpan kendaraan" },
      { status: 400 },
    );
  }
}
