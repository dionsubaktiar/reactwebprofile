import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({
      message: "Registration successful",
      user: { id: Date.now(), name: body.name || "New User", email: body.email }
    }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Registration failed" }, { status: 400 });
  }
}
