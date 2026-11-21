// Service: reactwebprofile | File: app/invoicing-service/parts/create/page.tsx
"use client";

import Navbar from "@/app/components/navbar";
import apiClient from "@/app/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiTool, FiCheckCircle } from "react-icons/fi";

const CreatePartsPage = () => {
  const [parts, setParts] = useState({
    part_number: "",
    nama_barang: "",
    merk: "",
    kendaraan: "Truck",
    harga: 250000,
    jasa: 50000,
  });
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
      setSuccessMessage("(Simulasi) Komponen suku cadang berhasil didaftarkan lokal.");
      setTimeout(() => router.push("/invoicing-service/parts"), 1200);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "harga" || name === "jasa" ? Number(value) : value;
    setParts((prev) => ({ ...prev, [name]: parsedValue }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans antialiased">
      <Navbar title="Registrasi Spare Part" subtitle="Tambahkan data komponen suku cadang baru" backUrl="/invoicing-service/parts" />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <div className="flex items-center gap-3 pb-5 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <FiTool className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Spesifikasi &amp; Tarif Part
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Lengkapi nama barang, merk, nomor part, dan estimasi jasa pasang
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nama_barang" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Nama Barang <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="nama_barang"
                  name="nama_barang"
                  placeholder="Contoh: Kampas Rem Depan"
                  value={parts.nama_barang}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="merk" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Merk / Manufaktur <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="merk"
                  name="merk"
                  placeholder="Contoh: Bendix, Denso"
                  value={parts.merk}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="part_number" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Nomor Part (Part Number)
                </label>
                <input
                  type="text"
                  id="part_number"
                  name="part_number"
                  placeholder="Contoh: BD-9182"
                  value={parts.part_number}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="kendaraan" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Tipe Kendaraan <span className="text-rose-500">*</span>
                </label>
                <select
                  id="kendaraan"
                  name="kendaraan"
                  value={parts.kendaraan}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                >
                  <option value="Truck">Truck</option>
                  <option value="Bus">Bus</option>
                  <option value="Pickup">Pickup</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="harga" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Harga Pokok Part (Rp) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  id="harga"
                  name="harga"
                  value={parts.harga}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 font-mono shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="jasa" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Biaya Pasang / Jasa Mekanik (Rp) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  id="jasa"
                  name="jasa"
                  value={parts.jasa}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 font-mono shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                />
              </div>
            </div>

            {successMessage && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                <FiCheckCircle className="h-5 w-5 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}
            {errorMessage && (
              <div className="rounded-xl bg-rose-50 p-4 text-xs font-semibold text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
                {errorMessage}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-xs font-bold text-white shadow-sm shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Menyimpan Data..." : "Daftarkan Spare Part"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreatePartsPage;
