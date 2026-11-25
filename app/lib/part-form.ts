/**
 * Logika form Part yang bisa diuji (Hari 7).
 *
 * Bug P0 Hari 1: input form Part tidak punya atribut `name`, sehingga
 * `handleChange` membaca `e.target.name === ""` dan state tidak pernah
 * terisi — form "tidak bisa menyimpan". Logika yang sama juga mengonversi
 * `harga`/`jasa` ke `Number` (input HTML selalu mengembalikan string).
 *
 * Supaya bug itu tertangkap test, logika perubahan field diekstrak ke sini
 * dan dipakai `parts/create` dan `parts/edit` — bukan ditulis dua kali di
 * halaman.
 */

export interface PartFormState {
  part_number: string;
  nama_barang: string;
  merk: string;
  kendaraan: string;
  harga: number;
  jasa: number;
}

/** Nilai awal form create Part — sama seperti sebelum Hari 7. */
export const PART_FORM_DEFAULTS: PartFormState = {
  part_number: "",
  nama_barang: "",
  merk: "",
  kendaraan: "Truck",
  harga: 250000,
  jasa: 50000,
};

const NUMBER_FIELDS = new Set(["harga", "jasa"]);

/**
 * Terapkan satu perubahan field form ke state.
 *
 * - Field `harga`/`jasa` dikonversi ke `Number` (string dari input HTML
 *   harus jadi angka sebelum dikirim ke API).
 * - Field lain disimpan apa adanya (string).
 * - `name` kosong atau bukan field form yang dikenal: state dikembalikan
 *   tanpa perubahan — input tanpa atribut `name` tidak boleh merusak
 *   state diam-diam (regresi bug Hari 1).
 *
 * Generik supaya dipakai form create (`PartFormState`) dan form edit
 * (`Part`, yang punya `id` dan `part_number` nullable) tanpa duplikasi.
 * Constraint sengaja `object`, bukan `Record<...>` — interface seperti
 * `PartFormState` tidak punya index signature implisit dan tidak bisa
 * di-assign ke `Record`, padahal pengecekan `name in state` di bawah
 * sudah menjamin hanya field yang dikenal yang diubah.
 */
export function applyPartFieldChange<T extends object>(
  state: T,
  name: string,
  value: string,
): T {
  if (!name || !(name in state)) return state;
  const parsedValue = NUMBER_FIELDS.has(name) ? Number(value) : value;
  return { ...state, [name]: parsedValue } as T;
}
