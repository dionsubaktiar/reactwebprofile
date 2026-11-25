import { describe, expect, it } from "vitest";
import {
  isValidInvoiceStatusTransition,
  isValidSpkStatusTransition,
  nextInvoiceStatus,
  nextSpkStatus,
} from "@/app/lib/invoice-status";

describe("alur status invoice (Hari 6)", () => {
  it("Pending → Lunas diizinkan; Lunas adalah status akhir", () => {
    expect(isValidInvoiceStatusTransition("Pending", "Lunas")).toBe(true);
    expect(isValidInvoiceStatusTransition("Lunas", "Pending")).toBe(false);
    expect(isValidInvoiceStatusTransition("Lunas", "Lunas")).toBe(true);
    expect(nextInvoiceStatus("Pending")).toBe("Lunas");
    expect(nextInvoiceStatus("Lunas")).toBeNull();
  });

  it("string status bebas bukan transisi yang valid", () => {
    expect(isValidInvoiceStatusTransition("Pending", "Batal" as "Lunas")).toBe(
      false,
    );
  });
});

describe("alur status SPK (Hari 6)", () => {
  it("Pending → Dalam Pengerjaan → Selesai; tidak boleh mundur", () => {
    expect(isValidSpkStatusTransition("Pending", "Dalam Pengerjaan")).toBe(
      true,
    );
    expect(isValidSpkStatusTransition("Dalam Pengerjaan", "Selesai")).toBe(
      true,
    );
    expect(isValidSpkStatusTransition("Selesai", "Pending")).toBe(false);
    expect(isValidSpkStatusTransition("Dalam Pengerjaan", "Pending")).toBe(
      false,
    );
    expect(nextSpkStatus("Pending")).toBe("Dalam Pengerjaan");
    expect(nextSpkStatus("Selesai")).toBeNull();
  });
});
