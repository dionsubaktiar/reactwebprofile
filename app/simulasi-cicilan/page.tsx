// Service: reactwebprofile | File: app/simulasi-cicilan/page.tsx
'use client';

import { useState, useMemo } from 'react';
import Navbar from '../components/navbar';
import { HiCalculator, HiOutlineInformationCircle } from 'react-icons/hi';

export default function SimulasiCicilanPage() {
  const [vehiclePrice, setVehiclePrice] = useState<number>(250000000);
  const [dpPercent, setDpPercent] = useState<number>(20);
  const [tenorMonths, setTenorMonths] = useState<number>(36);
  const [interestRateYearly, setInterestRateYearly] = useState<number>(8.5);
  const [scheme, setScheme] = useState<'flat' | 'efektif'>('flat');

  const calculation = useMemo(() => {
    const dpAmount = (vehiclePrice * dpPercent) / 100;
    const loanPrincipal = Math.max(vehiclePrice - dpAmount, 0);
    const tenorYears = tenorMonths / 12;

    let monthlyInstallment = 0;
    let totalInterest = 0;
    let totalPayment = 0;

    if (scheme === 'flat') {
      totalInterest = loanPrincipal * (interestRateYearly / 100) * tenorYears;
      totalPayment = loanPrincipal + totalInterest;
      monthlyInstallment = tenorMonths > 0 ? totalPayment / tenorMonths : 0;
    } else {
      // Skema Efektif / Anuitas
      const monthlyRate = interestRateYearly / 100 / 12;
      if (monthlyRate > 0 && tenorMonths > 0) {
        monthlyInstallment =
          (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, tenorMonths))) /
          (Math.pow(1 + monthlyRate, tenorMonths) - 1);
        totalPayment = monthlyInstallment * tenorMonths;
        totalInterest = totalPayment - loanPrincipal;
      }
    }

    // Amortization schedule generator (first 6 samples + summary)
    const schedule = [];
    let remaining = loanPrincipal;
    const monthlyRate = interestRateYearly / 100 / 12;

    for (let i = 1; i <= Math.min(tenorMonths, 12); i++) {
      let interestPart = 0;
      let principalPart = 0;

      if (scheme === 'flat') {
        interestPart = totalInterest / tenorMonths;
        principalPart = loanPrincipal / tenorMonths;
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
  }, [vehiclePrice, dpPercent, tenorMonths, interestRateYearly, scheme]);

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
              <HiCalculator className="text-blue-600" />
              Kalkulator Simulasi Cicilan Finansial
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
              Perhitungan estimasi angsuran kendaraan & pembiayaan kredit secara akurat (Flat & Anuitas).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Controls Column */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:col-span-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Parameter Pinjaman</h2>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">
                  Harga Kendaraan / OTR (IDR)
                </label>
                <input
                  type="number"
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-blue-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-zinc-300">
                  <span>Uang Muka (DP): {dpPercent}%</span>
                  <span className="text-blue-600 dark:text-blue-400">{formatRupiah(calculation.dpAmount)}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  step="5"
                  value={dpPercent}
                  onChange={(e) => setDpPercent(Number(e.target.value))}
                  className="mt-2 w-full accent-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Jangka Waktu (Tenor)</label>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {[12, 24, 36, 48, 60].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTenorMonths(t)}
                      className={`rounded-lg py-2 text-xs font-bold transition ${
                        tenorMonths === t
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                      }`}
                    >
                      {t} Bulan
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">
                  Bunga Per Tahun (% p.a.)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRateYearly}
                  onChange={(e) => setInterestRateYearly(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-blue-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Skema Bunga</label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setScheme('flat')}
                    className={`rounded-xl border py-2.5 text-xs font-bold transition ${
                      scheme === 'flat'
                        ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                        : 'border-slate-200 text-slate-600 dark:border-zinc-700 dark:text-zinc-400'
                    }`}
                  >
                    Bunga Flat
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheme('efektif')}
                    className={`rounded-xl border py-2.5 text-xs font-bold transition ${
                      scheme === 'efektif'
                        ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                        : 'border-slate-200 text-slate-600 dark:border-zinc-700 dark:text-zinc-400'
                    }`}
                  >
                    Bunga Efektif (Anuitas)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="space-y-6 lg:col-span-7">
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-lg shadow-blue-500/10">
              <span className="text-xs font-medium uppercase tracking-wider text-blue-100">Estimasi Cicilan Bulanan</span>
              <div className="mt-2 text-3xl font-extrabold sm:text-4xl">
                {formatRupiah(calculation.monthlyInstallment)}
                <span className="text-sm font-normal text-blue-200"> / bulan</span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/20 pt-4 text-xs sm:grid-cols-3">
                <div>
                  <span className="text-blue-200">Pokok Pinjaman</span>
                  <p className="mt-1 font-bold">{formatRupiah(calculation.loanPrincipal)}</p>
                </div>
                <div>
                  <span className="text-blue-200">Total Bunga</span>
                  <p className="mt-1 font-bold">{formatRupiah(calculation.totalInterest)}</p>
                </div>
                <div>
                  <span className="text-blue-200">Total Pengembalian</span>
                  <p className="mt-1 font-bold">{formatRupiah(calculation.totalPayment)}</p>
                </div>
              </div>
            </div>

            {/* Amortization Schedule Preview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between pb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Jadwal Angsuran (12 Bulan Pertama)
                </h3>
                <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-zinc-400">
                  <HiOutlineInformationCircle /> Skema {scheme === 'flat' ? 'Flat' : 'Anuitas'}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 text-slate-500 dark:border-zinc-800 dark:text-zinc-400">
                    <tr>
                      <th className="pb-2 font-semibold">Bulan</th>
                      <th className="pb-2 font-semibold">Angsuran</th>
                      <th className="pb-2 font-semibold">Pokok</th>
                      <th className="pb-2 font-semibold">Bunga</th>
                      <th className="pb-2 font-semibold">Sisa Pokok</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700 dark:divide-zinc-800 dark:text-zinc-300">
                    {calculation.schedule.map((row) => (
                      <tr key={row.month} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/40">
                        <td className="py-2.5 font-bold">#{row.month}</td>
                        <td className="py-2.5">{formatRupiah(row.installment)}</td>
                        <td className="py-2.5 text-emerald-600 dark:text-emerald-400">
                          {formatRupiah(row.principalPart)}
                        </td>
                        <td className="py-2.5 text-amber-600 dark:text-amber-400">
                          {formatRupiah(row.interestPart)}
                        </td>
                        <td className="py-2.5">{formatRupiah(row.remainingLoan)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}