"use client";

import Navbar from "@/app/components/navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePartsPage = () => {
  const [parts, setParts] = useState({
    part_number: "",
    nama_barang: "",
    merk: "",
    kendaraan: "",
    harga: 0,
    jasa: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.get(
        "https://personalproject.nusantaratranssentosa.co.id/sanctum/csrf-cookie"
      );
      await axios.post(
        "https://personalproject.nusantaratranssentosa.co.id/api/part",
        parts
      );
      setSuccessMessage("Part created successfully!");
      router.push("invoicing-service/parts");
    } catch (error) {
      setErrorMessage("Error creating part");
      console.error("Error creating part:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setParts((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-customGreen-light text-brown dark:bg-gray-900 dark:text-honeyDew">
      <div className="max-w-7xl mx-auto p-6">
        <Navbar title="Create Data Part" />

        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

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
              value={parts.nama_barang}
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
              value={parts.merk}
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
              value={parts.part_number}
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
              value={parts.kendaraan}
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
              value={parts.harga}
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
              value={parts.jasa}
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
              {isSubmitting ? "Submitting..." : "Create Parts"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePartsPage;
