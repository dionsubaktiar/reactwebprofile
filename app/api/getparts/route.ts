import { NextResponse } from "next/server";
import { initialParts } from "../mockData";

export async function GET() {
  return NextResponse.json({
    message: "Success",
    data: initialParts
  });
}
