import { NextResponse } from "next/server";
import { packagesStore, paginate } from "../_store";

export async function GET() {
  // Bentuk respons disamakan dengan resource lain:
  // `{ message, data: Paginated<Package> }` — sebelumnya `data` berisi
  // array langsung, sehingga halaman invoice/create & invoice/edit yang
  // membaca `response.data` mendapat objek, bukan array.
  return NextResponse.json({
    message: "Success",
    data: paginate(
      packagesStore,
      1,
      Math.max(packagesStore.items.length, 1),
    ),
  });
}
