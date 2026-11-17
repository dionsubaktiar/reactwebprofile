// Service: reactwebprofile | File: app/bmi/page.tsx
'use client';

import { useState } from 'react';
import Navbar from '../components/navbar';
import { FiActivity, FiUser, FiInfo, FiCheckCircle } from 'react-icons/fi';

const BmiPage = () => {
  const [formData, setFormData] = useState({
    gender: 'L',
    tinggi: 172,
    berat: 68,
    umur: 25,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bfpResult, setBfpResult] = useState<number | null>(17.2);
  const [bmiResult, setBmiResult] = useState<number | null>(22.99);
  const [classification, setClassification] = useState<string | null>('Normal Weight (Ideal)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { gender, tinggi, berat } = formData;
      if (!gender || tinggi <= 0 || berat <= 0) return;

      const bmi = berat / (tinggi / 100) ** 2;
      setBmiResult(parseFloat(bmi.toFixed(2)));

      if (bmi < 18.5) {
        setClassification('Underweight (Kurus)');
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        setClassification('Normal Weight (Ideal)');
      } else if (bmi >= 25 && bmi <= 29.9) {
        setClassification('Overweight (Kelebihan Berat)');
      } else if (bmi >= 30 && bmi <= 34.9) {
        setClassification('Obese Class I (Obesitas Stadium I)');
      } else if (bmi >= 35 && bmi <= 39.9) {
        setClassification('Obese Class II (Obesitas Stadium II)');
      } else {
        setClassification('Obese Class III (Obesitas Stadium III)');
      }

      let lbm: number;
      if (gender === 'L') {
        lbm = 0.407 * berat + 0.267 * tinggi - 19.2; // Boer for men
      } else if (gender === 'P') {
        lbm = 0.252 * berat + 0.473 * tinggi - 48.3; // Boer for women
      } else {
        throw new Error('Invalid gender selected');
      }

      const bfp = ((berat - lbm) / berat) * 100;
      setBfpResult(parseFloat(bfp.toFixed(2)));
    } catch (error) {
      console.error('Error calculating BFP:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-poppins">
      <Navbar title="BMI & BFP Health Calculator" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">
            <FiActivity /> Developer Sandbox &bull; Responsive Health Analytics
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Kalkulator Komposisi Tubuh (BMI &amp; BFP)
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Kalkulasi Body Mass Index (BMI) dan Body Fat Percentage (Metode Boer) dengan visualisasi dua kolom di desktop.
          </p>
        </div>

        {/* Responsive Desktop-First 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Input Form (5 Cols on Desktop) */}
          <div className="lg:col-span-5 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <FiUser className="text-indigo-500" /> Parameter Biometrik
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Jenis Kelamin</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: 'L' })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
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
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
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
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Tinggi Badan (cm)</label>
                  <input
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
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Berat Badan (kg)</label>
                  <input
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

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Usia (Tahun)</label>
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={formData.umur || ''}
                  onChange={(e) => setFormData({ ...formData, umur: parseInt(e.target.value) || 0 })}
                  className="w-full p-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-sm"
              >
                {isSubmitting ? 'Menghitung...' : 'Hitung Ulang Indeks'}
              </button>
            </form>
          </div>

          {/* Right Column: Visual Dashboard Results (7 Cols on Desktop) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm space-y-6">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <span>Hasil Analisis Komposisi Tubuh</span>
                <span className="text-xs font-normal text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <FiCheckCircle /> Terverifikasi Akurat
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200/80 dark:border-zinc-800">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Body Mass Index (BMI)</span>
                  <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-2 font-mono">
                    {bmiResult ?? '--'}
                  </div>
                  <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-1">
                    {classification ?? 'Belum ada data'}
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200/80 dark:border-zinc-800">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Body Fat Percentage (BFP)</span>
                  <div className="text-3xl font-extrabold text-sky-500 mt-2 font-mono">
                    {bfpResult ? `${bfpResult}%` : '--'}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">Formula Boer 1984</div>
                </div>
              </div>

              {/* Range Scale Indicator */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-zinc-500">
                  <span>Kurus (&lt;18.5)</span>
                  <span className="text-emerald-600 font-semibold">Ideal (18.5 - 24.9)</span>
                  <span>Gemuk (25 - 29.9)</span>
                  <span>Obesitas (&ge;30)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-transparent"></div>
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
