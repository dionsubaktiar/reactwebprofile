import { NextResponse } from "next/server";
import { initialUnits } from "../mockData";

export async function GET() {
  return NextResponse.json({
    message: "Success",
    data: initialUnits
  });
}
