"use client";

import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../../components/navbar";

interface Unit {
  id: number;
  nopol: string;
  tipe: string;
  no_rangka: string;
  no_mesin: string;
  driver: string;
  tahun: string;
  japo_kir: string;
  japo_pajak: string;
  japo_stnk: string;
  japo_kontrak: string;
  status: boolean;
  id_customer: number;
  customers: Customer;
}

interface Customer {
  id: number;
  nama_perusahaan: string;
  alamat: string;
  pic: string;
  kontak: string;
  created_at: string;
  updated_at: string;
}

const UnitEditPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [formData, setFormData] = useState<Unit | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://personalproject.nusantaratranssentosa.co.id/api/customer")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);
  useEffect(() => {
    axios
      .get(`https://personalproject.nusantaratranssentosa.co.id/api/unit/${id}`)
      .then((response) => setFormData(response.data.data))
      .catch((error) => console.error("Error fetching unit data:", error));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, type, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) =>
      prev
        ? {
            ...prev,
            [id]:
              type === "checkbox"
                ? checked
                : id === "id_customer"
                ? Number(value)
                : value,
          }
        : null
    );
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
      await axios.put(
        `https://personalproject.nusantaratranssentosa.co.id/api/unit/${id}`,
        formData
      );
      setSuccessMessage("Unit updated successfully!");
      router.push("/invoicing-service/units");
    } catch (error) {
      setErrorMessage("Error updating unit");
      console.error("Error updating unit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData)
    return (
      <div className="flex items-center justify-center bg-customGreen-light dark:bg-gray-900 h-full min-h-screen">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-customGreen-light text-brown dark:bg-gray-900 dark:text-honeyDew">
      <div className="max-w-7xl mx-auto p-6">
        <Navbar title="Edit Data Unit" />

        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label
              htmlFor="id_customer"
              className="block text-sm font-medium dark:text-honeyDew"
            >
              Customer<span className="text-red-500">*</span>
            </label>
            <select
              id="id_customer"
              value={formData.id_customer}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
            >
              <option value={formData.id_customer}>
                {formData.customers?.nama_perusahaan || "Pilih Customer"}
              </option>

              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.nama_perusahaan}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="nopol"
              className="block text-sm font-medium dark:text-honeyDew"
            >
              Nomor Polisi<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nopol"
              value={formData.nopol}
              onChange={handleChange}
              placeholder="A 1234 BCD"
              required
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
            />
          </div>

          <div>
            <label
              htmlFor="tipe"
              className="block text-sm font-medium dark:text-honeyDew"
            >
              Tipe<span className="text-red-500">*</span>
            </label>
            <select
              id="tipe"
              value={formData.tipe}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
            >
              <option value={formData.tipe}>{formData.tipe}</option>
              <option value="Pickup">Pickup</option>
              <option value="Bus">Bus</option>
              <option value="Truck">Truck</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="no_rangka"
              className="block text-sm font-medium dark:text-honeyDew"
            >
              No Rangka<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="no_rangka"
              value={formData.no_rangka}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
            />
          </div>

          <div>
            <label
              htmlFor="no_mesin"
              className="block text-sm font-medium dark:text-honeyDew"
            >
              No Mesin<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="no_mesin"
              value={formData.no_mesin}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
            />
          </div>

          <div>
            <label
              htmlFor="driver"
              className="block text-sm font-medium dark:text-honeyDew"
            >
              Driver<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="driver"
              value={formData.driver}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
            />
          </div>

          <div>
            <label
              htmlFor="tahun"
              className="block text-sm font-medium dark:text-honeyDew"
            >
              Tahun<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="tahun"
              value={formData.tahun}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="japo_kir"
                className="block text-sm font-medium dark:text-honeyDew"
              >
                Jatuh tempo KIR<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="japo_kir"
                value={formData.japo_kir}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
              />
            </div>

            <div>
              <label
                htmlFor="japo_pajak"
                className="block text-sm font-medium dark:text-honeyDew"
              >
                Jatuh tempo Pajak<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="japo_pajak"
                value={formData.japo_pajak}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
              />
            </div>
            <div>
              <label
                htmlFor="japo_stnk"
                className="block text-sm font-medium dark:text-honeyDew"
              >
                Jatuh tempo STNK<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="japo_stnk"
                value={formData.japo_stnk}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
              />
            </div>

            <div>
              <label
                htmlFor="japo_kontrak"
                className="block text-sm font-medium dark:text-honeyDew"
              >
                Jatuh tempo Kontrak
              </label>
              <input
                type="date"
                id="japo_kontrak"
                value={formData.japo_kontrak || ""}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <label
              htmlFor="status"
              className="text-sm font-medium dark:text-honeyDew"
            >
              Status unit (Terdaftar atau tidak terdaftar)
            </label>
            <input
              type="checkbox"
              id="status"
              checked={formData.status || false}
              onChange={handleChange}
              className="w-5 h-5 rounded border-gray-300 text-customGreen-default focus:ring-2 focus:ring-customGreen-dark transition duration-200"
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
      </div>
    </div>
  );
};

const SuspenseEditUnitPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <UnitEditPage />
  </Suspense>
);

export default SuspenseEditUnitPage;
