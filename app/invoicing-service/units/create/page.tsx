"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../components/navbar";
import { useRouter } from "next/navigation";

interface Customer {
  id: number;
  nama_perusahaan: string;
  // alamat: string;
  // pic: string;
  // kontak: string;
  // created_at: string;
  // updated_at: string;
}

const UnitCreatePage = () => {
  const [formData, setFormData] = useState({
    nopol: "",
    tipe: "",
    no_rangka: "",
    no_mesin: "",
    driver: "",
    tahun: "",
    japo_kir: "",
    japo_pajak: "",
    japo_stnk: "",
    japo_kontrak: "",
    status: false,
    id_customer: "",
  });
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(
        "https://personalproject.nusantaratranssentosa.co.id/api/getcustomer"
      )
      .then((response) => setCustomers(response.data.data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, type, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked; // Type assertion
    setFormData({ ...formData, [id]: type === "checkbox" ? checked : value });
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
      await axios.post(
        "https://personalproject.nusantaratranssentosa.co.id/api/unit",
        formData
      );
      setSuccessMessage("Unit created successfully!");
      router.push("/invoicing-service/units");
    } catch (error) {
      setErrorMessage("Error creating unit");
      console.error("Error creating unit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-customGreen-light text-brown dark:bg-gray-900 dark:text-honeyDew">
      <div className="max-w-7xl mx-auto p-6">
        <Navbar title="Create Data Unit" />

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
              <option value="">Pilih customer</option>
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
              <option value="">Pilih tipe</option>
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
                value={formData.japo_kontrak}
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
              checked={formData.status}
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
              {isSubmitting ? "Submitting..." : "Create Unit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UnitCreatePage;
