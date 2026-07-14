"use client";

import { useState } from "react";
import Navbar from "../components/navbar";

const SimulasiPage = () => {
  const [harga, setHarga] = useState<string>("");
  const [dp, setDP] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [tenor, setTenor] = useState<number>(12);
  const [monthlyDetails, setMonthlyDetails] = useState<{
    perMonthPrincipal: number;
    perMonthInterest: number;
    totalMonthlyPayment: number;
  } | null>(null);
  const [untilDate, setUntilDate] = useState<Date | null>(null);

  const formatCurrency = (value: string): string => {
    if (!value) return "";
    const number = parseInt(value.replace(/[^0-9]/g, ""), 10);
    return `Rp ${number.toLocaleString("id-ID")}`;
  };

  const parseCurrency = (value: string): number => {
    return parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  };

  const handleSubmit = () => {
    const loanAmount = parseCurrency(harga) - parseCurrency(dp);
    const interestRateNumber = parseFloat(interestRate) / 100;

    if (loanAmount <= 0) return;

    const totalInterest = loanAmount * interestRateNumber;

    const perMonthPrincipal = Math.round(loanAmount / tenor);
    const perMonthInterest = Math.round(totalInterest / tenor);
    const totalMonthlyPayment = perMonthPrincipal + perMonthInterest;

    setMonthlyDetails({
      perMonthPrincipal,
      perMonthInterest,
      totalMonthlyPayment,
    });

    const currentDate = new Date();
    const finalDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + tenor)
    );
    setUntilDate(finalDate);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 font-poppins flex flex-col items-center">
      <div className="w-full max-w-xl px-4 flex-grow py-8">
        <Navbar title="Simulasi Cicilan" />

        <div className="mt-8 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/10 shadow-sm space-y-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-4"
          >
            {/* Harga Barang */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block">
                Harga Barang (Rp)
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Rp 20.000.000"
                className="w-full p-2.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-white dark:bg-zinc-950 text-zinc-850 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm transition-all"
                value={harga}
                onChange={(e) => setHarga(formatCurrency(e.target.value))}
              />
            </div>

            {/* Down Payment */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block">
                Down Payment (DP) (Rp)
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Rp 5.000.000"
                className="w-full p-2.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-white dark:bg-zinc-950 text-zinc-850 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm transition-all"
                value={dp}
                onChange={(e) => setDP(formatCurrency(e.target.value))}
              />
            </div>

            {/* Bunga % */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block">
                Bunga Tahunan (%)
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: 5"
                className="w-full p-2.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-white dark:bg-zinc-950 text-zinc-850 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm transition-all"
                value={interestRate}
                onChange={(e) =>
                  setInterestRate(e.target.value.replace(/[^0-9.]/g, ""))
                }
              />
            </div>

            {/* Tenor */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block">
                Tenor Cicilan
              </label>
              <select
                className="w-full p-2.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-white dark:bg-zinc-950 text-zinc-850 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm transition-all"
                value={tenor}
                onChange={(e) => setTenor(Number(e.target.value))}
              >
                <option value={3}>3 Bulan</option>
                <option value={6}>6 Bulan</option>
                <option value={12}>12 Bulan (1 Tahun)</option>
                <option value={24}>24 Bulan (2 Tahun)</option>
                <option value={36}>36 Bulan (3 Tahun)</option>
                <option value={48}>48 Bulan (4 Tahun)</option>
                <option value={60}>60 Bulan (5 Tahun)</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors text-sm shadow-sm"
            >
              Hitung Simulasi Compounding
            </button>
          </form>

          {/* Results Area */}
          {monthlyDetails !== null && untilDate !== null && (
            <div className="border-t border-zinc-200 dark:border-zinc-800/80 pt-6 space-y-4">
              <h3 className="text-base font-bold font-poppins text-zinc-900 dark:text-white">
                Hasil Rincian Cicilan
              </h3>

              <div className="grid gap-3">
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Cicilan Pokok / Bulan</span>
                  <strong className="font-semibold text-zinc-850 dark:text-zinc-200">
                    {formatCurrency(monthlyDetails.perMonthPrincipal.toString())}
                  </strong>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Cicilan Bunga / Bulan</span>
                  <strong className="font-semibold text-zinc-850 dark:text-zinc-200">
                    {formatCurrency(monthlyDetails.perMonthInterest.toString())}
                  </strong>
                </div>

                <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 flex justify-between items-center text-sm">
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">Total Tagihan / Bulan</span>
                  <strong className="font-bold text-indigo-700 dark:text-indigo-400 text-base">
                    {formatCurrency(monthlyDetails.totalMonthlyPayment.toString())}
                  </strong>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Tanggal Pelunasan</span>
                  <strong className="font-semibold text-zinc-850 dark:text-zinc-200">
                    {new Date(untilDate).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulasiPage;
