import { NextRequest, NextResponse } from "next/server";
import { customersStore, nextId, paginate } from "../_store";
import { validateCustomer } from "../_validate";
import type { Customer } from "@/app/lib/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") || "10", 10);

  return NextResponse.json({
    message: "Success",
    data: paginate(customersStore, page, perPage, "/api/customer"),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const error = validateCustomer(body);
    if (error) {
      return NextResponse.json({ message: error }, { status: 400 });
    }
    const today = new Date().toISOString().split("T")[0];
    const newCustomer: Customer = {
      id: nextId(customersStore),
      nama_perusahaan: body.nama_perusahaan.trim(),
      alamat: body.alamat || "-",
      pic: body.pic || "-",
      kontak: body.kontak || "-",
      created_at: today,
      updated_at: today,
    };
    customersStore.items.unshift(newCustomer);
    return NextResponse.json(
      { message: "Customer created successfully", data: newCustomer },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Failed to create customer" },
      { status: 400 },
    );
  }
}
