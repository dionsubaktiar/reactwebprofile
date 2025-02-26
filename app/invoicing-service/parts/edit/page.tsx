"use client";

import Navbar from "@/app/components/navbar";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface Part {
  id: number;
  part_number: string | null;
  nama_barang: string;
  merk: string;
  kendaraan: string;
  harga: number;
  jasa: number;
}

const EditPartPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isLoading, setIsLoading] = useState(false);
  const [parts, setParts] = useState<Part | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPart = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://personalproject.nusantaratranssentosa.co.id/api/part/${id}`
        );

        setParts(response.data.data);
        // console.log(customer);
      } catch (error) {
        console.error("Error fetching part data:", error);
        setErrorMessage("Gagal memuat data part.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPart();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setParts((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await axios.get(
        "https://personalproject.nusantaratranssentosa.co.id/sanctum/csrf-cookie"
      );
      if (id) {
        await axios.put(
          `https://personalproject.nusantaratranssentosa.co.id/api/part/${id}`,
          parts
        );
      } else {
        await axios.post(
          "https://personalproject.nusantaratranssentosa.co.id/api/customer",
          parts
        );
      }

      setSuccessMessage(`Part berhasil ${id ? "diperbarui" : "ditambahkan"}!`);
      setTimeout(() => router.push("/invoicing-service/parts"), 1500);
    } catch (error) {
      console.error("Error saving parts data:", error);
      setErrorMessage("Terjadi kesalahan saat menyimpan data part.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-customGreen-light text-brown dark:bg-gray-900 dark:text-honeyDew">
      <div className="max-w-7xl mx-auto p-6">
        <Navbar title="Edit Data Part" />

        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {isLoading ? (
          <div className="text-center text-Black">Loading customer data...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="nama_barang"
                className="block text-sm font-medium text-gray-700 dark:text-honeyDew"
              >
                Nama Barang <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nama_barang"
                placeholder="nama barang"
                value={parts?.nama_barang}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
              />
            </div>

            <div>
              <label
                htmlFor="merk"
                className="block text-sm font-medium text-gray-700 dark:text-honeyDew"
              >
                Merk<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="merk"
                placeholder="masukkan merk"
                value={parts?.merk}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
              />
            </div>

            <div>
              <label
                htmlFor="part_number"
                className="block text-sm font-medium text-gray-700 dark:text-honeyDew"
              >
                Part Number
              </label>
              <input
                type="text"
                id="part_number"
                placeholder="masukkan part number"
                value={parts?.part_number ?? ""}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
              />
            </div>

            <div>
              <label
                htmlFor="kendaraan"
                className="block text-sm font-medium text-gray-700 dark:text-honeyDew"
              >
                Jenis Kendaraan<span className="text-red-500">*</span>
              </label>
              <select
                id="kendaraan"
                value={parts?.kendaraan}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
              >
                <option value="">Pilih tipe</option>
                <option value="Pickup">Pickup</option>
                <option value="Bus">Bus</option>
                <option value="Truck">Truck</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="harga"
                className="block text-sm font-medium text-gray-700 dark:text-honeyDew"
              >
                Harga Part<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="harga"
                //   placeholder="masukkan email atau telepon"
                value={parts?.harga}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
              />
            </div>

            <div>
              <label
                htmlFor="jasa"
                className="block text-sm font-medium text-gray-700 dark:text-honeyDew"
              >
                Biaya pasang<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="jasa"
                //   placeholder="masukkan email atau telepon"
                value={parts?.jasa}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting ? "bg-gray-400" : "bg-customGreen-default"
                } text-white px-4 py-2 rounded-lg shadow-md hover:bg-customGreen-dark transition duration-300`}
              >
                {isSubmitting ? "Submitting..." : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const SuspenseEditPartPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EditPartPage />
  </Suspense>
);

export default SuspenseEditPartPage;
