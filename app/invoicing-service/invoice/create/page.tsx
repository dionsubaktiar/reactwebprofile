"use client";

import Navbar from "@/app/components/navbar";
import apiClient from "@/app/lib/api";
import type { ApiResponse, Unit, Package, Part } from "@/app/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreateInvoicePage = () => {
  const [formData, setFormData] = useState({
    kilometer: "",
    tanggal: "",
    id_unit: "",
    id_package: "",
    id_part: [{ id_part: "", qty: "" }],
  });

  const [units, setUnits] = useState<Unit[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unitResp, partsResp, packagesResp] = await Promise.all([
          apiClient.get<ApiResponse<Unit>>("/getunit"),
          apiClient.get<ApiResponse<Part>>("/getparts"),
          apiClient.get<ApiResponse<Package>>("/packages"),
        ]);

        setUnits(unitResp.data.data.data);
        setParts(partsResp.data.data.data);
        setPackages(packagesResp.data.data.data);
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

  // const handlePartChange = (
  //   index: number,
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => {
  //     const updatedParts = [...prev.id_part];
  //     updatedParts[index] = { ...updatedParts[index], [name]: value };
  //     return { ...prev, id_part: updatedParts };
  //   });
  // };

  // const addPart = () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     id_part: [...prev.id_part, { id_part: "", qty: "" }],
  //   }));
  // };

  // const removePart = (index: number) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     id_part: prev.id_part.filter((_, i) => i !== index),
  //   }));
  // };
  const handlePartChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (!prev.id_part) return prev; // Ensure id_part exists

      const updatedParts = [...prev.id_part];
      updatedParts[index] = { ...updatedParts[index], [name]: value };
      return { ...prev, id_part: updatedParts };
    });
  };

  const addPart = () => {
    setFormData((prev) => ({
      ...prev,
      id_part: prev.id_part
        ? [...prev.id_part, { id_part: "", qty: "" }]
        : [{ id_part: "", qty: "" }],
    }));
  };

  const removePart = (index: number) => {
    setFormData((prev) => {
      const updatedParts = prev.id_part.filter((_, i) => i !== index);
      return {
        ...prev,
        id_part: updatedParts, // Tidak menambahkan elemen kosong
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    // Pastikan `id_part` dikirim sebagai `null` jika kosong
    const payload = {
      ...formData,
      id_part: formData.id_part.length > 0 ? formData.id_part : null,
    };

    try {
      await apiClient.post("/invoice", payload);
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
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans antialiased">
      <div className="max-w-7xl mx-auto p-6">
        <Navbar title="Create Invoice" />

        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block text-sm font-medium dark:text-zinc-200">
              Unit<span className="text-red-500">*</span>
            </label>
            <select
              name="id_unit"
              value={formData.id_unit}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-zinc-200"
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
            <label className="block text-sm font-medium dark:text-zinc-200">
              Kilometer<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="kilometer"
              placeholder="1234 (km)"
              value={formData.kilometer}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-zinc-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-zinc-200">
              Tanggal<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-zinc-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-zinc-200">
              Package
            </label>
            <select
              name="id_package"
              value={formData.id_package}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-zinc-200"
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
            {formData.id_part.length > 0 &&
              formData.id_part.map((part, index) => (
                <div key={index} className="flex gap-2 items-end mt-1">
                  {/* Parts Select */}
                  <div className="w-3/4">
                    <label className="text-sm font-medium dark:text-zinc-200">
                      Parts
                    </label>
                    <select
                      name="id_part"
                      value={part.id_part}
                      onChange={(e) => handlePartChange(index, e)}
                      className="p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-zinc-200"
                    >
                      <option value="">Select Part</option>
                      {parts.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.nama_barang} - {p.merk}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Qty Input & Remove Button */}
                  <div className="flex items-end gap-2 w-1/4">
                    <div className="w-full">
                      <label className="text-sm font-medium dark:text-zinc-200">
                        Qty
                      </label>
                      <input
                        type="number"
                        name="qty"
                        value={part.qty}
                        onChange={(e) => handlePartChange(index, e)}
                        className="p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-zinc-200"
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
              className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white w-full mt-2 px-4 py-2 rounded-lg shadow-md hover:from-indigo-700 hover:to-violet-700 transition duration-300"
            >
              + Add Part
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting ? "bg-gray-400" : "bg-gradient-to-r from-indigo-600 to-violet-600"
              } text-white px-4 py-2 rounded-lg shadow-md hover:from-indigo-700 hover:to-violet-700 transition duration-300`}
            >
              {isSubmitting ? "Submitting..." : "Create Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoicePage;
