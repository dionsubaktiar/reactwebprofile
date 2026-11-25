'use client';

import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import { calculateInstallment } from '@/app/lib/calculators';
import { formatIDR } from '@/app/lib/format';
import { FiSliders, FiInfo } from 'react-icons/fi';

export default function SimulasiCicilanPage() {
  const [vehiclePrice, setVehiclePrice] = useState<number>(250000000);
  const [dpPercent, setDpPercent] = useState<number>(20);
  const [tenorMonths, setTenorMonths] = useState<number>(36);
  const [interestRateYearly, setInterestRateYearly] = useState<number>(8.5);
  const [scheme, setScheme] = useState<'flat' | 'efektif'>('flat');

  const calculation = useMemo(
    () =>
      calculateInstallment({
        vehiclePrice,
        dpPercent,
        tenorMonths,
        interestRateYearly,
        scheme,
      }),
    [vehiclePrice, dpPercent, tenorMonths, interestRateYearly, scheme],
  );

  const formatRupiah = formatIDR;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
              <FiSliders className="text-indigo-600 dark:text-indigo-400" />
              Kalkulator Simulasi Cicilan Finansial
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Perhitungan estimasi angsuran kendaraan &amp; pembiayaan kredit secara akurat (Flat &amp; Anuitas).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Controls Column */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:col-span-5">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-white">Parameter Pinjaman</h2>

            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="sim-vehicle-price" className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                  Harga Kendaraan / OTR (IDR)
                </label>
                <input
                  id="sim-vehicle-price"
                  type="number"
                  min={0}
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(Math.max(0, Number(e.target.value) || 0))}
                  className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm font-semibold tabular-nums text-zinc-900 focus:border-indigo-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                  <label htmlFor="sim-dp-percent">Uang Muka (DP): {dpPercent}%</label>
                  <span className="text-indigo-600 dark:text-indigo-400 tabular-nums">{formatRupiah(calculation.dpAmount)}</span>
                </div>
                <input
                  id="sim-dp-percent"
                  type="range"
                  min="10"
                  max="80"
                  step="5"
                  value={dpPercent}
                  onChange={(e) => setDpPercent(Number(e.target.value))}
                  className="mt-2 w-full accent-indigo-600"
                />
              </div>

              <div>
                <span className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300">Jangka Waktu (Tenor)</span>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {[12, 24, 36, 48, 60].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTenorMonths(t)}
                      className={`rounded-lg py-2 text-xs font-semibold transition-colors tabular-nums ${
                        tenorMonths === t
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'border border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                      }`}
                    >
                      {t} Bulan
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="sim-interest-rate" className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                  Bunga Per Tahun (% p.a.)
                </label>
                <input
                  id="sim-interest-rate"
                  type="number"
                  min={0}
                  max={100}
                  step="0.1"
                  value={interestRateYearly}
                  onChange={(e) => setInterestRateYearly(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                  className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm font-semibold tabular-nums text-zinc-900 focus:border-indigo-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <span className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300">Skema Bunga</span>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setScheme('flat')}
                    className={`rounded-xl border py-2.5 text-xs font-semibold transition-colors ${
                      scheme === 'flat'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400'
                        : 'border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400'
                    }`}
                  >
                    Bunga Flat
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheme('efektif')}
                    className={`rounded-xl border py-2.5 text-xs font-semibold transition-colors ${
                      scheme === 'efektif'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400'
                        : 'border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400'
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
            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-600 p-6 text-white shadow-sm">
              <span className="text-xs font-medium text-indigo-100">Estimasi Cicilan Bulanan</span>
              <div className="mt-2 text-3xl font-bold tabular-nums sm:text-4xl">
                {formatRupiah(calculation.monthlyInstallment)}
                <span className="text-sm font-normal text-indigo-200"> / bulan</span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/20 pt-4 text-xs sm:grid-cols-3">
                <div>
                  <span className="text-indigo-200">Pokok Pinjaman</span>
                  <p className="mt-1 font-semibold tabular-nums">{formatRupiah(calculation.loanPrincipal)}</p>
                </div>
                <div>
                  <span className="text-indigo-200">Total Bunga</span>
                  <p className="mt-1 font-semibold tabular-nums">{formatRupiah(calculation.totalInterest)}</p>
                </div>
                <div>
                  <span className="text-indigo-200">Total Pengembalian</span>
                  <p className="mt-1 font-semibold tabular-nums">{formatRupiah(calculation.totalPayment)}</p>
                </div>
              </div>
            </div>

            {/* Amortization Schedule Preview */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between pb-4">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Jadwal Angsuran (12 Bulan Pertama)
                </h3>
                <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                  <FiInfo /> Skema {scheme === 'flat' ? 'Flat' : 'Anuitas'}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs tabular-nums">
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