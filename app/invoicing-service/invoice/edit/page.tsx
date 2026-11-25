"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import apiClient from "@/app/lib/api";
import type { ApiResponse, Package, Unit, Part, Invoice } from "@/app/lib/types";
import SubPageHeader from "@/app/components/SubPageHeader";
import Link from "next/link";
import { FiArrowLeft, FiFileText, FiTrash2, FiAlertCircle } from "react-icons/fi";
import FormField, { formControlClass } from "../../_components/FormField";

const EditInvoicePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const hasValidId = Boolean(id);
  const [invoiceData, setInvoiceData] = useState<Invoice | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(hasValidId);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get<ApiResponse<Unit>>("/getunit")
      .then((response) => setUnits(response.data.data.data))
      .catch(() => {});
    apiClient
      .get<ApiResponse<Package>>("/packages")
      .then((response) => setPackages(response.data.data.data))
      .catch(() => {});
    apiClient
      .get<ApiResponse<Part>>("/getparts")
      .then((response) => setParts(response.data.data.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!hasValidId || !id) return;
    let isMounted = true;
    apiClient
      .get(`/invoice/${id}`)
      .then((response) => {
        if (!isMounted) return;
        if (response.data?.data) {
          setInvoiceData(response.data.data);
        } else {
          setError("Invoice tidak ditemukan.");
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "Gagal memuat invoice.");
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [hasValidId, id]);

  const effectiveLoading = hasValidId && loading;
  const effectiveError = !hasValidId ? "ID invoice tidak ditemukan di URL." : error;

  const handlePartChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setInvoiceData((prev) => {
      if (!prev) return prev;

      const updatedParts = (prev.parts ?? []).map((part, i) =>
        // `name` di sini "id_part" atau "quantity" — keduanya angka.
        // Dulu baris baru memakai field `qty` sementara submit membaca
        // `quantity`, sehingga qty yang ditambah selalu `undefined`.
        i === index ? { ...part, [name]: Number(value) } : part
      );

      return { ...prev, parts: updatedParts };
    });
  };

  const addPart = () => {
    setInvoiceData((prev) => {
      if (!prev) return prev;
      return { ...prev, parts: [...(prev.parts ?? []), { id_part: 0, quantity: 1 }] };
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
          quantity: part.quantity,
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

  if (effectiveLoading)
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-16">
        <SubPageHeader title="Edit Invoice" />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            Memuat data invoice...
          </div>
        </main>
      </div>
    );
  if (effectiveError || !invoiceData)
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-16">
        <SubPageHeader title="Edit Invoice" />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-2">
            <FiAlertCircle size={28} className="text-zinc-400" />
            <p className="font-semibold text-zinc-700 dark:text-zinc-300">
              {effectiveError ?? "Invoice tidak ditemukan."}
            </p>
            <Link
              href="/invoicing-service"
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition"
            >
              <FiArrowLeft /> Kembali ke Hub Invoicing
            </Link>
          </div>
        </main>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-16">
      <SubPageHeader title="Edit Invoice" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="mb-6">
          <Link
            href="/invoicing-service"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition"
          >
            <FiArrowLeft /> Kembali ke Hub Invoicing
          </Link>
          <h1 className="text-2xl font-bold tracking-tight mt-2 flex items-center gap-2">
            <FiFileText className="text-indigo-600 dark:text-indigo-500" /> Edit Invoice{" "}
            {invoiceData?.kode_invoice ?? `#${id}`}
          </h1>
        </div>

        {successMessage && (
          <div className="mb-4 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-sm text-indigo-600 dark:text-indigo-400">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-sm text-red-600 dark:text-red-400">
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4"
        >
          <FormField label="Kode Invoice" htmlFor="kode_invoice">
            <input
              type="text"
              id="kode_invoice"
              name="kode_invoice"
              value={invoiceData?.kode_invoice || ""}
              disabled
              className={`${formControlClass("indigo")} disabled:opacity-60`}
            />
          </FormField>

          <FormField label="Unit" htmlFor="id_unit">
            <select
              id="id_unit"
              name="id_unit"
              className={formControlClass("indigo")}
              value={invoiceData?.id_unit || ""}
              onChange={handleChange}
            >
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.nopol}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Tanggal" htmlFor="tanggal">
            <input
              type="date"
              id="tanggal"
              name="tanggal"
              value={invoiceData?.tanggal || ""}
              onChange={handleChange}
              className={formControlClass("indigo")}
            />
          </FormField>

          <FormField label="Kilometer" htmlFor="kilometer">
            <input
              type="number"
              id="kilometer"
              name="kilometer"
              value={invoiceData?.kilometer || ""}
              onChange={handleChange}
              className={formControlClass("indigo")}
            />
          </FormField>

          <FormField label="Package" htmlFor="id_package">
            <select
              id="id_package"
              name="id_package"
              className={formControlClass("indigo")}
              value={invoiceData?.id_package || ""}
              onChange={handleChange}
            >
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.kode_packages}
                </option>
              ))}
            </select>
          </FormField>

          <div>
            <span className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Parts
            </span>
            {invoiceData?.parts?.map((part, index) => (
              <div key={index} className="flex gap-2 items-end mt-2">
                <div className="w-3/4">
                  <select
                    name="id_part"
                    value={part.id_part || ""}
                    onChange={(e) => handlePartChange(index, e)}
                    className={formControlClass("indigo")}
                    aria-label={`Part baris ${index + 1}`}
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
                  <input
                    type="number"
                    name="quantity"
                    value={part.quantity || ""}
                    onChange={(e) => handlePartChange(index, e)}
                    placeholder="Qty"
                    aria-label={`Jumlah baris ${index + 1}`}
                    className={formControlClass("indigo")}
                  />
                  <button
                    type="button"
                    onClick={() => removePart(index)}
                    aria-label={`Hapus baris part ${index + 1}`}
                    className="p-2.5 rounded-xl bg-red-500 text-white shadow-sm hover:bg-red-600 transition"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addPart}
              className="w-full mt-3 px-4 py-2.5 text-xs font-bold rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
            >
              + Tambah Part
            </button>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

const SuspenseEditInvoicePage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EditInvoicePage />
  </Suspense>
);

export default SuspenseEditInvoicePage;
