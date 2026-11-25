import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  await params;
  return NextResponse.redirect(
    new URL("/auth-crud/callback?token=mock-token-orbiz-12345", request.url),
  );
}
