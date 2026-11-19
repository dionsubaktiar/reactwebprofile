import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const mockBooks = [
    { id: 1, title: "Clean Code", author: "Robert C. Martin", description: "A handbook of agile software craftsmanship", likes_count: 42 },
    { id: 2, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", description: "The big ideas behind reliable, scalable, and maintainable systems", likes_count: 68 },
    { id: 3, title: "Refactoring", author: "Martin Fowler", description: "Improving the design of existing code", likes_count: 35 }
  ];
  const filtered = mockBooks.filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
  return NextResponse.json({ message: "Success", data: filtered });
}
