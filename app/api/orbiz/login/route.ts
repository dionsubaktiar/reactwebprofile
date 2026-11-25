import { NextRequest, NextResponse } from "next/server";

// Akun demo mock — HANYA untuk mode mock (tanpa backend Laravel).
// Bukan keamanan sungguhan: kredensial ini sengaja terdokumentasi di halaman
// login supaya sandbox bisa dicoba. Perbaikan mock auth yang lebih konsisten
// (termasuk /api/me dan /api/orbiz/me) dijadwalkan di Hari 21 roadmap.
const DEMO_USER = {
  id: 1,
  name: "Admin Orbiz",
  email: "admin@orbiz.com",
  email_verified_at: null,
  provider: null,
  provider_id: null,
  avatar: null,
  created_at: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-01-01T00:00:00.000Z",
};
const DEMO_PASSWORD = "admin123";

export async function POST(request: NextRequest) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Body request tidak valid." },
      { status: 400 },
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email dan kata sandi wajib diisi." },
      { status: 400 },
    );
  }

  if (email !== DEMO_USER.email || password !== DEMO_PASSWORD) {
    return NextResponse.json(
      { message: "Email atau kata sandi salah." },
      { status: 401 },
    );
  }

  return NextResponse.json({
    message: "Login successful",
    access_token: "mock-token-orbiz-12345",
    user: DEMO_USER,
  });
}
