import { NextRequest, NextResponse } from "next/server";
import {
  customersStore,
  getByIdOr404,
  removeById,
  replaceById,
  unitsStore,
} from "../../_store";
import { validateUnit } from "../../_validate";

function parseId(id: string): number | null {
  const numId = parseInt(id, 10);
  return Number.isFinite(numId) ? numId : null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numId = parseId(id);
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
    const numId = parseId(id);
    if (numId === null) {
      return NextResponse.json({ message: "Unit not found" }, { status: 404 });
    }
    const existing = getByIdOr404(unitsStore, numId);
    if (!existing) {
      return NextResponse.json({ message: "Unit not found" }, { status: 404 });
    }
    const body = await request.json();
    const merged = { ...existing, ...body, id: numId };
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
  const numId = parseId(id);
  if (numId === null || !removeById(unitsStore, numId)) {
    return NextResponse.json({ message: "Unit not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Unit deleted successfully" });
}
