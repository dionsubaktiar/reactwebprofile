import { NextRequest, NextResponse } from "next/server";
import { initialCustomers } from "../../mockData";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numId = parseInt(id, 10);
  const found = initialCustomers.find((c) => c.id === numId) || initialCustomers[0];
  return NextResponse.json({ message: "Success", data: found });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    return NextResponse.json({ message: "Customer updated successfully", data: { id, ...body } });
  } catch {
    return NextResponse.json({ message: "Failed to update" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await params;
  return NextResponse.json({ message: "Customer deleted successfully" });
}
