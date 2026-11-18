"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import apiClient from "@/app/lib/api";
import type { Package, Unit, Part, Invoice } from "@/app/lib/types";
import Navbar from "@/app/components/navbar";

const EditInvoicePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [invoiceData, setInvoiceData] = useState<Invoice | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get("/getunit")
      .then((response) => setUnits(response.data.data))
      .catch(() => {});
    apiClient
      .get("/packages")
      .then((response) => setPackages(response.data))
      .catch(() => {});
    apiClient
      .get("/getparts")
      .then((response) => setParts(response.data.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (id) {
      apiClient
        .get(`/invoice/${id}`)
        .then((response) => {
          setInvoiceData(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

  const handlePartChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setInvoiceData((prev) => {
      if (!prev) return prev;

      const updatedParts = (prev.parts ?? []).map((part, i) =>
        i === index
          ? { ...part, [name]: name === "qty" ? Number(value) : Number(value) }
          : part
      );

      return { ...prev, parts: updatedParts };
    });
  };

  const addPart = () => {
    setInvoiceData((prev) => {
      if (!prev) return prev;
      return { ...prev, parts: [...(prev.parts ?? []), { id_part: 0, qty: 1 }] };
    });
  };

  const removePart = (index: number) => {
    setInvoiceData((prev) => {
      if (!prev) return prev;
      return { ...prev, parts: (prev.parts ?? []).filter((_, i) => i !== index) };
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setInvoiceData((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [name]:
          name === "kilometer" || name === "id_unit" || name === "id_package"
            ? Number(value)
            : value,
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    try {
      const payload = {
        kilometer: invoiceData?.kilometer,
        tanggal: invoiceData?.tanggal, // Adjust if needed
        id_package: invoiceData?.id_package,
        id_unit: invoiceData?.id_unit,
        id_part: invoiceData?.parts?.map((part) => ({
          id_part: part.id_part,
          qty: part.quantity,
        })),
      };

      await apiClient.put(`/invoice/${id}`, payload);
      setSuccessMessage("Invoice updated successfully!");
      router.push("/invoicing-service");
    } catch (error) {
      setErrorMessage("Error updating invoice");
      console.error("Error updating invoice:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center bg-customGreen-light dark:bg-gray-900 h-full min-h-screen">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading...
        </p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center bg-customGreen-light dark:bg-gray-900 h-full min-h-screen">
        <p className="text-lg font-semibold text-red-500 animate-pulse">
          Error
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-customGreen-light text-brown dark:bg-gray-900 dark:text-honeyDew">
      <div className="max-w-7xl mx-auto p-6">
        <Navbar title="Edit Invoice" />
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            Kode Invoice:
            <input
              type="text"
              name="kode_invoice"
              value={invoiceData?.kode_invoice || ""}
              disabled
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
            />
          </label>
          <label>
            Select Unit:
            <select
              name="id_unit"
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
              value={invoiceData?.id_unit || ""}
              onChange={handleChange}
            >
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.nopol}
                </option>
              ))}
            </select>
          </label>

          <label>
            Tanggal:
            <input
              type="date"
              name="tanggal"
              value={invoiceData?.tanggal || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
            />
          </label>

          <label>
            Kilometer:
            <input
              type="number"
              name="kilometer"
              value={invoiceData?.kilometer || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
            />
          </label>

          <label>
            Select Package:
            <select
              name="id_package"
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
              value={invoiceData?.id_package || ""}
              onChange={handleChange}
            >
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.kode_packages}
                </option>
              ))}
            </select>
          </label>
          <div>
            {invoiceData?.parts?.map((part, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="w-3/4">
                  <label className="text-sm font-medium dark:text-honeyDew">
                    Parts
                  </label>
                  <select
                    name="id_part"
                    value={part.id_part || ""}
                    onChange={(e) => handlePartChange(index, e)}
                    className="p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
                  >
                    <option value="">Select Part</option>
                    {parts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nama_barang} - {p.merk}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end gap-2 w-1/4">
                  <div className="w-full">
                    <label className="text-sm font-medium dark:text-honeyDew">
                      Qty
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={part.quantity || ""}
                      onChange={(e) => handlePartChange(index, e)}
                      className="p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removePart(index)}
                    className="bg-red-500 text-white py-2 px-3 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addPart}
              className="bg-customGreen-default text-white w-full mt-2 px-4 py-2 rounded-lg shadow-md hover:bg-customGreen-dark"
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
              {isSubmitting ? "Submitting..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SuspenseEditInvoicePage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EditInvoicePage />
  </Suspense>
);

export default SuspenseEditInvoicePage;
