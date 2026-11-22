"use client";

import { useState } from "react";
import Navbar from "@/app/components/navbar";
import apiClient from "@/app/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiPlus, FiBriefcase, FiMapPin, FiUser, FiPhone, FiAlertCircle } from "react-icons/fi";

const inputClass =
  "w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition";
const labelClass = "block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5";

export default function CreateCustomerPage() {
  const [nama_perusahaan, setNamaPerusahaan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [pic, setPic] = useState("");
  const [kontak, setKontak] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const newCustomer = {
      nama_perusahaan,
      alamat,
      pic,
      kontak,
    };

    try {
      await apiClient.post("/customer", newCustomer);
      router.push("/invoicing-service/customers");
    } catch (err) {
      console.error("Error creating customer:", err);
      // Jangan redirect seolah berhasil — tampilkan error yang terlihat.
      setError("Gagal menyimpan pelanggan. Periksa koneksi atau data isian, lalu coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-16">
      <Navbar title="Tambah Pelanggan Baru" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="mb-6">
          <Link
            href="/invoicing-service/customers"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition"
          >
            <FiArrowLeft /> Kembali ke Daftar Pelanggan
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight mt-2 flex items-center gap-2">
            <FiBriefcase className="text-emerald-600 dark:text-emerald-500" /> Form Tambah Data Mitra
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Lengkapi data legal dan operasional pelanggan baru untuk integrasi faktur &amp; SPK.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
            <FiAlertCircle className="text-lg shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-5 shadow-sm">
          <div>
            <label htmlFor="nama_perusahaan" className={labelClass}>
              Nama Perusahaan / Entitas
            </label>
            <div className="relative">
              <FiBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
              <input
                type="text"
                id="nama_perusahaan"
                placeholder="Contoh: PT Samudera Logistik Nusantara"
                value={nama_perusahaan}
                onChange={(e) => setNamaPerusahaan(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="alamat" className={labelClass}>
              Alamat Kantor / Depo Operasional
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
              <input
                type="text"
                id="alamat"
                placeholder="Contoh: Jl. Industri Pergudangan No. 88, Surabaya"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pic" className={labelClass}>
                Nama Person In Charge (PIC)
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
                <input
                  type="text"
                  id="pic"
                  placeholder="Contoh: Hendra Setiawan"
                  value={pic}
                  onChange={(e) => setPic(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="kontak" className={labelClass}>
                Nomor Kontak / Telepon
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
                <input
                  type="text"
                  id="kontak"
                  placeholder="Contoh: 0812-9988-7766"
                  value={kontak}
                  onChange={(e) => setKontak(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-200 dark:border-zinc-800">
            <Link
              href="/invoicing-service/customers"
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 transition shadow-sm"
            >
              <FiPlus /> {isSubmitting ? "Menyimpan..." : "Simpan Data Mitra"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
