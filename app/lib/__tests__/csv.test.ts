import { describe, expect, it } from "vitest";
import type { Customer, Invoice } from "@/app/lib/types";
import {
  CUSTOMER_CSV_HEADERS,
  INVOICE_CSV_HEADERS,
  csvFilename,
  customerToCsvRow,
  escapeCsvCell,
  invoiceToCsvRow,
  toCsv,
} from "@/app/lib/csv";

/** Invoice minimal yang valid untuk test CSV. */
function makeInvoice(partial: Partial<Invoice> = {}): Invoice {
  return {
    id: 101,
    kilometer: 45200,
    tanggal: "2026-11-15",
    harga: 3850000,
    id_package: 1,
    status_invoice: "Lunas",
    status_spk: "Selesai",
    units: {
      id: 1,
      nopol: "B 9182 UXZ",
      tipe: "Hino Dutro 130 HD",
      driver: "Bambang Sudiro",
      tahun: "2022",
      id_customer: 10,
      customers: {
        id: 10,
        nama_perusahaan: "PT Nusantara Logistik Prima",
        alamat: "Kawasan Industri MM2100, Cikarang",
        pic: "Hendro Wibowo",
        kontak: "081234567890",
      },
    },
    packages: { id: 1, kode_packages: "PKG-HEAVY-01" },
    ...partial,
  };
}

describe("escapeCsvCell", () => {
  it("teks biasa tidak dikutip", () => {
    expect(escapeCsvCell("Lunas")).toBe("Lunas");
    expect(escapeCsvCell(3850000)).toBe("3850000");
  });

  it("koma di dalam sel mengharuskan sel dikutip", () => {
    expect(escapeCsvCell("PT A, Tbk")).toBe('"PT A, Tbk"');
  });

  it("petik ganda digandakan dan sel dikutip", () => {
    expect(escapeCsvCell('Bengkel "Jaya"')).toBe('"Bengkel ""Jaya"""');
  });

  it("baris baru di dalam sel mengharuskan sel dikutip", () => {
    expect(escapeCsvCell("Jl. Raya\nNo. 1")).toBe('"Jl. Raya\nNo. 1"');
  });

  it("null dan undefined menjadi sel kosong", () => {
    expect(escapeCsvCell(null)).toBe("");
    expect(escapeCsvCell(undefined)).toBe("");
  });
});

describe("toCsv", () => {
  it("header + baris digabung dengan CRLF dan diakhiri baris baru", () => {
    expect(
      toCsv(
        ["id", "nama"],
        [
          [1, "PT A"],
          [2, "PT B, Tbk"],
        ],
      ),
    ).toBe('id,nama\r\n1,PT A\r\n2,"PT B, Tbk"\r\n');
  });

  it("tanpa baris data tetap menghasilkan header saja", () => {
    expect(toCsv(["id", "nama"], [])).toBe("id,nama\r\n");
  });
});

describe("invoiceToCsvRow", () => {
  it("memetakan field bersama ke kolom yang sama namanya", () => {
    const row = invoiceToCsvRow(makeInvoice());
    expect(row).toEqual([
      101,
      "2026-11-15",
      "B 9182 UXZ",
      "PT Nusantara Logistik Prima",
      "Bambang Sudiro",
      45200,
      "PKG-HEAVY-01",
      3850000,
      "Lunas",
      "Selesai",
    ]);
    // Header dan baris punya jumlah kolom yang sama.
    expect(row.length).toBe(INVOICE_CSV_HEADERS.length);
  });

  it("paket null dan relasi kosong menjadi sel kosong, bukan crash", () => {
    const row = invoiceToCsvRow(
      makeInvoice({
        packages: null,
        units: {
          id: 3,
          nopol: "L 8821 OK",
          tipe: "Mitsubishi Fuso Fighter",
          driver: "Agus Pratama",
          tahun: "2020",
          id_customer: 14,
        },
      }),
    );
    expect(row[3]).toBe("");
    expect(row[6]).toBe("");
  });

  it("nama perusahaan berkoma tetap satu sel setelah di-CSV-kan", () => {
    const csv = toCsv(
      [...INVOICE_CSV_HEADERS],
      [
        invoiceToCsvRow(
          makeInvoice({
            units: {
              id: 1,
              nopol: "B 9182 UXZ",
              tipe: "Hino Dutro",
              driver: "Bambang",
              tahun: "2022",
              id_customer: 10,
              customers: {
                id: 10,
                nama_perusahaan: "PT A, Tbk",
                alamat: "Cikarang",
                pic: "Hendro",
                kontak: "0812",
              },
            },
          }),
        ),
      ],
    );
    expect(csv).toContain('"PT A, Tbk"');
  });
});

describe("customerToCsvRow", () => {
  it("memetakan field customer ke kolom yang sama namanya", () => {
    const customer: Customer = {
      id: 1,
      nama_perusahaan: "PT Nusantara Prima Logistics",
      alamat: "Jl. Margomulyo Indah No. 45, Surabaya",
      pic: "Budi Santoso",
      kontak: "0812-3456-7890",
      created_at: "2024-01-10",
      updated_at: "2026-10-01",
    };
    const row = customerToCsvRow(customer);
    expect(row).toEqual([
      1,
      "PT Nusantara Prima Logistics",
      "Jl. Margomulyo Indah No. 45, Surabaya",
      "Budi Santoso",
      "0812-3456-7890",
      "2024-01-10",
      "2026-10-01",
    ]);
    expect(row.length).toBe(CUSTOMER_CSV_HEADERS.length);
  });

  it("created_at/updated_at yang tidak ada menjadi sel kosong", () => {
    const row = customerToCsvRow({
      id: 2,
      nama_perusahaan: "CV Sentosa",
      alamat: "Cikarang",
      pic: "Agus",
      kontak: "0813",
    });
    expect(row[5]).toBe("");
    expect(row[6]).toBe("");
  });
});

describe("csvFilename", () => {
  it("memakai tanggal lokal dengan nol di depan", () => {
    expect(csvFilename("invoice", new Date(2026, 10, 26))).toBe(
      "invoice-2026-11-26.csv",
    );
    expect(csvFilename("customers", new Date(2026, 0, 5))).toBe(
      "customers-2026-01-05.csv",
    );
  });
});
