"use client";

import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import Navbar from "../../../components/navbar";
import { useRouter, useSearchParams } from "next/navigation";

interface Customer {
  id?: number;
  nama_perusahaan: string;
  alamat: string;
  pic: string;
  kontak: string;
}

const CustomerFormPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [customer, setCustomer] = useState<Customer>({
    nama_perusahaan: "",
    alamat: "",
    pic: "",
    kontak: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCustomer = async () => {
      try {
        const response = await axios.get(
          `https://personalproject.nusantaratranssentosa.co.id/api/customer/${id}`
        );
        // const fetchedData = response.data;

        setCustomer(response.data.data);
        console.log(customer);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setErrorMessage("Gagal memuat data pelanggan.");
        // console.log(customer);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      if (id) {
        await axios.get(
          "https://personalproject.nusantaratranssentosa.co.id/sanctum/csrf-cookie"
        );
        await axios.put(
          `https://personalproject.nusantaratranssentosa.co.id/api/customer/${id}`,
          customer
        );
      } else {
        await axios.post(
          "https://personalproject.nusantaratranssentosa.co.id/api/customer",
          customer
        );
      }

      setSuccessMessage(
        `Pelanggan berhasil ${id ? "diperbarui" : "ditambahkan"}!`
      );
      setTimeout(() => router.push("/invoicing-service/customers"), 1500);
    } catch (error) {
      console.error("Error saving customer data:", error);
      setErrorMessage("Terjadi kesalahan saat menyimpan data pelanggan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="text-center text-honeyDew">Loading customer data...</div>

      <div className="min-h-screen bg-customGreen-light text-brown dark:bg-gray-900 dark:text-honeyDew">
        <div className="max-w-7xl mx-auto p-6">
          <Navbar title={id ? "Edit Customer" : "Create Customer"} />

          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 rounded-lg shadow-md dark:bg-gray-800"
          >
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}

            <div>
              <label
                htmlFor="nama_perusahaan"
                className="block text-sm font-medium dark:text-honeyDew"
              >
                Nama Perusahaan
              </label>
              <input
                type="text"
                id="nama_perusahaan"
                name="nama_perusahaan"
                value={customer.nama_perusahaan}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-700 dark:text-honeyDew"
              />
            </div>

            <div>
              <label
                htmlFor="alamat"
                className="block text-sm font-medium dark:text-honeyDew"
              >
                Alamat
              </label>
              <input
                type="text"
                id="alamat"
                name="alamat"
                value={customer.alamat}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-700 dark:text-honeyDew"
              />
            </div>

            <div>
              <label
                htmlFor="pic"
                className="block text-sm font-medium dark:text-honeyDew"
              >
                PIC
              </label>
              <input
                type="text"
                id="pic"
                name="pic"
                value={customer.pic}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-700 dark:text-honeyDew"
              />
            </div>

            <div>
              <label
                htmlFor="kontak"
                className="block text-sm font-medium dark:text-honeyDew"
              >
                Kontak
              </label>
              <input
                type="text"
                id="kontak"
                name="kontak"
                value={customer.kontak}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-700 dark:text-honeyDew"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-lg shadow-md transition duration-300 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-customGreen-default hover:bg-customGreen-dark"
                } text-white`}
              >
                {isSubmitting
                  ? "Submitting..."
                  : id
                  ? "Update Customer"
                  : "Create Customer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const SuspenseCustomerFormPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CustomerFormPage />
  </Suspense>
);

export default SuspenseCustomerFormPage;
