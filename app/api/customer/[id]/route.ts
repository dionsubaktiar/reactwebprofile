import { NextRequest, NextResponse } from "next/server";
import {
  customersStore,
  getByIdOr404,
  removeById,
  replaceById,
} from "../../_store";
import { validateCustomer } from "../../_validate";

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
  const found = numId === null ? null : getByIdOr404(customersStore, numId);
  if (!found) {
    return NextResponse.json(
      { message: "Customer not found" },
      { status: 404 },
    );
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
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 },
      );
    }
    const existing = getByIdOr404(customersStore, numId);
    if (!existing) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 },
      );
    }
    const body = await request.json();
    const merged = {
      ...existing,
      ...body,
      id: numId,
      updated_at: new Date().toISOString().split("T")[0],
    };
    const error = validateCustomer(merged);
    if (error) {
      return NextResponse.json({ message: error }, { status: 400 });
    }
    const updated = replaceById(customersStore, numId, merged);
    return NextResponse.json({
      message: "Customer updated successfully",
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to update" },
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
  if (numId === null || !removeById(customersStore, numId)) {
    return NextResponse.json(
      { message: "Customer not found" },
      { status: 404 },
    );
  }
  return NextResponse.json({ message: "Customer deleted successfully" });
}
