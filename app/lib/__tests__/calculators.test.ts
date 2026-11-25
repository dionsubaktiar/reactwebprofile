import { describe, expect, it } from "vitest";
import {
  calculateBfpBoer,
  calculateInstallment,
  classifyBmi,
} from "@/app/lib/calculators";

describe("classifyBmi", () => {
  it("mengklasifikasikan batas BMI tanpa celah termasuk 24.95", () => {
    expect(classifyBmi(18.4)).toMatch(/Underweight/);
    expect(classifyBmi(18.5)).toMatch(/Normal Weight/);
    expect(classifyBmi(24.95)).toMatch(/Normal Weight/);
    expect(classifyBmi(24.99)).toMatch(/Normal Weight/);
    expect(classifyBmi(25.0)).toMatch(/Overweight/);
    expect(classifyBmi(29.95)).toMatch(/Overweight/);
    expect(classifyBmi(30.0)).toMatch(/Obese Class I/);
    expect(classifyBmi(35.0)).toMatch(/Obese Class II/);
    expect(classifyBmi(40.0)).toMatch(/Obese Class III/);
  });
});

describe("calculateBfpBoer", () => {
  it("menghitung persentase lemak tubuh pria dan wanita", () => {
    expect(calculateBfpBoer("L", 172, 68)).toBe(20);
    expect(calculateBfpBoer("P", 160, 55)).toBeCloseTo(25.02, 2);
  });
});

describe("calculateInstallment", () => {
  it("menghitung skema efektif bunga 0% dengan benar tanpa menjadi 0", () => {
    const res = calculateInstallment({
      vehiclePrice: 120000000,
      dpPercent: 20,
      tenorMonths: 12,
      interestRateYearly: 0,
      scheme: "efektif",
    });
    expect(res.loanPrincipal).toBe(96000000);
    expect(res.monthlyInstallment).toBe(8000000);
    expect(res.totalInterest).toBe(0);
    expect(res.totalPayment).toBe(96000000);
    expect(res.schedule).toHaveLength(12);
    expect(res.schedule[11]?.remainingLoan).toBe(0);
  });
});
