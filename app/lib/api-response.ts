/**
 * Parsing respons list mock API (Hari 7).
 *
 * Kontrak Hari 2: respons list berbentuk `{ message, data: Paginated<T> }`.
 * Bentuk lama `/packages` mengembalikan array langsung di `data`, sehingga
 * halaman yang membaca `response.data.data` mendapat objek, bukan array —
 * itulah yang dulu membuat dropdown paket di `invoice/create` crash.
 * Helper ini memvalidasi bentuk respons di satu tempat dan menolak bentuk
 * lama dengan pesan yang jelas, supaya regresi tertangkap test.
 */
import type { Paginated } from "./types";

/** Ambil `Paginated<T>` dari body respons list; lempar bila bentuknya salah. */
export function parsePaginatedResponse<T>(body: unknown): Paginated<T> {
  if (!body || typeof body !== "object") {
    throw new Error("respons API tidak valid: body bukan objek");
  }
  const data = (body as { data?: unknown }).data;
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(
      "respons API tidak valid: data harus berupa objek Paginated, bukan array langsung",
    );
  }
  const paginated = data as Paginated<T>;
  if (!Array.isArray(paginated.data) || typeof paginated.total !== "number") {
    throw new Error(
      "respons API tidak valid: data.data harus berupa array dan data.total harus berupa angka",
    );
  }
  return paginated;
}
