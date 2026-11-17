import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await params;
  return NextResponse.json({ message: "Book liked", likes_count: 43 });
}
