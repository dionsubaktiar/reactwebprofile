"use client";

import { useState } from "react";
import Navbar from "../components/navbar";

const SimulasiPage = () => {
  const [harga, setHarga] = useState<string>(""); // Total price
  const [dp, setDP] = useState<string>(""); // Down payment
  const [interestRate, setInterestRate] = useState<string>(""); // Interest rate (in %)
  const [tenor, setTenor] = useState<number>(12); // Loan term (months)
  const [monthlyDetails, setMonthlyDetails] = useState<{
    perMonthPrincipal: number;
    perMonthInterest: number;
    totalMonthlyPayment: number;
  } | null>(null);
  const [untilDate, setUntilDate] = useState<Date | null>(null);

  // Helper function to format numbers as currency
  const formatCurrency = (value: string): string => {
    if (!value) return "";
    const number = parseInt(value.replace(/[^0-9]/g, ""), 10);
    return `Rp ${number.toLocaleString("id-ID")}`;
  };

  // Helper function to parse currency back to a number
  const parseCurrency = (value: string): number => {
    return parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  };

  const handleSubmit = () => {
    const loanAmount = parseCurrency(harga) - parseCurrency(dp); // Loan amount after down payment
    const interestRateNumber = parseFloat(interestRate) / 100; // Convert percentage to decimal

    const totalInterest = loanAmount * interestRateNumber; // Total interest for the loan

    // Use rounding to prevent weird numbers
    const perMonthPrincipal = Math.round(loanAmount / tenor); // Principal paid per month
    const perMonthInterest = Math.round(totalInterest / tenor); // Interest paid per month
    const totalMonthlyPayment = perMonthPrincipal + perMonthInterest; // Total monthly payment

    setMonthlyDetails({
      perMonthPrincipal,
      perMonthInterest,
      totalMonthlyPayment,
    });

    // Calculate the "Until Date"
    const currentDate = new Date();
    const finalDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + tenor)
    );
    setUntilDate(finalDate);
  };

  return (
    <div className="min-h-screen bg-honeyDew text-customGreen-dark dark:bg-gray-900 dark:text-honeyDew">
      <Navbar title="Simulasi Kredit" />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded dark:bg-gray-800 dark:shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-customGreen-default dark:text-customGreen-light">
          Simulasi Kredit
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              Harga Barang (Rp)
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={harga}
              onChange={(e) => setHarga(formatCurrency(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Down Payment (DP) (Rp)
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={dp}
              onChange={(e) => setDP(formatCurrency(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Bunga (%) (Interest Rate)
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={interestRate}
              onChange={(e) =>
                setInterestRate(e.target.value.replace(/[^0-9.]/g, ""))
              } // Allow only numbers and decimals
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tenor</label>
            <select
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={tenor}
              onChange={(e) => setTenor(Number(e.target.value))}
            >
              <option value={1}>1 bulan</option>
              <option value={3}>3 bulan</option>
              <option value={6}>6 bulan</option>
              <option value={12}>1 tahun</option>
              <option value={24}>2 tahun</option>
              <option value={36}>3 tahun</option>
              <option value={48}>4 tahun</option>
              <option value={60}>5 tahun</option>
              <option value={72}>6 tahun</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-customGreen-dark text-white rounded hover:bg-customGreen-default transition dark:bg-customGreen-light dark:text-gray-800"
          >
            Hitung
          </button>
        </form>

        {monthlyDetails !== null && untilDate !== null && (
          <div className="mt-6 p-4 bg-customGreen-light text-gray-800 rounded dark:bg-gray-700 dark:text-white">
            <h2 className="text-xl font-bold">Hasil Simulasi:</h2>
            <p className="mt-2">
              Cicilan Pokok Per Bulan:{" "}
              <strong>
                {formatCurrency(monthlyDetails.perMonthPrincipal.toString())}
              </strong>
            </p>
            <p>
              Cicilan Bunga Per Bulan:{" "}
              <strong>
                {formatCurrency(monthlyDetails.perMonthInterest.toString())}
              </strong>
            </p>
            <p>
              Total Cicilan Per Bulan:{" "}
              <strong>
                {formatCurrency(monthlyDetails.totalMonthlyPayment.toString())}
              </strong>
            </p>
            <p>
              Tanggal Selesai:{" "}
              <strong>
                {new Date(untilDate).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulasiPage;
