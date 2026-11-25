/**
 * Logika laporan invoice per periode (Hari 8) — fungsi murni.
 *
 * Dipakai halaman `app/invoicing-service/laporan/page.tsx`. Semua angka
 * laporan (jumlah, total, lunas vs pending, rata-rata) dihitung dari data
 * invoice yang difilter di sini — tidak ada angka hardcode di halaman.
 * Periode dibaca dari `Invoice.tanggal` (`YYYY-MM-DD`); tanggal yang tidak
 * bisa diparse dikeluarkan dari laporan (bukan ditebak periodenya).
 */
import type { Invoice, InvoiceStatus, SpkStatus } from "./types";

/** Nama bulan Indonesia untuk opsi select filter periode. */
export const NAMA_BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
] as const;

/** Bulan 1–12, atau `"semua"` untuk seluruh bulan dalam tahun terpilih. */
export type LaporanBulan = number | "semua";
/** Tahun, atau `"semua"` untuk seluruh tahun yang ada di data. */
export type LaporanTahun = number | "semua";

export interface LaporanFilter {
  bulan: LaporanBulan;
  tahun: LaporanTahun;
  statusInvoice: InvoiceStatus | "semua";
  statusSpk: SpkStatus | "semua";
}

/**
 * Filter awal halaman laporan: seluruh bulan di tahun berjalan.
 * Tahun berjalan dipakai supaya laporan langsung menampilkan data tahun
 * ini (mock saat ini berisi invoice 2026), bukan halaman kosong.
 */
export const DEFAULT_LAPORAN_FILTER: LaporanFilter = {
  bulan: "semua",
  tahun: new Date().getFullYear(),
  statusInvoice: "semua",
  statusSpk: "semua",
};

/**
 * Parse `tanggal` invoice (`YYYY-MM-DD`) menjadi `{ tahun, bulan }`
 * (bulan 1–12). Kembalikan `null` bila formatnya tidak valid — sengaja
 * parse komponen tanggalnya langsung (bukan `new Date`) supaya hasilnya
 * tidak bergeser oleh zona waktu.
 */
export function parsePeriodeTanggal(tanggal: string): {
  tahun: number;
  bulan: number;
} | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(tanggal.trim());
  if (!match) return null;
  const tahun = Number(match[1]);
  const bulan = Number(match[2]);
  const hari = Number(match[3]);
  if (bulan < 1 || bulan > 12 || hari < 1 || hari > 31) return null;
  return { tahun, bulan };
}

/**
 * Saring invoice menurut periode (bulan/tahun dari `tanggal`) dan status.
 * Invoice yang tanggalnya tidak valid dikeluarkan — tidak bisa
 * ditempatkan di periode mana pun, jadi tidak ikut KPI.
 */
export function filterInvoicesByPeriod(
  invoices: Invoice[],
  filter: LaporanFilter,
): Invoice[] {
  return invoices.filter((inv) => {
    const periode = parsePeriodeTanggal(inv.tanggal);
    if (!periode) return false;
    if (filter.bulan !== "semua" && periode.bulan !== filter.bulan)
      return false;
    if (filter.tahun !== "semua" && periode.tahun !== filter.tahun)
      return false;
    if (
      filter.statusInvoice !== "semua" &&
      inv.status_invoice !== filter.statusInvoice
    )
      return false;
    if (filter.statusSpk !== "semua" && inv.status_spk !== filter.statusSpk)
      return false;
    return true;
  });
}

export interface LaporanRingkasan {
  /** Jumlah invoice pada periode terpilih. */
  jumlah: number;
  /** Total nilai (`harga`) invoice pada periode terpilih. */
  totalNilai: number;
  /** Jumlah invoice berstatus Lunas. */
  lunas: number;
  /** Jumlah invoice berstatus Pending. */
  pending: number;
  /** Rata-rata nilai invoice; 0 bila tidak ada invoice. */
  rataRata: number;
  /** Rincian SPK pada periode terpilih. */
  spkSelesai: number;
  spkDalamPengerjaan: number;
  spkPending: number;
}

/** Hitung KPI periode dari invoice yang sudah difilter. */
export function summarizeInvoices(invoices: Invoice[]): LaporanRingkasan {
  const jumlah = invoices.length;
  const totalNilai = invoices.reduce((acc, inv) => acc + (inv.harga || 0), 0);
  return {
    jumlah,
    totalNilai,
    lunas: invoices.filter((inv) => inv.status_invoice === "Lunas").length,
    pending: invoices.filter((inv) => inv.status_invoice === "Pending").length,
    rataRata: jumlah > 0 ? totalNilai / jumlah : 0,
    spkSelesai: invoices.filter((inv) => inv.status_spk === "Selesai").length,
    spkDalamPengerjaan: invoices.filter(
      (inv) => inv.status_spk === "Dalam Pengerjaan",
    ).length,
    spkPending: invoices.filter((inv) => inv.status_spk === "Pending").length,
  };
}

/**
 * Tahun-tahun yang ada di data (urut menurun) — opsi select tahun.
 * Bila data kosong, kembalikan array kosong; halaman menambahkan tahun
 * berjalan supaya select tidak kosong.
 */
export function availableYears(invoices: Invoice[]): number[] {
  const years = new Set<number>();
  for (const inv of invoices) {
    const periode = parsePeriodeTanggal(inv.tanggal);
    if (periode) years.add(periode.tahun);
  }
  return [...years].sort((a, b) => b - a);
}
