/**
 * Filter + paginasi client-side untuk list parts & units (Hari 10).
 *
 * Dua halaman list ini memuat SELURUH data dari mock API (loop halaman
 * `per_page=100`, pola yang sama dengan laporan Hari 8 dan export Hari 9),
 * lalu filter + KPI + paginasi dihitung di client. Alasannya:
 *
 * - Opsi filter (merk, tipe kendaraan, customer, tahun) harus berasal dari
 *   SELURUH katalog, bukan hanya halaman yang sedang tampil — kalau tidak,
 *   merk yang ada di halaman 2 tidak pernah muncul di dropdown.
 * - KPI juga dihitung dari seluruh data (roadmap Hari 10) — tanpa ini,
 *   "Total Jenis Part" dan kawan-kawan hanya menghitung halaman aktif.
 * - Bug pagination Hari 1–2 (halaman kosong dari API tetap menampilkan
 *   data lama, `parts/page.tsx:124`) hilang secara struktural: halaman
 *   kosong adalah irisan kosong dari data yang sudah dimuat, bukan
 *   respons yang diabaikan karena `data.length === 0`.
 *
 * Semua fungsi di sini murni dan diuji di `app/lib/__tests__/list-filter.test.ts`.
 * Dataset mock kecil (5 part, 5 unit), jadi memuat semuanya di client
 * bukan masalah; bila katalog tumbuh besar, paginasi server perlu kembali.
 */
import type { Part, Unit } from "./types";

/** Ukuran halaman list parts/units — sama dengan default `per_page` mock API (Hari 2). */
export const LIST_PAGE_SIZE = 10;

/** Nilai "semua" untuk select filter. */
export const FILTER_SEMUA = "semua";

/** Nilai unik yang tidak kosong, diurutkan — untuk opsi dropdown filter. */
export function distinctStrings(
  values: (string | null | undefined)[],
): string[] {
  const unique = new Set<string>();
  for (const value of values) {
    const trimmed = (value ?? "").trim();
    if (trimmed) unique.add(trimmed);
  }
  return Array.from(unique).sort((a, b) => a.localeCompare(b));
}

/** Daftar merk dari seluruh data part (bukan hardcode, bukan halaman aktif). */
export function distinctPartMerks(parts: Part[]): string[] {
  return distinctStrings(parts.map((p) => p.merk));
}

/** Daftar tipe kendaraan dari seluruh data part. */
export function distinctPartKendaraan(parts: Part[]): string[] {
  return distinctStrings(parts.map((p) => p.kendaraan));
}

/** Daftar customer pemilik unit: satu entri per `id_customer`, diurutkan nama. */
export function distinctUnitCustomers(
  units: Unit[],
): { id: number; nama: string }[] {
  const byId = new Map<number, string>();
  for (const unit of units) {
    if (!byId.has(unit.id_customer)) {
      byId.set(
        unit.id_customer,
        unit.customers?.nama_perusahaan?.trim() ||
          `Customer #${unit.id_customer}`,
      );
    }
  }
  return Array.from(byId, ([id, nama]) => ({ id, nama })).sort((a, b) =>
    a.nama.localeCompare(b.nama),
  );
}

/** Daftar tahun rakit unit, terbaru dulu. */
export function distinctUnitYears(units: Unit[]): string[] {
  return distinctStrings(units.map((u) => u.tahun)).sort((a, b) =>
    b.localeCompare(a),
  );
}

/**
 * Parse batas harga dari input teks. Kosong / bukan angka / negatif
 * berarti "tidak ada batas" (`null`) — filter tidak menolak semua baris
 * hanya karena inputnya salah ketik.
 */
export function parsePriceBound(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const value = Number(trimmed);
  return Number.isFinite(value) && value >= 0 ? value : null;
}

export interface PartFilter {
  query: string;
  /** Merk, atau FILTER_SEMUA. */
  merk: string;
  /** Tipe kendaraan, atau FILTER_SEMUA. */
  kendaraan: string;
  /** Batas bawah harga komponen (`harga`), atau null bila tidak ada. */
  hargaMin: number | null;
  /** Batas atas harga komponen (`harga`), atau null bila tidak ada. */
  hargaMax: number | null;
}

export const DEFAULT_PART_FILTER: PartFilter = {
  query: "",
  merk: FILTER_SEMUA,
  kendaraan: FILTER_SEMUA,
  hargaMin: null,
  hargaMax: null,
};

/** Satu predikat untuk pencarian + semua filter parts, dipakai tabel. */
export function matchesPartFilter(part: Part, filter: PartFilter): boolean {
  const q = filter.query.trim().toLowerCase();
  const matchSearch =
    !q ||
    (part.nama_barang || "").toLowerCase().includes(q) ||
    (part.part_number || "").toLowerCase().includes(q) ||
    (part.kendaraan || "").toLowerCase().includes(q) ||
    (part.merk || "").toLowerCase().includes(q);
  if (!matchSearch) return false;
  if (filter.merk !== FILTER_SEMUA && part.merk !== filter.merk) return false;
  if (
    filter.kendaraan !== FILTER_SEMUA &&
    part.kendaraan !== filter.kendaraan
  ) {
    return false;
  }
  const harga = part.harga ?? 0;
  if (filter.hargaMin !== null && harga < filter.hargaMin) return false;
  if (filter.hargaMax !== null && harga > filter.hargaMax) return false;
  return true;
}

export interface UnitFilter {
  query: string;
  /** `id_customer`, atau FILTER_SEMUA. */
  customerId: number | typeof FILTER_SEMUA;
  /** Tahun rakit, atau FILTER_SEMUA. */
  tahun: string;
}

export const DEFAULT_UNIT_FILTER: UnitFilter = {
  query: "",
  customerId: FILTER_SEMUA,
  tahun: FILTER_SEMUA,
};

/** Satu predikat untuk pencarian + semua filter units, dipakai tabel. */
export function matchesUnitFilter(unit: Unit, filter: UnitFilter): boolean {
  const q = filter.query.trim().toLowerCase();
  const matchSearch =
    !q ||
    (unit.nopol || "").toLowerCase().includes(q) ||
    (unit.tipe || "").toLowerCase().includes(q) ||
    (unit.driver || "").toLowerCase().includes(q) ||
    (unit.customers?.nama_perusahaan || "").toLowerCase().includes(q);
  if (!matchSearch) return false;
  if (
    filter.customerId !== FILTER_SEMUA &&
    unit.id_customer !== filter.customerId
  ) {
    return false;
  }
  if (filter.tahun !== FILTER_SEMUA && unit.tahun !== filter.tahun) {
    return false;
  }
  return true;
}

export interface PageSlice<T> {
  /** Item pada halaman ini (kosong bila filter tidak cocok dengan apa pun). */
  pageItems: T[];
  /** Jumlah halaman, minimal 1 supaya "Halaman 1" tetap tampil saat kosong. */
  totalPages: number;
  /** Halaman yang dipakai setelah dijepit ke [1, totalPages]. */
  currentPage: number;
  /** Indeks awal (0-based) item yang ditampilkan di seluruh hasil filter. */
  startIndex: number;
  /** Indeks akhir (eksklusif) item yang ditampilkan. */
  endIndex: number;
  /** Jumlah seluruh hasil filter (bukan hanya halaman ini). */
  total: number;
}

/**
 * Potong hasil filter menjadi satu halaman. Halaman di luar jangkauan
 * dijepit ke halaman terakhir — tidak pernah menampilkan data halaman lain.
 */
export function paginateItems<T>(
  items: T[],
  page: number,
  perPage: number = LIST_PAGE_SIZE,
): PageSlice<T> {
  const safePerPage =
    Number.isFinite(perPage) && perPage > 0
      ? Math.floor(perPage)
      : LIST_PAGE_SIZE;
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / safePerPage));
  const safePage = Number.isFinite(page)
    ? Math.min(Math.max(1, Math.floor(page)), totalPages)
    : 1;
  const startIndex = (safePage - 1) * safePerPage;
  const endIndex = Math.min(startIndex + safePerPage, total);
  return {
    pageItems: items.slice(startIndex, endIndex),
    totalPages,
    currentPage: safePage,
    startIndex,
    endIndex,
    total,
  };
}

/** KPI parts — dihitung dari SELURUH data, bukan halaman aktif. */
export function summarizeParts(parts: Part[]): {
  totalCount: number;
  totalInventoryValue: number;
  avgJasa: number;
} {
  const totalCount = parts.length;
  const totalInventoryValue = parts.reduce(
    (acc, curr) => acc + (curr.harga || 0),
    0,
  );
  const avgJasa =
    totalCount > 0
      ? Math.round(
          parts.reduce((acc, curr) => acc + (curr.jasa || 0), 0) / totalCount,
        )
      : 0;
  return { totalCount, totalInventoryValue, avgJasa };
}

/** KPI units — dihitung dari SELURUH data, bukan halaman aktif. */
export function summarizeUnits(units: Unit[]): {
  totalCount: number;
  uniqueCustomers: number;
  youngUnits: number;
} {
  const totalCount = units.length;
  const uniqueCustomers = new Set(units.map((u) => u.id_customer)).size;
  const youngUnits = units.filter((u) => parseInt(u.tahun) >= 2022).length;
  return { totalCount, uniqueCustomers, youngUnits };
}
