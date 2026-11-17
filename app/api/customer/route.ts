import { NextRequest, NextResponse } from "next/server";
import { initialCustomers, Customer } from "../mockData";

let customersStore: Customer[] = [...initialCustomers];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = 10;
  const total = customersStore.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const pagedData = customersStore.slice(start, start + perPage);

  return NextResponse.json({
    message: "Success",
    data: {
      current_page: page,
      data: pagedData,
      last_page: lastPage,
      prev_page_url: page > 1 ? `/api/customer?page=${page - 1}` : null,
      next_page_url: page < lastPage ? `/api/customer?page=${page + 1}` : null,
      total: total
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newCustomer: Customer = {
      id: Date.now(),
      nama_perusahaan: body.nama_perusahaan || "Perusahaan Baru",
      alamat: body.alamat || "-",
      pic: body.pic || "-",
      kontak: body.kontak || "-",
      created_at: new Date().toISOString().split("T")[0],
      updated_at: new Date().toISOString().split("T")[0]
    };
    customersStore.unshift(newCustomer);
    return NextResponse.json({ message: "Customer created successfully", data: newCustomer }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create customer" }, { status: 400 });
  }
}
