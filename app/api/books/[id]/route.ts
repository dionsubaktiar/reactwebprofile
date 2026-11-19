import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const b = { id: parseInt(id, 10), title: "Clean Code", author: "Robert C. Martin", description: "Handbook", likes_count: 42 };
  return NextResponse.json({ message: "Success", data: b });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await params;
  return NextResponse.json({ message: "Book deleted" });
}
