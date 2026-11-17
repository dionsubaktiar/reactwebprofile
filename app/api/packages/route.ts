import { NextResponse } from "next/server";
import { initialPackages } from "../mockData";

export async function GET() {
  return NextResponse.json({
    message: "Success",
    data: initialPackages
  });
}
