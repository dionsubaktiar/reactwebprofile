import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({ status: "success", message: "Registrasi BCA berhasil", data: body }, { status: 201 });
  } catch {
    return NextResponse.json({ status: "error", message: "Gagal registrasi" }, { status: 400 });
  }
}
