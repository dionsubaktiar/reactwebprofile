// Service: reactwebprofile | File: app/invoicing-service/parts/create/page.tsx
"use client";

import Navbar from "@/app/components/navbar";
import apiClient from "@/app/lib/api";
import { applyPartFieldChange, PART_FORM_DEFAULTS } from "@/app/lib/part-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiTool, FiPlus } from "react-icons/fi";
import FormField, { formControlClass } from "../../_components/FormField";

const CreatePartsPage = () => {
  const [parts, setParts] = useState(PART_FORM_DEFAULTS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await apiClient.post("/part", parts);
      setSuccessMessage("Komponen suku cadang berhasil didaftarkan!");
      setTimeout(() => router.push("/invoicing-service/parts"), 1000);
    } catch {
      // Jangan klaim tersimpan bila request gagal — tampilkan error yang terlihat.
      setErrorMessage(
        "Gagal menyimpan part. Periksa koneksi atau data isian, lalu coba lagi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setParts((prev) => applyPartFieldChange(prev, name, value));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-16">
      <Navbar title="Create Data Part" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="mb-6">
          <Link
            href="/invoicing-service/parts"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition"
          >
            <FiArrowLeft /> Kembali ke Katalog Suku Cadang
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight mt-2 flex items-center gap-2">
            <FiTool className="text-indigo-600 dark:text-indigo-500" /> Form
            Tambah Suku Cadang
          </h1>
        </div>

        {successMessage && (
          <div className="mb-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-sm text-emerald-600 dark:text-emerald-400">
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
          <FormField label="Nama Barang" htmlFor="nama_barang" required>
            <input
              type="text"
              id="nama_barang"
              name="nama_barang"
              placeholder="nama barang"
              value={parts.nama_barang}
              onChange={handleChange}
              required
              className={formControlClass("indigo")}
            />
          </FormField>

          <FormField label="Merk" htmlFor="merk" required>
            <input
              type="text"
              id="merk"
              name="merk"
              placeholder="masukkan merk"
              value={parts.merk}
              onChange={handleChange}
              required
              className={formControlClass("indigo")}
            />
          </FormField>

          <FormField label="Part Number" htmlFor="part_number">
            <input
              type="text"
              id="part_number"
              name="part_number"
              placeholder="masukkan part number"
              value={parts.part_number}
              onChange={handleChange}
              className={formControlClass("indigo")}
            />
          </FormField>

          <FormField label="Jenis Kendaraan" htmlFor="kendaraan" required>
            <select
              id="kendaraan"
              name="kendaraan"
              value={parts.kendaraan}
              onChange={handleChange}
              required
              className={formControlClass("indigo")}
            >
              <option value="">Pilih tipe</option>
              <option value="Pickup">Pickup</option>
              <option value="Bus">Bus</option>
              <option value="Truck">Truck</option>
            </select>
          </FormField>

          <FormField label="Harga Part" htmlFor="harga" required>
            <input
              type="number"
              id="harga"
              name="harga"
              value={parts.harga}
              onChange={handleChange}
              required
              className={formControlClass("indigo")}
            />
          </FormField>

          <FormField label="Biaya pasang" htmlFor="jasa" required>
            <input
              type="number"
              id="jasa"
              name="jasa"
              value={parts.jasa}
              onChange={handleChange}
              required
              className={formControlClass("indigo")}
            />
          </FormField>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm disabled:opacity-50"
            >
              <FiPlus size={15} />
              {isSubmitting ? "Submitting..." : "Create Parts"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreatePartsPage;
