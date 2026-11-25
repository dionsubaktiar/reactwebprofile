"use client";

import { useState, useEffect, Suspense } from "react";
import apiClient from "@/app/lib/api";
import type { ApiResponse, Unit, Customer } from "@/app/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import SubPageHeader from "@/app/components/SubPageHeader";
import Link from "next/link";
import { FiArrowLeft, FiTruck, FiAlertCircle } from "react-icons/fi";
import FormField, { formControlClass } from "../../_components/FormField";

const UnitEditPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const hasValidId = Boolean(id);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [formData, setFormData] = useState<Unit | null>(null);
  const [isLoading, setIsLoading] = useState(hasValidId);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get<ApiResponse<Customer>>("/getcustomer")
      .then((response) => setCustomers(response.data.data.data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);
  useEffect(() => {
    if (!hasValidId || !id) return;
    let isMounted = true;
    apiClient
      .get(`/unit/${id}`)
      .then((response) => {
        if (!isMounted) return;
        if (response.data?.data) {
          setFormData(response.data.data);
        } else {
          setLoadError("Unit tidak ditemukan.");
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoadError("Gagal memuat data unit. Periksa ID atau muat ulang halaman.");
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [hasValidId, id]);

  const effectiveLoading = hasValidId && isLoading;
  const effectiveLoadError = !hasValidId ? "ID unit tidak ditemukan di URL." : loadError;

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
      await apiClient.put(`/unit/${id}`, formData);
      setSuccessMessage("Unit updated successfully!");
      router.push("/invoicing-service/units");
    } catch (error) {
      setErrorMessage("Error updating unit");
      console.error("Error updating unit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (effectiveLoading)
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-16">
        <SubPageHeader title="Edit Data Unit" />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            Memuat data unit...
          </div>
        </main>
      </div>
    );

  if (effectiveLoadError || !formData)
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-16">
        <SubPageHeader title="Edit Data Unit" />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-2">
            <FiAlertCircle size={28} className="text-zinc-400" />
            <p className="font-semibold text-zinc-700 dark:text-zinc-300">
              {effectiveLoadError ?? "Unit tidak ditemukan."}
            </p>
            <Link
              href="/invoicing-service/units"
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition"
            >
              <FiArrowLeft /> Kembali ke Daftar Unit
            </Link>
          </div>
        </main>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-16">
      <SubPageHeader title="Edit Data Unit" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="mb-6">
          <Link
            href="/invoicing-service/units"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition"
          >
            <FiArrowLeft /> Kembali ke Daftar Unit
          </Link>
          <h1 className="text-2xl font-bold tracking-tight mt-2 flex items-center gap-2">
            <FiTruck className="text-indigo-600 dark:text-emerald-500" /> Edit Unit {formData.nopol}
          </h1>
        </div>

        {successMessage && (
          <div className="mb-4 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-sm text-indigo-600 dark:text-indigo-400">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
            <FiAlertCircle /> {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4"
        >
          <FormField label="Customer" htmlFor="id_customer" required>
            <select
              id="id_customer"
              value={formData.id_customer}
              onChange={handleChange}
              required
              className={formControlClass("indigo")}
            >
              {/* Opsi data awal yang sesuai dengan formData.id_customer */}
              {formData.id_customer &&
                !customers.find((c) => c.id === formData.id_customer) && (
                  <option value={formData.id_customer} disabled>
                    {formData.customers?.nama_perusahaan || "Loading..."}
                  </option>
                )}

              {/* Semua opsi dari API */}
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.nama_perusahaan}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Nomor Polisi" htmlFor="nopol" required>
            <input
              type="text"
              id="nopol"
              value={formData.nopol}
              onChange={handleChange}
              placeholder="A 1234 BCD"
              required
              className={formControlClass("indigo")}
            />
          </FormField>

          <FormField label="Tipe" htmlFor="tipe" required>
            <select
              id="tipe"
              value={formData.tipe}
              onChange={handleChange}
              required
              className={formControlClass("indigo")}
            >
              {/* Tambahkan opsi hanya jika tipe awal tidak ada dalam daftar */}
              {!["Pickup", "Bus", "Truck"].includes(formData.tipe) && (
                <option value={formData.tipe} disabled>
                  {formData.tipe}
                </option>
              )}

              {/* Opsi yang tersedia */}
              <option value="Pickup">Pickup</option>
              <option value="Bus">Bus</option>
              <option value="Truck">Truck</option>
            </select>
          </FormField>

          <FormField label="No Rangka" htmlFor="no_rangka" required>
            <input
              type="text"
              id="no_rangka"
              value={formData.no_rangka ?? ""}
              onChange={handleChange}
              required
              className={formControlClass("indigo")}
            />
          </FormField>

          <FormField label="No Mesin" htmlFor="no_mesin" required>
            <input
              type="text"
              id="no_mesin"
              value={formData.no_mesin ?? ""}
              onChange={handleChange}
              required
              className={formControlClass("indigo")}
            />
          </FormField>

          <FormField label="Driver" htmlFor="driver" required>
            <input
              type="text"
              id="driver"
              value={formData.driver ?? ""}
              onChange={handleChange}
              required
              className={formControlClass("indigo")}
            />
          </FormField>

          <FormField label="Tahun" htmlFor="tahun" required>
            <input
              type="text"
              id="tahun"
              value={formData.tahun ?? ""}
              onChange={handleChange}
              required
              className={formControlClass("indigo")}
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Jatuh tempo KIR" htmlFor="japo_kir" required>
              <input
                type="date"
                id="japo_kir"
                value={formData.japo_kir ?? ""}
                onChange={handleChange}
                required
                className={formControlClass("indigo")}
              />
            </FormField>

            <FormField label="Jatuh tempo Pajak" htmlFor="japo_pajak" required>
              <input
                type="date"
                id="japo_pajak"
                value={formData.japo_pajak ?? ""}
                onChange={handleChange}
                required
                className={formControlClass("indigo")}
              />
            </FormField>

            <FormField label="Jatuh tempo STNK" htmlFor="japo_stnk" required>
              <input
                type="date"
                id="japo_stnk"
                value={formData.japo_stnk ?? ""}
                onChange={handleChange}
                required
                className={formControlClass("indigo")}
              />
            </FormField>

            <FormField label="Jatuh tempo Kontrak" htmlFor="japo_kontrak">
              <input
                type="date"
                id="japo_kontrak"
                value={formData.japo_kontrak || ""}
                onChange={handleChange}
                className={formControlClass("indigo")}
              />
            </FormField>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="status"
              checked={!!formData.status}
              onChange={handleChange}
              className="w-5 h-5 rounded border-zinc-300 dark:border-zinc-700 text-indigo-600 focus:ring-2 focus:ring-indigo-500 transition"
            />
            <label
              htmlFor="status"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Status unit (Terdaftar atau tidak terdaftar)
            </label>
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

const SuspenseEditUnitPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <UnitEditPage />
  </Suspense>
);

export default SuspenseEditUnitPage;
