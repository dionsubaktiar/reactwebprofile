import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? "";
  if (!authHeader.startsWith("Bearer ") || !authHeader.slice(7).trim()) {
    return NextResponse.json(
      { message: "Token otorisasi tidak valid." },
      { status: 401 },
    );
  }

  return NextResponse.json({
    user: {
      id: 1,
      name: "Admin Orbiz",
      email: "admin@orbiz.com",
      email_verified_at: null,
      provider: "oauth",
      provider_id: "mock-oauth-1",
      avatar: null,
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-01-01T00:00:00.000Z",
    },
  });
}
