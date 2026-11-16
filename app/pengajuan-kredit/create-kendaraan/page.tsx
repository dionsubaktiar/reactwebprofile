"use client";

import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";
import { useRouter } from "next/navigation";

interface FormData {
  merk_kendaraan: string;
  model_kendaraan: string;
  warna_kendaraan: string;
  harga_kendaraan: number;
  dealer: string;
}

// Currency formatter function
const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

const CreateKendaraanPage = () => {
  const [formData, setFormData] = useState<FormData>({
    merk_kendaraan: "",
    model_kendaraan: "",
    warna_kendaraan: "",
    harga_kendaraan: 0,
    dealer: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const baseUrl =
    "https://personalproject.nusantaratranssentosa.co.id/api/kendaraan";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "harga_kendaraan" ? value.replace(/[^\d]/g, "") : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formattedData = {
        ...formData,
        harga_kendaraan: Number(formData.harga_kendaraan), // Convert to number here
      };
      await axios.post(baseUrl, formattedData, {
        withCredentials: true,
      });
      router.push("/pengajuan-kredit");
    } catch (err) {
      console.error("Error creating kendaraan:", err);
      setError("Failed to create kendaraan.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-honeyDew text-customGreen-dark dark:bg-gray-800 dark:text-honeyDew">
        <div className="loader"></div>
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-honeyDew text-customGreen-dark dark:bg-gray-900 dark:text-honeyDew">
      <div className="max-w-4xl mx-auto p-6">
        <Navbar title="Create Kendaraan" />

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="dealer"
              className="block text-sm font-medium text-gray-700"
            >
              Dealer
            </label>
            <input
              type="text"
              id="dealer"
              name="dealer"
              value={formData.dealer}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-customGreen-light dark:bg-gray-700 dark:text-honeyDew dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label
              htmlFor="merk_kendaraan"
              className="block text-sm font-medium text-gray-700"
            >
              Merk Kendaraan
            </label>
            <input
              type="text"
              id="merk_kendaraan"
              name="merk_kendaraan"
              value={formData.merk_kendaraan}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-customGreen-light dark:bg-gray-700 dark:text-honeyDew dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label
              htmlFor="model_kendaraan"
              className="block text-sm font-medium text-gray-700"
            >
              Model Kendaraan
            </label>
            <input
              type="text"
              id="model_kendaraan"
              name="model_kendaraan"
              value={formData.model_kendaraan}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-customGreen-light dark:bg-gray-700 dark:text-honeyDew dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label
              htmlFor="warna_kendaraan"
              className="block text-sm font-medium text-gray-700"
            >
              Warna Kendaraan
            </label>
            <input
              type="text"
              id="warna_kendaraan"
              name="warna_kendaraan"
              value={formData.warna_kendaraan}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-customGreen-light dark:bg-gray-700 dark:text-honeyDew dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label
              htmlFor="harga_kendaraan"
              className="block text-sm font-medium text-gray-700"
            >
              Harga Kendaraan
            </label>
            <input
              type="text"
              id="harga_kendaraan"
              name="harga_kendaraan"
              value={currencyFormatter.format(formData.harga_kendaraan)}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-customGreen-light dark:bg-gray-700 dark:text-honeyDew dark:border-gray-600"
              required
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-customGreen-dark text-white rounded hover:bg-customGreen-default transition dark:bg-customGreen-light dark:text-gray-800"
            >
              Create Kendaraan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateKendaraanPage;
