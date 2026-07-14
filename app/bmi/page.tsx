"use client";

import { useState } from "react";
import Navbar from "../components/navbar";

const BmiPage = () => {
  const [formData, setFormData] = useState({
    gender: "",
    tinggi: 170,
    berat: 65,
    umur: 24,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bfpResult, setBfpResult] = useState<number | null>(null);
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [classification, setClassification] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { gender, tinggi, berat } = formData;
      if (!gender || tinggi <= 0 || berat <= 0) return;

      const bmi = berat / (tinggi / 100) ** 2;
      setBmiResult(parseFloat(bmi.toFixed(2)));

      if (bmi < 18.5) {
        setClassification("Underweight (Kurus)");
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        setClassification("Normal Weight (Ideal)");
      } else if (bmi >= 25 && bmi <= 29.9) {
        setClassification("Overweight (Kelebihan Berat)");
      } else if (bmi >= 30 && bmi <= 34.9) {
        setClassification("Obese Class I (Obesitas Stadium I)");
      } else if (bmi >= 35 && bmi <= 39.9) {
        setClassification("Obese Class II (Obesitas Stadium II)");
      } else {
        setClassification("Obese Class III (Obesitas Stadium III)");
      }

      let lbm: number;
      if (gender === "L") {
        lbm = 0.407 * berat + 0.267 * tinggi - 19.2; // Boer for men
      } else if (gender === "P") {
        lbm = 0.252 * berat + 0.473 * tinggi - 48.3; // Boer for women
      } else {
        throw new Error("Invalid gender selected");
      }

      const bfp = ((berat - lbm) / berat) * 100;
      setBfpResult(parseFloat(bfp.toFixed(2)));
    } catch (error) {
      console.error("Error calculating BFP:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 font-poppins flex flex-col items-center">
      <div className="w-full max-w-lg px-4 flex-grow py-8">
        <Navbar title="BMI & BFP Calculator" />

        <div className="mt-8 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/10 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Gender */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Gender
              </label>
              <select
                required
                className="w-full p-2.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm transition-all"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <option value="">Select Gender</option>
                <option value="L">Male</option>
                <option value="P">Female</option>
              </select>
            </div>

            {/* Height */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Height (cm)
              </label>
              <input
                type="number"
                required
                min="50"
                max="250"
                className="w-full p-2.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-white dark:bg-zinc-950 text-zinc-850 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm transition-all"
                value={formData.tinggi || ""}
                onChange={(e) =>
                  setFormData({ ...formData, tinggi: parseFloat(e.target.value) || 0 })
                }
              />
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Weight (kg)
              </label>
              <input
                type="number"
                required
                min="10"
                max="300"
                className="w-full p-2.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-white dark:bg-zinc-950 text-zinc-850 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm transition-all"
                value={formData.berat || ""}
                onChange={(e) =>
                  setFormData({ ...formData, berat: parseFloat(e.target.value) || 0 })
                }
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors text-sm shadow-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Calculating..." : "Calculate Body Metrics"}
            </button>
          </form>

          {/* Results Display */}
          {(bmiResult !== null || bfpResult !== null) && (
            <div className="border-t border-zinc-200 dark:border-zinc-800/80 pt-6 space-y-4">
              <h3 className="text-base font-bold font-poppins text-zinc-900 dark:text-white">
                Calculation Results
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {bmiResult !== null && (
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
                      Body Mass Index
                    </span>
                    <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      {bmiResult}
                    </p>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 block font-light">
                      {classification}
                    </span>
                  </div>
                )}

                {bfpResult !== null && (
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
                      Body Fat Percentage
                    </span>
                    <p className="text-lg font-bold text-teal-600 dark:text-teal-400">
                      {bfpResult}%
                    </p>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 block font-light">
                      Boer formula estimate
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BmiPage;
