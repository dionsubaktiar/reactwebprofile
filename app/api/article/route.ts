import { NextRequest, NextResponse } from "next/server";

let articlesStore = [
  { id: 1, title: "Modern Serverless Architecture", content: "Membangun sistem modular headless & serverless dengan Next.js App Router.", author: "Hermes Team", created_at: "2026-03-01" },
  { id: 2, title: "Clean Code & Automated SDLC Swarm", content: "Pola orkestrasi agen otonom untuk delivery software berkualitas tinggi.", author: "Hermes Team", created_at: "2026-03-05" }
];

export async function GET() {
  return NextResponse.json({ message: "Success", data: articlesStore });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newArt = { id: Date.now(), ...body, created_at: new Date().toISOString().split("T")[0] };
    articlesStore.unshift(newArt);
    return NextResponse.json({ message: "Article created", data: newArt }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Failed" }, { status: 400 });
  }
}
