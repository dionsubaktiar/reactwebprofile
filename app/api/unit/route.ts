import { NextRequest, NextResponse } from "next/server";
import {
  customersStore,
  getByIdOr404,
  nextId,
  paginate,
  unitsStore,
} from "../_store";
import { validateUnit } from "../_validate";
import type { Unit } from "@/app/lib/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") || "10", 10);

  return NextResponse.json({
    message: "Success",
    data: paginate(unitsStore, page, perPage, "/api/unit"),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const error = validateUnit(body);
    if (error) {
      return NextResponse.json({ message: error }, { status: 400 });
    }
    const newUnit: Unit = {
      id: nextId(unitsStore),
      nopol: body.nopol.trim(),
      tipe: body.tipe || "Truk Standard",
      driver: body.driver || "-",
      tahun: body.tahun || "2024",
      no_rangka: body.no_rangka || undefined,
      no_mesin: body.no_mesin || undefined,
      japo_kir: body.japo_kir || null,
      japo_pajak: body.japo_pajak || null,
      japo_stnk: body.japo_stnk || null,
      japo_kontrak: body.japo_kontrak || null,
      status: body.status !== undefined ? Boolean(body.status) : undefined,
      id_customer: Number(body.id_customer) || 1,
      customers:
        getByIdOr404(customersStore, Number(body.id_customer)) ?? undefined,
    };
    unitsStore.items.unshift(newUnit);
    return NextResponse.json(
      { message: "Unit created successfully", data: newUnit },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Failed to create unit" },
      { status: 400 },
    );
  }
}
