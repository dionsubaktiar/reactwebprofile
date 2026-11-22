import { NextResponse } from "next/server";
import { paginate, unitsStore } from "../_store";

export async function GET() {
  // Bentuk respons disamakan dengan resource lain:
  // `{ message, data: Paginated<Unit> }` — sebelumnya `data` berisi
  // array langsung. Dipakai sebagai dropdown di form invoice.
  return NextResponse.json({
    message: "Success",
    data: paginate(unitsStore, 1, Math.max(unitsStore.items.length, 1)),
  });
}
