import { describe, expect, it } from "vitest";
import { formatDateId, formatIDR, formatKm } from "@/app/lib/format";

describe("formatIDR", () => {
  // Intl id-ID menyisipkan non-breaking space (U+00A0) antara "Rp" dan angka.
  it("memformat angka sebagai Rupiah tanpa desimal", () => {
    expect(formatIDR(1250000)).toBe("Rp\u00a01.250.000");
    expect(formatIDR(0)).toBe("Rp\u00a00");
  });

  it("membulatkan pecahan desimal", () => {
    expect(formatIDR(999.6)).toBe("Rp\u00a01.000");
  });
});

describe("formatDateId", () => {
  it("memformat tanggal ke bahasa Indonesia (12 Mar 2026)", () => {
    expect(formatDateId("2026-03-12")).toBe("12 Mar 2026");
  });

  it("menerima objek Date", () => {
    expect(formatDateId(new Date(2026, 0, 5))).toBe("05 Jan 2026");
  });
});

describe("formatKm", () => {
  it("memformat kilometer dengan pemisah ribuan id-ID", () => {
    expect(formatKm(12500)).toBe("12.500");
    expect(formatKm(0)).toBe("0");
  });
});
