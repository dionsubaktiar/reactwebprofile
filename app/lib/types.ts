/**
 * Tipe entitas invoicing — SATU-SATUNYA definisi.
 *
 * Jangan mendefinisikan ulang interface Customer / Unit / Part / Package /
 * Invoice di file halaman. Import dari sini. Definisi kanonik ini disatukan
 * dari `app/api/mockData.ts` dan field yang dipakai halaman-halaman
 * `app/invoicing-service/` (termasuk field opsional no_rangka/no_mesin,
 * japo_*, customers, dan parts).
 */

export interface Customer {
  id: number;
  nama_perusahaan: string;
  alamat: string;
  pic: string;
  kontak: string;
  created_at?: string;
  updated_at?: string;
}

export interface Unit {
  id: number;
  nopol: string;
  tipe: string;
  driver: string;
  tahun: string;
  id_customer: number;
  customers?: Customer;
  no_rangka?: string;
  no_mesin?: string;
  japo_kir?: string | null;
  japo_pajak?: string | null;
  japo_stnk?: string | null;
  japo_kontrak?: string | null;
  /** boolean di form create/edit, number (0/1) di halaman view lama. */
  status?: boolean | number;
  created_at?: string;
  updated_at?: string;
}

export interface Part {
  id: number;
  part_number: string | null;
  nama_barang: string;
  merk: string;
  kendaraan: string;
  harga: number;
  jasa: number;
}

export interface Package {
  id: number;
  kode_packages: string | null;
  nama_paket?: string;
}

export type InvoiceStatus = "Lunas" | "Pending";
export type SpkStatus = "Selesai" | "Dalam Pengerjaan" | "Pending";

/** Satu baris part di dalam sebuah invoice (dipakai halaman invoice/edit dan invoice/view). */
export interface InvoicePart {
  id_part: number;
  name?: string;
  quantity?: number;
  /** Dipakai form edit saat menambah part baru. */
  qty?: number;
  total_price?: number;
}

export interface PackageItem {
  id: number;
  sparepart: string;
  harga_part: number;
  harga_jasa: number;
}

export interface Invoice {
  id: number;
  kilometer: number;
  tanggal: string;
  harga: number;
  id_package: number;
  /** Tidak ada di mock saat ini; dipakai halaman invoice/edit. */
  id_unit?: number;
  /** Hanya dipakai halaman invoice/edit. */
  kode_invoice?: string;
  status_invoice: InvoiceStatus;
  status_spk: SpkStatus;
  units: Unit;
  packages: Package | null;
  /** Tidak ada di mock saat ini; halaman invoice/edit & view menanganinya sebagai opsional. */
  parts?: InvoicePart[] | null;
  package_items?: PackageItem[] | null;
}

export interface Pagination {
  current_page: number;
  last_page: number;
  prev_page_url: string | null;
  next_page_url: string | null;
  total?: number;
}

/** Bentuk `data` untuk respons list: `{ message, data: Paginated<T> }`. */
export interface Paginated<T> extends Pagination {
  data: T[];
}

/** Bentuk respons list dari route `app/api/*`. */
export interface ApiResponse<T> {
  message: string;
  data: Paginated<T>;
}

/** Bentuk respons single dari route `app/api/.../[id]`. */
export interface ApiSingleResponse<T> {
  message: string;
  data: T;
}
