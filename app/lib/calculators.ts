/**
 * Pure calculation helpers for BMI/BFP and loan installment simulation.
 */

export function classifyBmi(bmi: number): string {
  if (bmi < 18.5) return "Underweight (Kurus)";
  if (bmi < 25) return "Normal Weight (Ideal)";
  if (bmi < 30) return "Overweight (Kelebihan Berat)";
  if (bmi < 35) return "Obese Class I (Obesitas Stadium I)";
  if (bmi < 40) return "Obese Class II (Obesitas Stadium II)";
  return "Obese Class III (Obesitas Stadium III)";
}

export function calculateBfpBoer(
  gender: "L" | "P",
  tinggiCm: number,
  beratKg: number,
): number {
  const lbm =
    gender === "L"
      ? 0.407 * beratKg + 0.267 * tinggiCm - 19.2
      : 0.252 * beratKg + 0.473 * tinggiCm - 48.3;
  const bfp = ((beratKg - lbm) / beratKg) * 100;
  return parseFloat(bfp.toFixed(2));
}

export interface InstallmentRow {
  month: number;
  installment: number;
  principalPart: number;
  interestPart: number;
  remainingLoan: number;
}

export interface InstallmentResult {
  dpAmount: number;
  loanPrincipal: number;
  monthlyInstallment: number;
  totalInterest: number;
  totalPayment: number;
  schedule: InstallmentRow[];
}

export function calculateInstallment(params: {
  vehiclePrice: number;
  dpPercent: number;
  tenorMonths: number;
  interestRateYearly: number;
  scheme: "flat" | "efektif";
}): InstallmentResult {
  const vehiclePrice = Math.max(0, Number(params.vehiclePrice) || 0);
  const dpPercent = Math.max(0, Math.min(100, Number(params.dpPercent) || 0));
  const tenorMonths = Math.max(0, Math.floor(Number(params.tenorMonths) || 0));
  const interestRateYearly = Math.max(
    0,
    Math.min(100, Number(params.interestRateYearly) || 0),
  );

  const dpAmount = (vehiclePrice * dpPercent) / 100;
  const loanPrincipal = Math.max(vehiclePrice - dpAmount, 0);
  const tenorYears = tenorMonths / 12;

  let monthlyInstallment = 0;
  let totalInterest = 0;
  let totalPayment = 0;

  if (params.scheme === "flat") {
    totalInterest = loanPrincipal * (interestRateYearly / 100) * tenorYears;
    totalPayment = loanPrincipal + totalInterest;
    monthlyInstallment = tenorMonths > 0 ? totalPayment / tenorMonths : 0;
  } else {
    const monthlyRate = interestRateYearly / 100 / 12;
    if (tenorMonths > 0) {
      if (monthlyRate === 0) {
        monthlyInstallment = loanPrincipal / tenorMonths;
        totalPayment = loanPrincipal;
        totalInterest = 0;
      } else {
        monthlyInstallment =
          (loanPrincipal *
            (monthlyRate * Math.pow(1 + monthlyRate, tenorMonths))) /
          (Math.pow(1 + monthlyRate, tenorMonths) - 1);
        totalPayment = monthlyInstallment * tenorMonths;
        totalInterest = totalPayment - loanPrincipal;
      }
    }
  }

  // Amortization schedule generator (first 12 months)
  const schedule: InstallmentRow[] = [];
  let remaining = loanPrincipal;
  const monthlyRate = interestRateYearly / 100 / 12;

  for (let i = 1; i <= Math.min(tenorMonths, 12); i++) {
    let interestPart = 0;
    let principalPart = 0;

    if (params.scheme === "flat") {
      interestPart = totalInterest / tenorMonths;
      principalPart = loanPrincipal / tenorMonths;
    } else if (monthlyRate === 0) {
      interestPart = 0;
      principalPart = monthlyInstallment;
    } else {
      interestPart = remaining * monthlyRate;
      principalPart = monthlyInstallment - interestPart;
    }
    remaining = Math.max(remaining - principalPart, 0);

    schedule.push({
      month: i,
      installment: monthlyInstallment,
      principalPart,
      interestPart,
      remainingLoan: remaining,
    });
  }

  return {
    dpAmount,
    loanPrincipal,
    monthlyInstallment,
    totalInterest,
    totalPayment,
    schedule,
  };
}
