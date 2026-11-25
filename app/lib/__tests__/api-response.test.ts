import { describe, expect, it } from "vitest";
import { parsePaginatedResponse } from "@/app/lib/api-response";
import type { Customer, Package } from "@/app/lib/types";

const customerBody = {
  message: "Success",
  data: {
    current_page: 1,
    data: [
      {
        id: 1,
        nama_perusahaan: "PT Nusantara",
        alamat: "Jakarta",
        pic: "Budi",
        kontak: "0812",
      },
    ],
    last_page: 1,
    prev_page_url: null,
    next_page_url: null,
    total: 1,
  },
};

const packagesBody = {
  message: "Success",
  data: {
    current_page: 1,
    data: [{ id: 1, kode_packages: "PKT-01", nama_paket: "Servis Rutin" }],
    last_page: 1,
    prev_page_url: null,
    next_page_url: null,
    total: 1,
  },
};

describe("parsePaginatedResponse", () => {
  it("menerima bentuk /customer: { message, data: Paginated<Customer> }", () => {
    const page = parsePaginatedResponse<Customer>(customerBody);
    expect(page.total).toBe(1);
    expect(page.data[0]?.nama_perusahaan).toBe("PT Nusantara");
  });

  it("menerima bentuk /packages yang sudah disamakan Hari 2", () => {
    const page = parsePaginatedResponse<Package>(packagesBody);
    expect(page.total).toBe(1);
    expect(page.data[0]?.kode_packages).toBe("PKT-01");
  });

  it("menolak bentuk lama /packages: data berisi array langsung", () => {
    const oldShape = { message: "Success", data: [{ id: 1 }] };
    expect(() => parsePaginatedResponse<Package>(oldShape)).toThrow(
      /bukan array langsung/,
    );
  });

  it("menolak body bukan objek dan data yang tidak lengkap", () => {
    expect(() => parsePaginatedResponse(null)).toThrow(/bukan objek/);
    expect(() => parsePaginatedResponse("ok")).toThrow(/bukan objek/);
    expect(() =>
      parsePaginatedResponse({ message: "Success", data: { data: [] } }),
    ).toThrow(/harus berupa array dan data\.total/);
  });
});
