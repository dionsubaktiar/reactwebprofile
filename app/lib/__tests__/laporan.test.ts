import { describe, expect, it } from "vitest";
import type { Invoice, InvoiceStatus, SpkStatus } from "@/app/lib/types";
import {
  NAMA_BULAN,
  availableYears,
  filterInvoicesByPeriod,
  parsePeriodeTanggal,
  summarizeInvoices,
  type LaporanFilter,
} from "@/app/lib/laporan";

/** Invoice minimal yang valid untuk test laporan. */
function makeInvoice(partial: {
  id: number;
  tanggal: string;
  harga: number;
  status_invoice: InvoiceStatus;
  status_spk: SpkStatus;
}): Invoice {
  return {
    id: partial.id,
    kilometer: 10000,
    tanggal: partial.tanggal,
    harga: partial.harga,
    id_package: 1,
    status_invoice: partial.status_invoice,
    status_spk: partial.status_spk,
    units: {
      id: 1,
      nopol: "B 1234 AB",
      tipe: "Hino Dutro",
      driver: "Supardi",
      tahun: "2022",
      id_customer: 1,
    },
    packages: { id: 1, kode_packages: "PKG-TEST" },
  };
}

/** 3 invoice Maret 2026 (seperti mock) + 1 November 2026 + 1 Desember 2025. */
const FIXTURES: Invoice[] = [
  makeInvoice({
    id: 1,
    tanggal: "2026-03-12",
    harga: 2450000,
    status_invoice: "Lunas",
    status_spk: "Selesai",
  }),
  makeInvoice({
    id: 2,
    tanggal: "2026-03-14",
    harga: 4200000,
    status_invoice: "Pending",
    status_spk: "Dalam Pengerjaan",
  }),
  makeInvoice({
    id: 3,
    tanggal: "2026-03-15",
    harga: 1650000,
    status_invoice: "Lunas",
    status_spk: "Selesai",
  }),
  makeInvoice({
    id: 4,
    tanggal: "2026-11-20",
    harga: 1000000,
    status_invoice: "Pending",
    status_spk: "Pending",
  }),
  makeInvoice({
    id: 5,
    tanggal: "2025-12-05",
    harga: 500000,
    status_invoice: "Lunas",
    status_spk: "Selesai",
  }),
];

const SEMUA: LaporanFilter = {
  bulan: "semua",
  tahun: "semua",
  statusInvoice: "semua",
  statusSpk: "semua",
};

describe("parsePeriodeTanggal (Hari 8)", () => {
  it("membaca tahun dan bulan dari tanggal YYYY-MM-DD", () => {
    expect(parsePeriodeTanggal("2026-03-12")).toEqual({
      tahun: 2026,
      bulan: 3,
    });
    expect(parsePeriodeTanggal("2025-12-05")).toEqual({
      tahun: 2025,
      bulan: 12,
    });
  });

  it("menolak tanggal yang tidak valid", () => {
    expect(parsePeriodeTanggal("")).toBeNull();
    expect(parsePeriodeTanggal("bukan-tanggal")).toBeNull();
    expect(parsePeriodeTanggal("2026-13-01")).toBeNull();
    expect(parsePeriodeTanggal("2026-00-10")).toBeNull();
    expect(parsePeriodeTanggal("12/03/2026")).toBeNull();
  });

  it("nama bulan ada 12 dan berurutan Januari–Desember", () => {
    expect(NAMA_BULAN).toHaveLength(12);
    expect(NAMA_BULAN[0]).toBe("Januari");
    expect(NAMA_BULAN[2]).toBe("Maret");
    expect(NAMA_BULAN[11]).toBe("Desember");
  });
});

describe("filterInvoicesByPeriod (Hari 8)", () => {
  it("menyaring menurut bulan dan tahun dari tanggal invoice", () => {
    const maret2026 = filterInvoicesByPeriod(FIXTURES, {
      ...SEMUA,
      bulan: 3,
      tahun: 2026,
    });
    expect(maret2026.map((inv) => inv.id)).toEqual([1, 2, 3]);

    const november2026 = filterInvoicesByPeriod(FIXTURES, {
      ...SEMUA,
      bulan: 11,
      tahun: 2026,
    });
    expect(november2026.map((inv) => inv.id)).toEqual([4]);
  });

  it("bulan 'semua' menampilkan seluruh bulan di tahun terpilih", () => {
    const tahun2026 = filterInvoicesByPeriod(FIXTURES, {
      ...SEMUA,
      tahun: 2026,
    });
    expect(tahun2026.map((inv) => inv.id)).toEqual([1, 2, 3, 4]);

    const semua = filterInvoicesByPeriod(FIXTURES, SEMUA);
    expect(semua).toHaveLength(5);
  });

  it("menyaring menurut status invoice dan SPK, bisa dikombinasikan", () => {
    const lunasMaret = filterInvoicesByPeriod(FIXTURES, {
      ...SEMUA,
      bulan: 3,
      tahun: 2026,
      statusInvoice: "Lunas",
    });
    expect(lunasMaret.map((inv) => inv.id)).toEqual([1, 3]);

    const spkSelesai = filterInvoicesByPeriod(FIXTURES, {
      ...SEMUA,
      statusSpk: "Selesai",
    });
    expect(spkSelesai.map((inv) => inv.id)).toEqual([1, 3, 5]);

    const pendingDalamPengerjaan = filterInvoicesByPeriod(FIXTURES, {
      ...SEMUA,
      statusInvoice: "Pending",
      statusSpk: "Dalam Pengerjaan",
    });
    expect(pendingDalamPengerjaan.map((inv) => inv.id)).toEqual([2]);
  });

  it("periode tanpa data menghasilkan list kosong, bukan data periode lain", () => {
    const kosong = filterInvoicesByPeriod(FIXTURES, {
      ...SEMUA,
      bulan: 1,
      tahun: 2026,
    });
    expect(kosong).toEqual([]);
  });

  it("invoice bertanggal tidak valid dikeluarkan dari laporan", () => {
    const rusak = makeInvoice({
      id: 99,
      tanggal: "tanggal-rusak",
      harga: 999000,
      status_invoice: "Lunas",
      status_spk: "Selesai",
    });
    const hasil = filterInvoicesByPeriod([...FIXTURES, rusak], SEMUA);
    expect(hasil.map((inv) => inv.id)).not.toContain(99);
  });
});

describe("summarizeInvoices (Hari 8)", () => {
  it("menghitung KPI Maret 2026 dari data (bukan hardcode)", () => {
    const maret = filterInvoicesByPeriod(FIXTURES, {
      ...SEMUA,
      bulan: 3,
      tahun: 2026,
    });
    const ringkasan = summarizeInvoices(maret);
    expect(ringkasan.jumlah).toBe(3);
    expect(ringkasan.totalNilai).toBe(2450000 + 4200000 + 1650000);
    expect(ringkasan.lunas).toBe(2);
    expect(ringkasan.pending).toBe(1);
    expect(ringkasan.rataRata).toBeCloseTo(8300000 / 3, 2);
    expect(ringkasan.spkSelesai).toBe(2);
    expect(ringkasan.spkDalamPengerjaan).toBe(1);
    expect(ringkasan.spkPending).toBe(0);
  });

  it("KPI berubah mengikuti filter — bukan angka tetap", () => {
    const november = summarizeInvoices(
      filterInvoicesByPeriod(FIXTURES, { ...SEMUA, bulan: 11, tahun: 2026 }),
    );
    expect(november.jumlah).toBe(1);
    expect(november.totalNilai).toBe(1000000);
    expect(november.lunas).toBe(0);
    expect(november.pending).toBe(1);
    expect(november.rataRata).toBe(1000000);
    expect(november.spkPending).toBe(1);
  });

  it("list kosong menghasilkan semua KPI nol (rata-rata 0, bukan NaN)", () => {
    const ringkasan = summarizeInvoices([]);
    expect(ringkasan).toEqual({
      jumlah: 0,
      totalNilai: 0,
      lunas: 0,
      pending: 0,
      rataRata: 0,
      spkSelesai: 0,
      spkDalamPengerjaan: 0,
      spkPending: 0,
    });
  });
});

describe("availableYears (Hari 8)", () => {
  it("mengembalikan tahun-tahun di data, urut menurun", () => {
    expect(availableYears(FIXTURES)).toEqual([2026, 2025]);
    expect(availableYears([])).toEqual([]);
  });
});
