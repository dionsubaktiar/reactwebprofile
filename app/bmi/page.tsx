'use client';

import { useState } from 'react';
import SubPageHeader from "@/app/components/SubPageHeader";
import { calculateBfpBoer, classifyBmi } from '@/app/lib/calculators';
import { FiActivity, FiUser, FiInfo, FiCheckCircle } from 'react-icons/fi';

const BmiPage = () => {
  const [formData, setFormData] = useState<{
    gender: 'L' | 'P';
    tinggi: number;
    berat: number;
  }>({
    gender: 'L',
    tinggi: 172,
    berat: 68,
  });
  const [bfpResult, setBfpResult] = useState<number | null>(17.2);
  const [bmiResult, setBmiResult] = useState<number | null>(22.99);
  const [classification, setClassification] = useState<string | null>('Normal Weight (Ideal)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { gender, tinggi, berat } = formData;
    if (tinggi <= 0 || berat <= 0) return;

    const bmi = berat / (tinggi / 100) ** 2;
    setBmiResult(parseFloat(bmi.toFixed(2)));
    setClassification(classifyBmi(bmi));
    setBfpResult(calculateBfpBoer(gender, tinggi, berat));
  };

  const markerPercent =
    bmiResult !== null
      ? Math.min(100, Math.max(0, ((bmiResult - 15) / 25) * 100))
      : 0;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <SubPageHeader title="BMI & BFP Health Calculator" />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            <FiActivity /> Developer Sandbox &bull; Responsive Health Analytics
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Kalkulator Komposisi Tubuh (BMI &amp; BFP)
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Kalkulasi Body Mass Index (BMI) dan Body Fat Percentage (Metode Boer 1984) secara real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Input Form */}
          <div className="lg:col-span-5 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm space-y-6">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <FiUser className="text-indigo-500" /> Parameter Biometrik
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <span className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">Jenis Kelamin</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: 'L' })}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-colors ${
                      formData.gender === 'L'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    Laki-Laki (Pria)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: 'P' })}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-colors ${
                      formData.gender === 'P'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    Perempuan (Wanita)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="bmi-tinggi" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Tinggi Badan (cm)</label>
                  <input
                    id="bmi-tinggi"
                    type="number"
                    required
                    min="50"
                    max="250"
                    value={formData.tinggi || ''}
                    onChange={(e) => setFormData({ ...formData, tinggi: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="bmi-berat" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Berat Badan (kg)</label>
                  <input
                    id="bmi-berat"
                    type="number"
                    required
                    min="10"
                    max="300"
                    value={formData.berat || ''}
                    onChange={(e) => setFormData({ ...formData, berat: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-sm"
              >
                Hitung Ulang Indeks
              </button>
            </form>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm space-y-6">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <span>Hasil Analisis Komposisi Tubuh</span>
                <span className="text-xs font-normal text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <FiCheckCircle /> Formula Boer 1984
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200/80 dark:border-zinc-800">
                  <span className="text-xs font-semibold text-zinc-500">Body Mass Index (BMI)</span>
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-2 font-mono tabular-nums">
                    {bmiResult ?? '--'}
                  </div>
                  <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-1">
                    {classification ?? 'Belum ada data'}
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200/80 dark:border-zinc-800">
                  <span className="text-xs font-semibold text-zinc-500">Body Fat Percentage (BFP)</span>
                  <div className="text-3xl font-bold text-sky-600 dark:text-sky-400 mt-2 font-mono tabular-nums">
                    {bfpResult !== null ? `${bfpResult}%` : '--'}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">Formula Boer 1984</div>
                </div>
              </div>

              {/* Range Scale Indicator */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-zinc-500 tabular-nums">
                  <span>Kurus (&lt;18.5)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Ideal (18.5 - 24.9)</span>
                  <span>Gemuk (25 - 29.9)</span>
                  <span>Obesitas (&ge;30)</span>
                </div>
                <div className="relative w-full h-3">
                  <div className="flex h-3 w-full overflow-hidden rounded-full">
                    <div className="w-[14%] bg-sky-400" />
                    <div className="w-[26%] bg-emerald-500" />
                    <div className="w-[20%] bg-amber-400" />
                    <div className="w-[40%] bg-rose-500" />
                  </div>
                  {bmiResult !== null && (
                    <div
                      aria-label={`Posisi BMI ${bmiResult}`}
                      style={{ left: `${markerPercent}%` }}
                      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-white bg-zinc-900 shadow dark:border-zinc-900 dark:bg-white"
                    />
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/50 dark:border-indigo-900/50 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed flex items-start gap-2.5">
                <FiInfo className="text-indigo-500 mt-0.5 shrink-0" />
                <span>
                  Hasil perhitungan ini dihitung secara real-time di sisi peramban klien tanpa melakukan transmisi data pribadi ke server eksternal.
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BmiPage;
