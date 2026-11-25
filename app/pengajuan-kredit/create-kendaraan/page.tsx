"use client";

import { useState } from "react";
import axios from "axios";
import apiClient from "@/app/lib/api";
import { formatIDR } from "@/app/lib/format";
import SubPageHeader from "@/app/components/SubPageHeader";
import { useRouter } from "next/navigation";
import { FiTruck } from "react-icons/fi";

interface FormData {
  merk_kendaraan: string;
  model_kendaraan: string;
  warna_kendaraan: string;
  harga_kendaraan: number;
  dealer: string;
}

const currencyFormatter = { format: formatIDR };

const CreateKendaraanPage = () => {
  const [formData, setFormData] = useState<FormData>({
    merk_kendaraan: "",
    model_kendaraan: "",
    warna_kendaraan: "",
    harga_kendaraan: 350000000,
    dealer: "PT Astra International Tbk",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "harga_kendaraan") {
      setFormData((prev) => ({
        ...prev,
        harga_kendaraan: Number(value.replace(/[^\d]/g, "")) || 0,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await apiClient.post("/kendaraan", formData);
      router.push("/pengajuan-kredit");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(String(err.response.data.message));
      } else {
        setError("Gagal mendaftarkan kendaraan. Periksa data isian lalu coba lagi.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans antialiased">
      <SubPageHeader title="Registrasi Unit Kendaraan" subtitle="Daftarkan armada kendaraan baru ke katalog leasing" backUrl="/pengajuan-kredit" />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <div className="flex items-center gap-3 pb-5 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <FiTruck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Spesifikasi &amp; Dealer
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Lengkapi rincian merk, tipe, warna, dan harga OTR
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-xl bg-rose-50 p-4 text-xs font-semibold text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dealer" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Nama Dealer
                </label>
                <input
                  type="text"
                  id="dealer"
                  name="dealer"
                  value={formData.dealer}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="merk_kendaraan" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Merk Kendaraan
                </label>
                <input
                  type="text"
                  id="merk_kendaraan"
                  name="merk_kendaraan"
                  placeholder="Contoh: Toyota, Honda"
                  value={formData.merk_kendaraan}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="model_kendaraan" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Model / Varian
                </label>
                <input
                  type="text"
                  id="model_kendaraan"
                  name="model_kendaraan"
                  placeholder="Contoh: Kijang Innova Zenix"
                  value={formData.model_kendaraan}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="warna_kendaraan" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Warna Kendaraan
                </label>
                <input
                  type="text"
                  id="warna_kendaraan"
                  name="warna_kendaraan"
                  placeholder="Contoh: Black Metallic"
                  value={formData.warna_kendaraan}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="harga_kendaraan" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Harga OTR (On The Road)
              </label>
              <input
                type="text"
                id="harga_kendaraan"
                name="harga_kendaraan"
                value={currencyFormatter.format(formData.harga_kendaraan)}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 font-mono shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Mendaftarkan..." : "Daftarkan Kendaraan"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateKendaraanPage;
