"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";
import { useRouter } from "next/navigation";

// Define types
interface Kendaraan {
  id: number;
  merk_kendaraan: string;
  model_kendaraan: string;
}

interface Konsumen {
  id: number;
  nama: string;
  email: string;
}

interface FormData {
  asuransi: number;
  down_payment: number;
  tenor: number;
  id_kendaraan: number;
  id_user: number;
}

// Currency formatter function
const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

const CreatePinjamanPage = () => {
  const [formData, setFormData] = useState<FormData>({
    asuransi: 0,
    down_payment: 0,
    tenor: 0,
    id_kendaraan: 0,
    id_user: 1, // Assuming user id is 1 (this can be dynamically fetched if needed)
  });
  const [kendaraanOptions, setKendaraanOptions] = useState<Kendaraan[]>([]);
  const [konsumenOptions, setKonsumenOptions] = useState<Konsumen[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const baseUrl =
    "https://personalproject.nusantaratranssentosa.co.id/api/pinjaman";
  const kendaraanUrl =
    "https://personalproject.nusantaratranssentosa.co.id/api/kendaraan";
  const konsumenUrl =
    "https://personalproject.nusantaratranssentosa.co.id/api/konsumen";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const kendaraanResponse = await axios.get(kendaraanUrl);
        const konsumenResponse = await axios.get(konsumenUrl);
        setKendaraanOptions(kendaraanResponse.data);
        setKonsumenOptions(konsumenResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load kendaraan or konsumen data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // Remove non-numeric characters and convert to number
    if (name === "asuransi" || name === "down_payment") {
      updatedValue = value.replace(/[^\d]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue ? Number(updatedValue) : 0,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.get(
        "https://personalproject.nusantaratranssentosa.co.id/sanctum/csrf-cookie",
        { withCredentials: true }
      );
      await axios.post(baseUrl, formData, {
        withCredentials: true,
      });
      router.push("/pengajuan-kredit"); // Redirect to the pinjaman page after submission
    } catch (err) {
      console.error("Error creating pinjaman:", err);
      setError("Failed to create pinjaman.");
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
        <Navbar title="Create Pinjaman" />

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="asuransi"
              className="block text-sm font-medium text-gray-700"
            >
              Asuransi
            </label>
            <input
              type="text"
              id="asuransi"
              name="asuransi"
              value={currencyFormatter.format(formData.asuransi)}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-customGreen-light dark:bg-gray-700 dark:text-honeyDew dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label
              htmlFor="down_payment"
              className="block text-sm font-medium text-gray-700"
            >
              Down Payment
            </label>
            <input
              type="text"
              id="down_payment"
              name="down_payment"
              value={currencyFormatter.format(formData.down_payment)}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-customGreen-light dark:bg-gray-700 dark:text-honeyDew dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label
              htmlFor="tenor"
              className="block text-sm font-medium text-gray-700"
            >
              Tenor (Months)
            </label>
            <input
              type="number"
              id="tenor"
              name="tenor"
              value={formData.tenor}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-customGreen-light dark:bg-gray-700 dark:text-honeyDew dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label
              htmlFor="id_kendaraan"
              className="block text-sm font-medium text-gray-700"
            >
              Kendaraan
            </label>
            <select
              id="id_kendaraan"
              name="id_kendaraan"
              value={formData.id_kendaraan}
              onChange={handleSelectChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-customGreen-light dark:bg-gray-700 dark:text-honeyDew dark:border-gray-600"
              required
            >
              <option value="">Select a Kendaraan</option>
              {kendaraanOptions.map((kendaraan) => (
                <option key={kendaraan.id} value={kendaraan.id}>
                  {kendaraan.merk_kendaraan} {kendaraan.model_kendaraan}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="id_user"
              className="block text-sm font-medium text-gray-700"
            >
              Konsumen
            </label>
            <select
              id="id_user"
              name="id_user"
              value={formData.id_user}
              onChange={handleSelectChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-customGreen-light dark:bg-gray-700 dark:text-honeyDew dark:border-gray-600"
              required
            >
              <option value="">Select a Konsumen</option>
              {konsumenOptions.map((konsumen) => (
                <option key={konsumen.id} value={konsumen.id}>
                  {konsumen.nama} - {konsumen.email}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-customGreen-dark text-white rounded hover:bg-customGreen-default transition dark:bg-customGreen-light dark:text-gray-800"
            >
              Create Pinjaman
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePinjamanPage;
