/**
 * Alur status invoice & SPK (Hari 6) — SATU-SATUNYA definisi transisi.
 *
 * Dipakai dua sisi: mock route (`app/api/invoice/[id]/route.ts` menolak
 * transisi yang tidak ada di peta ini dengan 400) dan halaman
 * (`app/invoicing-service/page.tsx`, `invoice/view`) yang hanya
 * menampilkan aksi untuk transisi yang diizinkan. Jangan menulis string
 * status bebas atau transisi ad-hoc di tempat lain — tambah ke peta ini.
 */
import type { InvoiceStatus, SpkStatus } from "./types";

/** Invoice: Pending → Lunas. Lunas adalah status akhir (tidak bisa kembali). */
export const INVOICE_STATUS_TRANSITIONS: Record<
  InvoiceStatus,
  InvoiceStatus[]
> = {
  Pending: ["Lunas"],
  Lunas: [],
};

/** SPK: Pending → Dalam Pengerjaan → Selesai. Selesai adalah status akhir. */
export const SPK_STATUS_TRANSITIONS: Record<SpkStatus, SpkStatus[]> = {
  Pending: ["Dalam Pengerjaan"],
  "Dalam Pengerjaan": ["Selesai"],
  Selesai: [],
};

/** `true` bila `to` sama dengan `from` atau ada di peta transisi `from`. */
export function isValidInvoiceStatusTransition(
  from: InvoiceStatus,
  to: InvoiceStatus,
): boolean {
  if (from === to) return true;
  return (INVOICE_STATUS_TRANSITIONS[from] ?? []).includes(to);
}

/** `true` bila `to` sama dengan `from` atau ada di peta transisi `from`. */
export function isValidSpkStatusTransition(
  from: SpkStatus,
  to: SpkStatus,
): boolean {
  if (from === to) return true;
  return (SPK_STATUS_TRANSITIONS[from] ?? []).includes(to);
}

/** Status invoice berikutnya dalam alur, atau `null` bila sudah di ujung. */
export function nextInvoiceStatus(
  current: InvoiceStatus,
): InvoiceStatus | null {
  return INVOICE_STATUS_TRANSITIONS[current]?.[0] ?? null;
}

/** Status SPK berikutnya dalam alur, atau `null` bila sudah di ujung. */
export function nextSpkStatus(current: SpkStatus): SpkStatus | null {
  return SPK_STATUS_TRANSITIONS[current]?.[0] ?? null;
}
