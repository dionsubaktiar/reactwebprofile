import { NextRequest, NextResponse } from "next/server";
import {
  customersStore,
  getByIdOr404,
  parsePositiveId,
  removeById,
  replaceById,
  unitsStore,
} from "../../_store";
import { validateUnit } from "../../_validate";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numId = parsePositiveId(id);
  const found = numId === null ? null : getByIdOr404(unitsStore, numId);
  if (!found) {
    return NextResponse.json({ message: "Unit not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Success", data: found });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const numId = parsePositiveId(id);
    if (numId === null) {
      return NextResponse.json({ message: "Unit not found" }, { status: 404 });
    }
    const existing = getByIdOr404(unitsStore, numId);
    if (!existing) {
      return NextResponse.json({ message: "Unit not found" }, { status: 404 });
    }
    const body = await request.json();
    const merged = {
      ...existing,
      nopol: body.nopol !== undefined ? String(body.nopol) : existing.nopol,
      tipe: body.tipe !== undefined ? String(body.tipe) : existing.tipe,
      no_rangka:
        body.no_rangka !== undefined ? String(body.no_rangka) : existing.no_rangka,
      no_mesin:
        body.no_mesin !== undefined ? String(body.no_mesin) : existing.no_mesin,
      driver: body.driver !== undefined ? String(body.driver) : existing.driver,
      tahun: body.tahun !== undefined ? String(body.tahun) : existing.tahun,
      japo_kir:
        body.japo_kir !== undefined ? String(body.japo_kir) : existing.japo_kir,
      japo_pajak:
        body.japo_pajak !== undefined
          ? String(body.japo_pajak)
          : existing.japo_pajak,
      japo_stnk:
        body.japo_stnk !== undefined ? String(body.japo_stnk) : existing.japo_stnk,
      japo_kontrak:
        body.japo_kontrak !== undefined
          ? String(body.japo_kontrak)
          : existing.japo_kontrak,
      status:
        body.status !== undefined ? Boolean(body.status) : existing.status,
      id: numId,
    };
    if (body.id_customer !== undefined) {
      merged.id_customer = Number(body.id_customer);
      merged.customers =
        getByIdOr404(customersStore, Number(body.id_customer)) ?? undefined;
    }
    const error = validateUnit(merged);
    if (error) {
      return NextResponse.json({ message: error }, { status: 400 });
    }
    const updated = replaceById(unitsStore, numId, merged);
    return NextResponse.json({
      message: "Unit updated successfully",
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to update unit" },
      { status: 400 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numId = parsePositiveId(id);
  if (numId === null || !removeById(unitsStore, numId)) {
    return NextResponse.json({ message: "Unit not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Unit deleted successfully" });
}
