import { describe, expect, it } from "vitest";
import {
  createStore,
  getByIdOr404,
  nextId,
  paginate,
  parsePositiveId,
  removeById,
  replaceById,
  type Store,
} from "@/app/api/_store";

interface Item {
  id: number;
  nama: string;
}

function sampleStore(): Store<Item> {
  return createStore<Item>([
    { id: 1, nama: "A" },
    { id: 2, nama: "B" },
    { id: 3, nama: "C" },
    { id: 4, nama: "D" },
    { id: 5, nama: "E" },
  ]);
}

describe("createStore + nextId", () => {
  it("counter id dimulai dari max id + 1, bukan Date.now()", () => {
    const store = sampleStore();
    expect(nextId(store)).toBe(6);
    expect(nextId(store)).toBe(7);
  });

  it("store kosong memulai id dari 1", () => {
    const store = createStore<Item>([]);
    expect(nextId(store)).toBe(1);
  });
});

describe("paginate", () => {
  it("memotong store menjadi halaman dengan bentuk Paginated", () => {
    const page = paginate(sampleStore(), 1, 2, "/api/contoh");
    expect(page.data).toHaveLength(2);
    expect(page.data[0]?.nama).toBe("A");
    expect(page.total).toBe(5);
    expect(page.current_page).toBe(1);
    expect(page.last_page).toBe(3);
    expect(page.next_page_url).toBe("/api/contoh?page=2");
    expect(page.prev_page_url).toBeNull();
  });

  it("halaman terakhir tidak punya next_page_url", () => {
    const page = paginate(sampleStore(), 3, 2, "/api/contoh");
    expect(page.data).toHaveLength(1);
    expect(page.next_page_url).toBeNull();
    expect(page.prev_page_url).toBe("/api/contoh?page=2");
  });

  it("halaman di luar jangkauan mengembalikan data kosong, bukan halaman terakhir", () => {
    const page = paginate(sampleStore(), 99, 2, "/api/contoh");
    expect(page.data).toEqual([]);
    expect(page.total).toBe(5);
  });

  it("halaman tidak valid jatuh ke halaman 1", () => {
    expect(paginate(sampleStore(), 0, 2).current_page).toBe(1);
    expect(paginate(sampleStore(), NaN, 2).current_page).toBe(1);
  });
});

describe("getByIdOr404", () => {
  it("mengembalikan item bila id ada", () => {
    expect(getByIdOr404(sampleStore(), 3)).toEqual({ id: 3, nama: "C" });
  });

  it("mengembalikan null bila id tidak ada — tanpa fallback ke item pertama", () => {
    expect(getByIdOr404(sampleStore(), 999)).toBeNull();
    expect(getByIdOr404(sampleStore(), NaN)).toBeNull();
  });
});

describe("replaceById + removeById", () => {
  it("replace mengubah item dan mempertahankan id", () => {
    const store = sampleStore();
    const updated = replaceById(store, 2, { nama: "B-baru", id: 999 });
    expect(updated).toEqual({ id: 2, nama: "B-baru" });
    expect(getByIdOr404(store, 2)?.nama).toBe("B-baru");
  });

  it("replace id yang tidak ada mengembalikan null", () => {
    expect(replaceById(sampleStore(), 999, { nama: "X" })).toBeNull();
  });

  it("remove menghapus item dan mengembalikan true; id yang tidak ada false", () => {
    const store = sampleStore();
    expect(removeById(store, 1)).toBe(true);
    expect(store.items).toHaveLength(4);
    expect(getByIdOr404(store, 1)).toBeNull();
    expect(removeById(store, 1)).toBe(false);
  });
});

describe("parsePositiveId", () => {
  it("menerima integer positif dan menolak string tidak valid", () => {
    expect(parsePositiveId("12")).toBe(12);
    expect(parsePositiveId("12abc")).toBeNull();
    expect(parsePositiveId("0")).toBeNull();
    expect(parsePositiveId("-5")).toBeNull();
    expect(parsePositiveId("")).toBeNull();
  });
});
