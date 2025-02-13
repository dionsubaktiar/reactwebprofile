"use client";

import Navbar from "@/app/components/navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Units {
  id: number;
  nopol: string;
}

interface Packages {
  id: number;
  kode_packages: string;
}

interface Parts {
  id: number;
  nama_barang: string;
  part_number: string;
}

const CreateInvoicePage = () => {
  const [formData, setFormData] = useState({
    kilometer: "",
    tanggal: "",
    id_unit: "",
    id_package: "",
    id_part: [{ id_part: "", qty: "" }],
  });

  const [units, setUnits] = useState<Units[]>([]);
  const [parts, setParts] = useState<Parts[]>([]);
  const [packages, setPackages] = useState<Packages[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unitResp, partsResp, packagesResp] = await Promise.all([
          axios.get(
            "https://personalproject.nusantaratranssentosa.co.id/api/getunit"
          ),
          axios.get(
            "https://personalproject.nusantaratranssentosa.co.id/api/getparts"
          ),
          axios.get(
            "https://personalproject.nusantaratranssentosa.co.id/api/packages"
          ),
        ]);

        setUnits(unitResp.data.data);
        setParts(partsResp.data.data);
        setPackages(packagesResp.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePartChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedParts = [...prev.id_part];
      updatedParts[index] = { ...updatedParts[index], [name]: value };
      return { ...prev, id_part: updatedParts };
    });
  };

  const addPart = () => {
    setFormData((prev) => ({
      ...prev,
      id_part: [...prev.id_part, { id_part: "", qty: "" }],
    }));
  };

  const removePart = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      id_part: prev.id_part.filter((_, i) => i !== index),
    }));
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
        "https://personalproject.nusantaratranssentosa.co.id/api/invoice",
        formData
      );
      setSuccessMessage("Unit created successfully!");
      router.push("/invoicing-service");
    } catch (error) {
      setErrorMessage("Error creating unit");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-customGreen-light text-brown dark:bg-gray-900 dark:text-honeyDew">
      <div className="max-w-7xl mx-auto p-6">
        <Navbar title="Create Invoice" />

        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block text-sm font-medium dark:text-honeyDew">
              Unit<span className="text-red-500">*</span>
            </label>
            <select
              name="id_unit"
              value={formData.id_unit}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
              required
            >
              <option value="">Pilih Unit</option>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.nopol}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-honeyDew">
              Kilometer<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="kilometer"
              placeholder="1234 (km)"
              value={formData.kilometer}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-honeyDew">
              Tanggal<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-honeyDew">
              Package
            </label>
            <select
              name="id_package"
              value={formData.id_package}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
            >
              <option value="">Select Package</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.kode_packages}
                </option>
              ))}
            </select>
          </div>
          <div>
            {formData.id_part.map((part, index) => (
              <div key={index} className="flex gap-2 items-end mt-1">
                {/* Parts Select */}
                <div className="w-3/4">
                  <label className="text-sm font-medium dark:text-honeyDew">
                    Parts
                  </label>
                  <select
                    name="id_part"
                    value={part.id_part}
                    onChange={(e) => handlePartChange(index, e)}
                    className="p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
                  >
                    <option value="">Select Part</option>
                    {parts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nama_barang} - {p.part_number}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Qty Input & Remove Button */}
                <div className="flex items-end gap-2 w-1/4">
                  <div className="w-full">
                    <label className="text-sm font-medium dark:text-honeyDew">
                      Qty
                    </label>
                    <input
                      type="number"
                      name="qty"
                      value={part.qty}
                      onChange={(e) => handlePartChange(index, e)}
                      className="p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
                    />
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removePart(index)}
                    className="bg-red-500 text-white py-2 px-3 rounded-lg shadow-md hover:bg-red-600 transition duration-300 "
                  >
                    X
                  </button>
                </div>
              </div>
            ))}

            {/* Add Part Button */}
            <button
              type="button"
              onClick={addPart}
              className="bg-customGreen-default text-white w-full mt-2 px-4 py-2 rounded-lg shadow-md hover:bg-customGreen-dark transition duration-300"
            >
              + Add Part
            </button>
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

export default CreateInvoicePage;
