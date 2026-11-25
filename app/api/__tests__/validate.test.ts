import { describe, expect, it } from "vitest";
import {
  validateCustomer,
  validateInvoice,
  validateInvoiceStatusTransition,
  validatePart,
  validateUnit,
} from "@/app/api/_validate";
import type { Invoice } from "@/app/lib/types";

const baseInvoice = {
  kilometer: 12000,
  tanggal: "2026-11-24",
  status_invoice: "Pending",
  status_spk: "Pending",
} as unknown as Invoice;

describe("validatePart", () => {
  it("menolak part tanpa nama_barang", () => {
    expect(validatePart({})).toBe("nama_barang wajib diisi");
    expect(validatePart({ nama_barang: "  " })).toBe("nama_barang wajib diisi");
    expect(validatePart(null)).toBe("body tidak valid");
  });

  it("menerima part dengan nama_barang", () => {
    expect(
      validatePart({ nama_barang: "Oli Mesin", harga: 250000, jasa: 50000 }),
    ).toBeNull();
  });
});

describe("validateCustomer + validateUnit", () => {
  it("menolak customer tanpa nama_perusahaan dan unit tanpa nopol", () => {
    expect(validateCustomer({})).toBe("nama_perusahaan wajib diisi");
    expect(validateUnit({})).toBe("nopol wajib diisi");
    expect(validateCustomer({ nama_perusahaan: "PT X" })).toBeNull();
    expect(validateUnit({ nopol: "B 1234 CD" })).toBeNull();
  });
});

describe("validateInvoice", () => {
  it("menolak kilometer bukan angka dan tanggal kosong", () => {
    expect(validateInvoice({ tanggal: "2026-11-24" })).toBe(
      "kilometer wajib diisi dengan angka",
    );
    expect(validateInvoice({ kilometer: 100, tanggal: "" })).toBe(
      "tanggal wajib diisi",
    );
  });

  it("menolak string status bebas (Hari 6)", () => {
    expect(
      validateInvoice({ ...baseInvoice, status_invoice: "Batal" }),
    ).toMatch(/status_invoice tidak valid/);
    expect(validateInvoice({ ...baseInvoice, status_spk: "paid" })).toMatch(
      /status_spk tidak valid/,
    );
  });

  it("menerima invoice valid dengan status dari union type", () => {
    expect(validateInvoice(baseInvoice)).toBeNull();
  });
});

describe("validateInvoiceStatusTransition", () => {
  it("menolak transisi mundur Lunas → Pending", () => {
    const existing = { ...baseInvoice, status_invoice: "Lunas" } as Invoice;
    const next = { ...baseInvoice, status_invoice: "Pending" } as Invoice;
    expect(validateInvoiceStatusTransition(existing, next)).toMatch(
      /tidak diizinkan/,
    );
  });

  it("mengizinkan Pending → Lunas dan edit tanpa perubahan status", () => {
    const next = { ...baseInvoice, status_invoice: "Lunas" } as Invoice;
    expect(validateInvoiceStatusTransition(baseInvoice, next)).toBeNull();
    const editBiasa = { ...baseInvoice, kilometer: 13000 } as Invoice;
    expect(validateInvoiceStatusTransition(baseInvoice, editBiasa)).toBeNull();
  });
});
