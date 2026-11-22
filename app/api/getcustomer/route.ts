import { NextResponse } from "next/server";
import { customersStore, paginate } from "../_store";

export async function GET() {
  // Bentuk respons disamakan dengan resource lain:
  // `{ message, data: Paginated<Customer> }` — sebelumnya `data` berisi
  // array langsung. Dipakai sebagai dropdown di form unit.
  return NextResponse.json({
    message: "Success",
    data: paginate(
      customersStore,
      1,
      Math.max(customersStore.items.length, 1),
    ),
  });
}
