"use client";

import { useState } from "react";
import axios from "axios";
import Navbar from "../../../components/navbar";
import { useRouter } from "next/navigation";

const CreateCustomerPage = () => {
  const [nama_perusahaan, setNamaPerusahaan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [pic, setPic] = useState("");
  const [kontak, setKontak] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newCustomer = {
      nama_perusahaan,
      alamat,
      pic,
      kontak,
    };

    try {
      await axios.get(
        "https://personalproject.nusantaratranssentosa.co.id/sanctum/csrf-cookie"
      );
      await axios.post(
        "https://personalproject.nusantaratranssentosa.co.id/api/customer",
        newCustomer
      );
      router.push("invoicing-service/customers"); // Redirect after successful creation
    } catch (error) {
      console.error("Error creating customer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-customGreen-light text-brown dark:bg-gray-900 dark:text-honeyDew">
      <div className="max-w-7xl mx-auto p-6">
        <Navbar title="Create Data Customer" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nama_perusahaan"
              className="block text-sm font-medium text-gray-700 dark:text-honeyDew"
            >
              Nama Perusahaan
            </label>
            <input
              type="text"
              id="nama_perusahaan"
              placeholder="nama perusahaan"
              value={nama_perusahaan}
              onChange={(e) => setNamaPerusahaan(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
            />
          </div>

          <div>
            <label
              htmlFor="alamat"
              className="block text-sm font-medium text-gray-700 dark:text-honeyDew"
            >
              Alamat
            </label>
            <input
              type="text"
              id="alamat"
              placeholder="masukkan alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
            />
          </div>

          <div>
            <label
              htmlFor="pic"
              className="block text-sm font-medium text-gray-700 dark:text-honeyDew"
            >
              PIC
            </label>
            <input
              type="text"
              id="pic"
              placeholder="masukkan nama pic"
              value={pic}
              onChange={(e) => setPic(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
            />
          </div>

          <div>
            <label
              htmlFor="kontak"
              className="block text-sm font-medium text-gray-700 dark:text-honeyDew"
            >
              Kontak
            </label>
            <input
              type="text"
              id="kontak"
              placeholder="masukkan email atau telepon"
              value={kontak}
              onChange={(e) => setKontak(e.target.value)}
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
              {isSubmitting ? "Submitting..." : "Create Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomerPage;
