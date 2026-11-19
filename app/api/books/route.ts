import { NextRequest, NextResponse } from "next/server";

const mockBooks = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", description: "A handbook of agile software craftsmanship", likes_count: 42 },
  { id: 2, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", description: "The big ideas behind reliable, scalable, and maintainable systems", likes_count: 68 },
  { id: 3, title: "Refactoring", author: "Martin Fowler", description: "Improving the design of existing code", likes_count: 35 }
];

export async function GET() {
  return NextResponse.json({ message: "Success", data: mockBooks });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({ message: "Book created", data: { id: Date.now(), ...body } }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Failed" }, { status: 400 });
  }
}
