import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const password =
      typeof body?.password === "string" ? body.password : "";

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Nama, email, dan kata sandi wajib diisi." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Registration successful",
        user: { id: Date.now(), name, email },
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 400 },
    );
  }
}
