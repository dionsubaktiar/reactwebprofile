/**
 * Store in-memory bersama untuk mock API invoicing (Hari 2).
 *
 * Masalah yang diperbaiki: tiap `route.ts` koleksi dulu punya salinan
 * store-nya sendiri (`let customersStore = [...initialCustomers]`), sementara
 * route `[id]` membaca `initial*` mentah dari `mockData` — akibatnya
 * PUT/DELETE hanya meng-echo tanpa menyimpan, dan GET by-id tidak pernah
 * melihat data yang baru dibuat. Sekarang satu store per resource tinggal
 * di sini dan dipakai bersama oleh route koleksi dan route `[id]`, jadi
 * perubahan bertahan selama server jalan.
 *
 * File ini BUKAN route: namanya diawali underscore dan tidak ada
 * `route.ts` di sebelahnya, jadi Next.js tidak mengeksposnya sebagai endpoint.
 */
import {
  initialCustomers,
  initialInvoices,
  initialPackages,
  initialParts,
  initialUnits,
} from "./mockData";
import type {
  Customer,
  Invoice,
  Package,
  Paginated,
  Part,
  Unit,
} from "@/app/lib/types";

/** Satu store per resource: array item + counter id berikutnya. */
export interface Store<T extends { id: number }> {
  items: T[];
  nextIdCounter: number;
}

export function createStore<T extends { id: number }>(
  initial: T[],
): Store<T> {
  const maxId = initial.reduce((max, item) => Math.max(max, item.id), 0);
  return { items: [...initial], nextIdCounter: maxId + 1 };
}

/** Id baru dari counter yang naik — bukan `Date.now()`, supaya id stabil, unik, dan tidak bentrok. */
export function nextId<T extends { id: number }>(store: Store<T>): number {
  const id = store.nextIdCounter;
  store.nextIdCounter += 1;
  return id;
}

export const customersStore = createStore<Customer>(initialCustomers);
export const unitsStore = createStore<Unit>(initialUnits);
export const partsStore = createStore<Part>(initialParts);
export const packagesStore = createStore<Package>(initialPackages);
export const invoicesStore = createStore<Invoice>(initialInvoices);

/**
 * Potong store menjadi satu halaman dengan bentuk `Paginated<T>` yang sama
 * di semua resource: `{ message, data: Paginated<T> }`.
 * `perPage` mengikuti `?per_page=` (default 10); halaman di luar jangkauan
 * mengembalikan `data: []` seperti sebelumnya, bukan halaman terakhir.
 */
export function paginate<T extends { id: number }>(
  store: Store<T>,
  page: number,
  perPage = 10,
  basePath = "",
): Paginated<T> {
  const total = store.items.length;
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safePerPage =
    Number.isFinite(perPage) && perPage > 0 ? Math.floor(perPage) : 10;
  const lastPage = Math.max(1, Math.ceil(total / safePerPage));
  const start = (safePage - 1) * safePerPage;

  return {
    current_page: safePage,
    data: store.items.slice(start, start + safePerPage),
    last_page: lastPage,
    prev_page_url:
      safePage > 1 && basePath ? `${basePath}?page=${safePage - 1}` : null,
    next_page_url:
      safePage < lastPage && basePath
        ? `${basePath}?page=${safePage + 1}`
        : null,
    total,
  };
}

/** Parse string id menjadi integer positif, atau `null` bila tidak valid. */
export function parsePositiveId(raw: string): number | null {
  const trimmed = raw.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  const num = Number(trimmed);
  return Number.isSafeInteger(num) && num > 0 ? num : null;
}

/**
 * Cari item berdasarkan id. Kembalikan `null` bila tidak ada — route
 * membalas 404, bukan lagi fallback ke item pertama (`initial*[0]`).
 */
export function getByIdOr404<T extends { id: number }>(
  store: Store<T>,
  id: number,
): T | null {
  if (!Number.isFinite(id)) return null;
  return store.items.find((item) => item.id === id) ?? null;
}

/** Gabungkan `patch` ke item yang ada (id tidak bisa diubah lewat body). */
export function replaceById<T extends { id: number }>(
  store: Store<T>,
  id: number,
  patch: Partial<T>,
): T | null {
  const index = store.items.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const updated = { ...store.items[index], ...patch, id };
  store.items[index] = updated;
  return updated;
}

/** Hapus item dari store; `false` bila id tidak ada. */
export function removeById<T extends { id: number }>(
  store: Store<T>,
  id: number,
): boolean {
  const index = store.items.findIndex((item) => item.id === id);
  if (index === -1) return false;
  store.items.splice(index, 1);
  return true;
}
