/**
 * Export CSV client-side (Hari 9).
 *
 * Satu-satunya definisi logika CSV: escaping sel, pemetaan baris dari tipe
 * bersama (`app/lib/types.ts`), nama file bertanggal, dan unduhan lewat
 * `Blob` + `URL.createObjectURL`. Tidak ada util export apa pun di repo
 * sebelum hari ini — grep `CSV`/`Blob`/`download` di invoicing nol hasil.
 *
 * Kolom CSV memakai nama field yang sama dengan tipe bersama
 * (`nama_perusahaan`, `nopol`, `kilometer`, `harga`, `status_invoice`,
 * `status_spk`) supaya CSV bisa dibaca kembali tanpa kamus pemetaan.
 * Fungsi-fungsi di sini murni kecuali `downloadCsv` (menyentuh DOM dan
 * hanya dipanggil dari event handler tombol export).
 */
import type { Customer, Invoice } from "@/app/lib/types";

/** Satu sel CSV: dikutip bila mengandung koma, petik, atau baris baru. */
export function escapeCsvCell(
  value: string | number | null | undefined,
): string {
  if (value === null || value === undefined) return "";
  const text = String(value);
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

/** Gabungkan header + baris menjadi satu string CSV (baris diakhiri CRLF). */
export function toCsv(
  headers: string[],
  rows: Array<Array<string | number | null | undefined>>,
): string {
  const lines = [
    headers.map(escapeCsvCell).join(","),
    ...rows.map((row) => row.map(escapeCsvCell).join(",")),
  ];
  return lines.join("\r\n") + "\r\n";
}

export const INVOICE_CSV_HEADERS = [
  "id",
  "tanggal",
  "nopol",
  "nama_perusahaan",
  "driver",
  "kilometer",
  "kode_packages",
  "harga",
  "status_invoice",
  "status_spk",
] as const;

/** Satu invoice → satu baris CSV; relasi yang kosong jadi sel kosong. */
export function invoiceToCsvRow(inv: Invoice): Array<string | number> {
  return [
    inv.id,
    inv.tanggal,
    inv.units?.nopol ?? "",
    inv.units?.customers?.nama_perusahaan ?? "",
    inv.units?.driver ?? "",
    inv.kilometer,
    inv.packages?.kode_packages ?? "",
    inv.harga,
    inv.status_invoice,
    inv.status_spk,
  ];
}

export const CUSTOMER_CSV_HEADERS = [
  "id",
  "nama_perusahaan",
  "alamat",
  "pic",
  "kontak",
  "created_at",
  "updated_at",
] as const;

/** Satu customer → satu baris CSV. */
export function customerToCsvRow(c: Customer): Array<string | number> {
  return [
    c.id,
    c.nama_perusahaan,
    c.alamat,
    c.pic,
    c.kontak,
    c.created_at ?? "",
    c.updated_at ?? "",
  ];
}

/**
 * Nama file export, mis. `invoice-2026-11-26.csv`.
 * Tanggal diambil dari komponen lokal (bukan `toISOString`/UTC) supaya
 * tanggal di nama file sama dengan tanggal yang dilihat pengguna.
 */
export function csvFilename(prefix: string, date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${prefix}-${year}-${month}-${day}.csv`;
}

/**
 * Unduh string CSV sebagai file lewat `Blob` + `URL.createObjectURL`.
 * BOM (`\uFEFF`) di depan supaya spreadsheet (Excel) membuka file UTF-8
 * dengan benar; `toCsv` sendiri tidak menambahkan BOM.
 */
export function downloadCsv(filename: string, csv: string): void {
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
