import { NextResponse } from "next/server";
import { paginate, partsStore } from "../_store";

export async function GET() {
  // Bentuk respons disamakan dengan resource lain:
  // `{ message, data: Paginated<Part> }` — sebelumnya `data` berisi
  // array langsung. Dipakai sebagai dropdown di form invoice.
  return NextResponse.json({
    message: "Success",
    data: paginate(partsStore, 1, Math.max(partsStore.items.length, 1)),
  });
}
