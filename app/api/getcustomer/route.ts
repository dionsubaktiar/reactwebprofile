import { NextResponse } from "next/server";
import { initialCustomers } from "../mockData";

export async function GET() {
  return NextResponse.json({
    message: "Success",
    data: initialCustomers
  });
}
