"use client";

import { useState } from "react";
import Navbar from "../components/navbar";

const BmiPage = () => {
  const [formData, setFormData] = useState({
    gender: "",
    tinggi: 0,
    berat: 0,
    umur: 0,
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
      const bmi = berat / (tinggi / 100) ** 2;
      setBmiResult(parseFloat(bmi.toFixed(2)));

      if (bmi < 18.5) {
        setClassification("Kurus");
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        setClassification("Normal");
      } else if (bmi >= 25 && bmi <= 29.9) {
        setClassification("Overweight");
      } else if (bmi >= 30 && bmi <= 34.9) {
        setClassification("Obesitas Stadium I");
      } else if (bmi >= 35 && bmi <= 39.9) {
        setClassification("Obesitas Stadium II");
      } else {
        setClassification("Obesitas Stadium III");
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
    <div className="min-h-screen bg-customGreen-light text-eggplant dark:bg-gray-900 dark:text-honeyDew flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-md mt-6"
      >
        {/* <h2 className="text-2xl font-bold text-eggplant dark:text-honeyDew mb-4 text-center">
          BMI & BFP Calculator
        </h2> */}
        <Navbar title="BMI & BFP Calculator" />
        <div className="flex flex-col gap-4">
          {/* Gender */}
          <label className="text-eggplant dark:text-honeyDew">
            Gender:
            <select
              className="w-full mt-1 p-2 border rounded-lg bg-honeyDew text-eggplant focus:ring-2 focus:ring-customGreen-default"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="L">Male</option>
              <option value="P">Female</option>
            </select>
          </label>

          {/* Height */}
          <label className="text-eggplant dark:text-honeyDew">
            Height (cm):
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded-lg bg-honeyDew text-eggplant focus:ring-2 focus:ring-customGreen-default"
              value={formData.tinggi}
              onChange={(e) =>
                setFormData({ ...formData, tinggi: parseFloat(e.target.value) })
              }
            />
          </label>

          {/* Weight */}
          <label className="text-eggplant dark:text-honeyDew">
            Weight (kg):
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded-lg bg-honeyDew text-eggplant focus:ring-2 focus:ring-customGreen-default"
              value={formData.berat}
              onChange={(e) =>
                setFormData({ ...formData, berat: parseFloat(e.target.value) })
              }
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-customGreen-dark text-white font-semibold rounded-lg hover:bg-customGreen-default transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Calculating..." : "Calculate"}
          </button>
        </div>
      </form>

      {/* Results */}
      {bmiResult !== null && classification !== null && (
        <div className="mt-4 p-4 bg-customGreen-dark text-white rounded-lg text-center w-full max-w-md">
          <h2 className="text-lg font-bold">BMI Result</h2>
          <p className="text-xl">
            {bmiResult} -{" "}
            <span className="font-semibold">{classification}</span>
          </p>
        </div>
      )}

      {bfpResult !== null && (
        <div className="mt-2 p-4 bg-customGreen-default text-white rounded-lg text-center w-full max-w-md">
          <h2 className="text-lg font-bold">BFP Result</h2>
          <p className="text-xl">{bfpResult}%</p>
        </div>
      )}
    </div>
  );
};

export default BmiPage;
