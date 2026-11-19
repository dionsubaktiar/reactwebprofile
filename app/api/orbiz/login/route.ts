import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  return NextResponse.json({
    message: "Login successful",
    access_token: "mock-token-orbiz-12345",
    user: { id: 1, name: "Admin Orbiz", email: "admin@orbiz.com" }
  });
}
