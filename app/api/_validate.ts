/**
 * Validasi minimal untuk POST/PUT mock API (Hari 2).
 *
 * Aturan: tiap validator mengembalikan pesan error (string) bila body tidak
 * valid, atau `null` bila valid. Route membalas 400 dengan pesan itu.
 * Validasi dijalankan terhadap body POST maupun terhadap hasil gabungan
 * (data lama + body) pada PUT, supaya PUT tidak bisa mengosongkan field
 * wajib.
 */
import { getByIdOr404, partsStore } from "./_store";
import type { Invoice, InvoicePart } from "@/app/lib/types";
import {
  INVOICE_STATUS_TRANSITIONS,
  SPK_STATUS_TRANSITIONS,
  isValidInvoiceStatusTransition,
  isValidSpkStatusTransition,
} from "@/app/lib/invoice-status";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "";
}

function isPresentNumber(value: unknown): boolean {
  return (
    value !== undefined &&
    value !== null &&
    value !== "" &&
    Number.isFinite(Number(value))
  );
}

export function validateCustomer(body: unknown): string | null {
  if (!body || typeof body !== "object") return "body tidak valid";
  if (!isNonEmptyString((body as { nama_perusahaan?: unknown }).nama_perusahaan)) {
    return "nama_perusahaan wajib diisi";
  }
  return null;
}

export function validatePart(body: unknown): string | null {
  if (!body || typeof body !== "object") return "body tidak valid";
  if (!isNonEmptyString((body as { nama_barang?: unknown }).nama_barang)) {
    return "nama_barang wajib diisi";
  }
  return null;
}

export function validateUnit(body: unknown): string | null {
  if (!body || typeof body !== "object") return "body tidak valid";
  if (!isNonEmptyString((body as { nopol?: unknown }).nopol)) {
    return "nopol wajib diisi";
  }
  return null;
}

export function validateInvoice(body: unknown): string | null {
  if (!body || typeof body !== "object") return "body tidak valid";
  const invoice = body as {
    kilometer?: unknown;
    tanggal?: unknown;
    status_invoice?: unknown;
    status_spk?: unknown;
  };
  if (!isPresentNumber(invoice.kilometer)) {
    return "kilometer wajib diisi dengan angka";
  }
  if (!isNonEmptyString(invoice.tanggal)) {
    return "tanggal wajib diisi";
  }
  // Status hanya boleh berisi nilai dari union type (Hari 6) — string bebas
  // seperti "LUNAS", "paid", atau "Batal" ditolak dengan 400.
  if (
    invoice.status_invoice !== undefined &&
    !Object.keys(INVOICE_STATUS_TRANSITIONS).includes(
      String(invoice.status_invoice),
    )
  ) {
    return "status_invoice tidak valid (harus Pending atau Lunas)";
  }
  if (
    invoice.status_spk !== undefined &&
    !Object.keys(SPK_STATUS_TRANSITIONS).includes(String(invoice.status_spk))
  ) {
    return "status_spk tidak valid (harus Pending, Dalam Pengerjaan, atau Selesai)";
  }
  return null;
}

/**
 * Validasi transisi status invoice/SPK (Hari 6): perubahan status hanya
 * boleh mengikuti peta di `app/lib/invoice-status.ts`. Status yang tidak
 * berubah selalu lolos (edit biasa tidak mengirim status, jadi tidak
 * terganggu). Kembalikan pesan error bila ada transisi yang tidak
 * diizinkan, atau `null` bila semua perubahan valid.
 */
export function validateInvoiceStatusTransition(
  existing: Invoice,
  next: Invoice,
): string | null {
  if (
    next.status_invoice !== undefined &&
    existing.status_invoice !== undefined &&
    !isValidInvoiceStatusTransition(
      existing.status_invoice,
      next.status_invoice,
    )
  ) {
    return `Transisi status invoice "${existing.status_invoice}" → "${next.status_invoice}" tidak diizinkan (hanya Pending → Lunas)`;
  }
  if (
    next.status_spk !== undefined &&
    existing.status_spk !== undefined &&
    !isValidSpkStatusTransition(existing.status_spk, next.status_spk)
  ) {
    return `Transisi status SPK "${existing.status_spk}" → "${next.status_spk}" tidak diizinkan (hanya Pending → Dalam Pengerjaan → Selesai)`;
  }
  return null;
}

/**
 * Normalisasi daftar part invoice dari payload form.
 *
 * Form create mengirim `id_part: [{ id_part, qty }]`, form edit mengirim
 * `id_part: [{ id_part, qty: quantity }]` — keduanya dinormalisasi ke
 * `InvoicePart[]` dengan field kanonik `quantity`. Entri tanpa `id_part`
 * yang valid (mis. baris kosong bawaan form) dibuang. `name` dan
 * `total_price` diisi dari data part di store supaya halaman view bisa
 * menampilkannya tanpa fetch tambahan.
 */
export function normalizeInvoiceParts(input: unknown): InvoicePart[] {
  if (!Array.isArray(input)) return [];
  const result: InvoicePart[] = [];
  for (const entry of input) {
    if (!entry || typeof entry !== "object") continue;
    const raw = entry as {
      id_part?: unknown;
      qty?: unknown;
      quantity?: unknown;
    };
    const idPart = Number(raw.id_part);
    if (!Number.isFinite(idPart) || idPart <= 0) continue;
    const quantity = Number(raw.qty ?? raw.quantity ?? 1);
    const part = getByIdOr404(partsStore, idPart);
    const unitPrice = part ? part.harga + part.jasa : 0;
    result.push({
      id_part: idPart,
      name: part?.nama_barang,
      quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
      total_price: unitPrice * (Number.isFinite(quantity) && quantity > 0 ? quantity : 1),
    });
  }
  return result;
}
