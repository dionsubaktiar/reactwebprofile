import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "CSRF cookie set", csrf_token: "mock-csrf-token" });
  response.cookies.set("XSRF-TOKEN", "mock-csrf-token", { path: "/" });
  return response;
}
