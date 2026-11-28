import { describe, expect, it } from "vitest";
import type { Part, Unit } from "@/app/lib/types";
import {
  DEFAULT_PART_FILTER,
  DEFAULT_UNIT_FILTER,
  FILTER_SEMUA,
  distinctPartKendaraan,
  distinctPartMerks,
  distinctStrings,
  distinctUnitCustomers,
  distinctUnitYears,
  matchesPartFilter,
  matchesUnitFilter,
  paginateItems,
  parsePriceBound,
  summarizeParts,
  summarizeUnits,
} from "@/app/lib/list-filter";

/** 5 part seperti data demo halaman parts. */
const PARTS: Part[] = [
  {
    id: 1,
    part_number: "FLT-OIL-H130",
    nama_barang: "Filter Oli Mesin Diesel HD",
    merk: "Denso",
    kendaraan: "Hino Dutro 130 HD",
    harga: 145000,
    jasa: 50000,
  },
  {
    id: 2,
    part_number: "BRK-PAD-ISZ",
    nama_barang: "Brake Pad Front Set Heavy",
    merk: "Bendix",
    kendaraan: "Isuzu Giga FVR",
    harga: 850000,
    jasa: 150000,
  },
  {
    id: 3,
    part_number: "CLT-PLT-FUSO",
    nama_barang: "Clutch Disc / Kampas Kopling",
    merk: "Exedy",
    kendaraan: "Mitsubishi Fuso Fighter",
    harga: 1850000,
    jasa: 350000,
  },
  {
    id: 4,
    part_number: "FLT-FUEL-GEN",
    nama_barang: "Fuel Filter Priming Pump",
    merk: "Sakura",
    kendaraan: "Toyota Dyna 110 ET",
    harga: 180000,
    jasa: 45000,
  },
  {
    id: 5,
    part_number: "BELT-FAN-7PK",
    nama_barang: "V-Ribbed Alternator Fan Belt",
    merk: "Bando",
    kendaraan: "Hino Dutro / Ranger",
    harga: 220000,
    jasa: 75000,
  },
];

/** 4 unit seperti data demo halaman units. */
const UNITS: Unit[] = [
  {
    id: 1,
    nopol: "B 9182 UXZ",
    tipe: "Hino Dutro 130 HD Dump",
    driver: "Bambang Sudiro",
    tahun: "2022",
    id_customer: 10,
    customers: {
      id: 10,
      nama_perusahaan: "PT Nusantara Logistik Prima",
      alamat: "x",
      pic: "H",
      kontak: "081",
      created_at: "2024-01-10",
      updated_at: "2026-10-01",
    },
  },
  {
    id: 2,
    nopol: "B 9410 TXM",
    tipe: "Isuzu Giga FVR 285 Box",
    driver: "Dedi Supriyadi",
    tahun: "2021",
    id_customer: 12,
    customers: {
      id: 12,
      nama_perusahaan: "CV Berkah Mandiri Express",
      alamat: "x",
      pic: "R",
      kontak: "081",
      created_at: "2024-03-12",
      updated_at: "2026-09-15",
    },
  },
  {
    id: 3,
    nopol: "L 8821 OK",
    tipe: "Mitsubishi Fuso Fighter FM",
    driver: "Agus Pratama",
    tahun: "2020",
    id_customer: 14,
    customers: {
      id: 14,
      nama_perusahaan: "PT Global Sentosa Trans",
      alamat: "x",
      pic: "S",
      kontak: "082",
      created_at: "2023-11-05",
      updated_at: "2026-11-01",
    },
  },
  {
    id: 4,
    nopol: "B 9011 KLP",
    tipe: "Toyota Dyna 110 ET Flatdeck",
    driver: "Joko Susilo",
    tahun: "2023",
    id_customer: 10,
    customers: {
      id: 10,
      nama_perusahaan: "PT Nusantara Logistik Prima",
      alamat: "x",
      pic: "H",
      kontak: "081",
      created_at: "2024-01-10",
      updated_at: "2026-10-01",
    },
  },
];

describe("distinctStrings", () => {
  it("membuang duplikat, kosong, dan null, lalu mengurutkan", () => {
    expect(
      distinctStrings([
        "Bendo",
        "Denso",
        "",
        "  ",
        null,
        "Denso",
        undefined,
        "Bando",
      ]),
    ).toEqual(["Bando", "Bendo", "Denso"]);
  });
});

describe("opsi filter dari data", () => {
  it("merk part berasal dari data, bukan hardcode", () => {
    expect(distinctPartMerks(PARTS)).toEqual([
      "Bando",
      "Bendix",
      "Denso",
      "Exedy",
      "Sakura",
    ]);
  });

  it("tipe kendaraan part berasal dari data", () => {
    expect(distinctPartKendaraan(PARTS)).toEqual([
      "Hino Dutro / Ranger",
      "Hino Dutro 130 HD",
      "Isuzu Giga FVR",
      "Mitsubishi Fuso Fighter",
      "Toyota Dyna 110 ET",
    ]);
  });

  it("customer unit unik per id_customer dan diurutkan nama", () => {
    expect(distinctUnitCustomers(UNITS)).toEqual([
      { id: 12, nama: "CV Berkah Mandiri Express" },
      { id: 14, nama: "PT Global Sentosa Trans" },
      { id: 10, nama: "PT Nusantara Logistik Prima" },
    ]);
  });

  it("customer tanpa nama memakai label Customer #id", () => {
    const noName: Unit[] = [
      {
        id: 9,
        nopol: "B 1",
        tipe: "X",
        driver: "Y",
        tahun: "2022",
        id_customer: 77,
      },
    ];
    expect(distinctUnitCustomers(noName)).toEqual([
      { id: 77, nama: "Customer #77" },
    ]);
  });

  it("tahun unit diurutkan terbaru dulu", () => {
    expect(distinctUnitYears(UNITS)).toEqual(["2023", "2022", "2021", "2020"]);
  });
});

describe("parsePriceBound", () => {
  it("kosong, bukan angka, dan negatif berarti tidak ada batas", () => {
    expect(parsePriceBound("")).toBeNull();
    expect(parsePriceBound("   ")).toBeNull();
    expect(parsePriceBound("abc")).toBeNull();
    expect(parsePriceBound("-5")).toBeNull();
  });

  it("angka valid diterima, termasuk 0 dan spasi di sekeliling", () => {
    expect(parsePriceBound("0")).toBe(0);
    expect(parsePriceBound(" 150000 ")).toBe(150000);
  });
});

describe("matchesPartFilter", () => {
  it("filter kosong cocok dengan semua part", () => {
    expect(
      PARTS.filter((p) => matchesPartFilter(p, DEFAULT_PART_FILTER)),
    ).toHaveLength(5);
  });

  it("pencarian cocok nama, SKU, kendaraan, dan merk (tidak peka huruf)", () => {
    const byName = { ...DEFAULT_PART_FILTER, query: "kampas kopling" };
    expect(
      PARTS.filter((p) => matchesPartFilter(p, byName)).map((p) => p.id),
    ).toEqual([3]);
    const bySku = { ...DEFAULT_PART_FILTER, query: "flt-oil" };
    expect(
      PARTS.filter((p) => matchesPartFilter(p, bySku)).map((p) => p.id),
    ).toEqual([1]);
    const byMerk = { ...DEFAULT_PART_FILTER, query: "DENSO" };
    expect(
      PARTS.filter((p) => matchesPartFilter(p, byMerk)).map((p) => p.id),
    ).toEqual([1]);
  });

  it("filter merk hanya menampilkan merk itu", () => {
    const filter = { ...DEFAULT_PART_FILTER, merk: "Denso" };
    expect(
      PARTS.filter((p) => matchesPartFilter(p, filter)).map((p) => p.id),
    ).toEqual([1]);
  });

  it("filter tipe kendaraan hanya menampilkan tipe itu", () => {
    const filter = { ...DEFAULT_PART_FILTER, kendaraan: "Hino Dutro 130 HD" };
    expect(
      PARTS.filter((p) => matchesPartFilter(p, filter)).map((p) => p.id),
    ).toEqual([1]);
  });

  it("rentang harga memakai harga komponen dan batasnya inklusif", () => {
    const filter = {
      ...DEFAULT_PART_FILTER,
      hargaMin: 180000,
      hargaMax: 220000,
    };
    expect(
      PARTS.filter((p) => matchesPartFilter(p, filter)).map((p) => p.id),
    ).toEqual([4, 5]);
  });

  it("hanya batas bawah atau hanya batas atas saja tetap jalan", () => {
    const minOnly = { ...DEFAULT_PART_FILTER, hargaMin: 1000000 };
    expect(
      PARTS.filter((p) => matchesPartFilter(p, minOnly)).map((p) => p.id),
    ).toEqual([3]);
    const maxOnly = { ...DEFAULT_PART_FILTER, hargaMax: 150000 };
    expect(
      PARTS.filter((p) => matchesPartFilter(p, maxOnly)).map((p) => p.id),
    ).toEqual([1]);
  });

  it("min lebih besar dari max menghasilkan daftar kosong, bukan semua data", () => {
    const filter = {
      ...DEFAULT_PART_FILTER,
      hargaMin: 500000,
      hargaMax: 100000,
    };
    expect(PARTS.filter((p) => matchesPartFilter(p, filter))).toHaveLength(0);
  });

  it("kombinasi pencarian + merk + rentang harga menyempitkan hasil", () => {
    const filter = {
      ...DEFAULT_PART_FILTER,
      query: "filter",
      merk: "Sakura",
      hargaMin: 100000,
      hargaMax: 200000,
    };
    expect(
      PARTS.filter((p) => matchesPartFilter(p, filter)).map((p) => p.id),
    ).toEqual([4]);
  });
});

describe("matchesUnitFilter", () => {
  it("filter kosong cocok dengan semua unit", () => {
    expect(
      UNITS.filter((u) => matchesUnitFilter(u, DEFAULT_UNIT_FILTER)),
    ).toHaveLength(4);
  });

  it("pencarian cocok nopol, tipe, driver, dan nama perusahaan", () => {
    const byNopol = { ...DEFAULT_UNIT_FILTER, query: "L 8821" };
    expect(
      UNITS.filter((u) => matchesUnitFilter(u, byNopol)).map((u) => u.id),
    ).toEqual([3]);
    const byCompany = { ...DEFAULT_UNIT_FILTER, query: "nusantara" };
    expect(
      UNITS.filter((u) => matchesUnitFilter(u, byCompany)).map((u) => u.id),
    ).toEqual([1, 4]);
  });

  it("filter customer hanya menampilkan unit milik customer itu", () => {
    const filter = { ...DEFAULT_UNIT_FILTER, customerId: 10 };
    expect(
      UNITS.filter((u) => matchesUnitFilter(u, filter)).map((u) => u.id),
    ).toEqual([1, 4]);
  });

  it("filter tahun hanya menampilkan unit tahun itu", () => {
    const filter = { ...DEFAULT_UNIT_FILTER, tahun: "2021" };
    expect(
      UNITS.filter((u) => matchesUnitFilter(u, filter)).map((u) => u.id),
    ).toEqual([2]);
  });

  it("kombinasi customer + tahun menyempitkan hasil", () => {
    const filter = { ...DEFAULT_UNIT_FILTER, customerId: 10, tahun: "2023" };
    expect(
      UNITS.filter((u) => matchesUnitFilter(u, filter)).map((u) => u.id),
    ).toEqual([4]);
  });
});

describe("paginateItems", () => {
  const items = Array.from({ length: 25 }, (_, i) => i + 1);

  it("memotong halaman 1, 2, dan 3 dengan benar", () => {
    expect(paginateItems(items, 1, 10)).toMatchObject({
      pageItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      totalPages: 3,
      currentPage: 1,
      startIndex: 0,
      endIndex: 10,
      total: 25,
    });
    expect(paginateItems(items, 3, 10).pageItems).toEqual([21, 22, 23, 24, 25]);
  });

  it("halaman di luar jangkauan dijepit, bukan menampilkan data halaman lain", () => {
    expect(paginateItems(items, 99, 10).currentPage).toBe(3);
    expect(paginateItems(items, 99, 10).pageItems).toEqual([
      21, 22, 23, 24, 25,
    ]);
    expect(paginateItems(items, 0, 10).currentPage).toBe(1);
  });

  it("daftar kosong menghasilkan satu halaman kosong, bukan data lama", () => {
    const empty = paginateItems([], 1, 10);
    expect(empty).toMatchObject({
      pageItems: [],
      totalPages: 1,
      currentPage: 1,
      total: 0,
    });
  });

  it("FILTER_SEMUA tidak dipakai sebagai nilai filter customer", () => {
    expect(FILTER_SEMUA).toBe("semua");
  });
});

describe("KPI dari seluruh data", () => {
  it("summarizeParts menghitung total, nilai katalog, dan rata-rata jasa", () => {
    expect(summarizeParts(PARTS)).toEqual({
      totalCount: 5,
      totalInventoryValue: 3245000,
      avgJasa: 134000,
    });
  });

  it("summarizeParts pada data kosong menghasilkan nol, bukan NaN", () => {
    expect(summarizeParts([])).toEqual({
      totalCount: 0,
      totalInventoryValue: 0,
      avgJasa: 0,
    });
  });

  it("summarizeUnits menghitung total, customer unik, dan unit usia prima", () => {
    expect(summarizeUnits(UNITS)).toEqual({
      totalCount: 4,
      uniqueCustomers: 3,
      youngUnits: 2,
    });
  });

  it("summarizeUnits pada data kosong menghasilkan nol", () => {
    expect(summarizeUnits([])).toEqual({
      totalCount: 0,
      uniqueCustomers: 0,
      youngUnits: 0,
    });
  });
});
