import { describe, expect, it } from "vitest";
import {
  applyPartFieldChange,
  PART_FORM_DEFAULTS,
  type PartFormState,
} from "@/app/lib/part-form";

describe("applyPartFieldChange", () => {
  it("field teks disimpan sebagai string", () => {
    const next = applyPartFieldChange(
      PART_FORM_DEFAULTS,
      "nama_barang",
      "Oli Mesin",
    );
    expect(next.nama_barang).toBe("Oli Mesin");
    expect(next.merk).toBe("");
  });

  it("harga dan jasa dikonversi ke Number — bukan string dari input HTML", () => {
    const next = applyPartFieldChange(PART_FORM_DEFAULTS, "harga", "250000");
    expect(next.harga).toBe(250000);
    expect(typeof next.harga).toBe("number");
    const nextJasa = applyPartFieldChange(next, "jasa", "50000");
    expect(nextJasa.jasa).toBe(50000);
    expect(typeof nextJasa.jasa).toBe("number");
  });

  it("tidak mengubah state asli (immutable)", () => {
    const state: PartFormState = { ...PART_FORM_DEFAULTS };
    applyPartFieldChange(state, "merk", "Toyota");
    expect(state.merk).toBe("");
  });

  it("input tanpa atribut name (bug Hari 1) tidak merusak state", () => {
    const state: PartFormState = { ...PART_FORM_DEFAULTS };
    expect(applyPartFieldChange(state, "", "Oli Mesin")).toBe(state);
    expect(applyPartFieldChange(state, "", "Oli Mesin")).toEqual(
      PART_FORM_DEFAULTS,
    );
  });

  it("field yang tidak dikenal diabaikan", () => {
    const state: PartFormState = { ...PART_FORM_DEFAULTS };
    expect(applyPartFieldChange(state, "tidak_ada", "x")).toBe(state);
  });
});
