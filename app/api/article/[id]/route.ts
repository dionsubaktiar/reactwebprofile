import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const art = {
    id: parseInt(id, 10),
    title: "Modern Serverless Architecture",
    content: "Membangun sistem modular headless & serverless dengan Next.js App Router.",
    author: "Hermes Team"
  };
  return NextResponse.json({ message: "Success", data: art });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    return NextResponse.json({ message: "Article updated", data: { id, ...body } });
  } catch {
    return NextResponse.json({ message: "Failed" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await params;
  return NextResponse.json({ message: "Article deleted" });
}
