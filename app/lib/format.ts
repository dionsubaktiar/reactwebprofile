/**
 * Helper format bersama untuk invoicing.
 * Dipindahkan dari `app/invoicing-service/page.tsx` dan
 * `app/invoicing-service/parts/page.tsx` (formatIDR sebelumnya duplikat
 * di kedua file). Jangan mendefinisikan ulang helper ini di file halaman.
 */

/** Format angka sebagai Rupiah, tanpa pecahan desimal. */
export const formatIDR = (val: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

/** Format tanggal ke bahasa Indonesia, mis. "12 Mar 2026". */
export const formatDateId = (
  value: string | Date,
  options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }
): string => {
  return new Date(value).toLocaleDateString("id-ID", options);
};

/** Format angka kilometer dengan pemisah ribuan id-ID. */
export const formatKm = (val: number): string => {
  return Number(val || 0).toLocaleString("id-ID");
};
