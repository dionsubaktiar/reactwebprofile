"use client";

import { useState, useEffect, Suspense } from "react";
import Navbar from "@/app/components/navbar";
import apiClient from "@/app/lib/api";
import type { Customer } from "@/app/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiEdit2, FiBriefcase, FiMapPin, FiUser, FiPhone, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const inputClass =
  "w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition";
const labelClass = "block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5";

function CustomerEditForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setErrorMessage("ID pelanggan tidak ditemukan di URL.");
      return;
    }
    let isMounted = true;
    const fetchCustomer = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const response = await apiClient.get(`/customer/${id}`, { timeout: 3500 });
        if (isMounted) {
          if (response.data?.data) {
            setCustomer(response.data.data);
          } else {
            setErrorMessage("Pelanggan tidak ditemukan.");
          }
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
        if (isMounted) setErrorMessage("Gagal memuat data pelanggan. Coba muat ulang halaman.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchCustomer();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomer((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) return;
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      if (id) {
        await apiClient.put(`/customer/${id}`, customer);
      } else {
        await apiClient.post("/customer", customer);
      }
      setSuccessMessage("Data pelanggan berhasil diperbarui!");
      setTimeout(() => {
        router.push("/invoicing-service/customers");
      }, 1200);
    } catch {
      // Jangan klaim tersimpan bila request gagal — tampilkan error yang terlihat.
      setErrorMessage("Gagal menyimpan perubahan. Periksa koneksi atau data isian, lalu coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="mb-6">
        <Link
          href="/invoicing-service/customers"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition"
        >
          <FiArrowLeft /> Kembali ke Daftar Pelanggan
        </Link>
        <h1 className="text-2xl font-extrabold tracking-tight mt-2 flex items-center gap-2">
          <FiEdit2 className="text-sky-600 dark:text-sky-400" /> Edit Data Pelanggan {id ? `#${id}` : ""}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Perbarui rincian operasional, kontak PIC, dan alamat penagihan pelanggan.
        </p>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
          <FiCheckCircle className="text-lg shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
          <FiAlertCircle className="text-lg shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {isLoading ? (
        <div className="p-12 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
          Memuat rincian pelanggan...
        </div>
      ) : !customer ? (
        <div className="p-12 text-center text-sm text-zinc-500">
          {errorMessage ? "Data pelanggan tidak dapat ditampilkan." : "Tidak ada data pelanggan untuk diedit."}{" "}
          <Link href="/invoicing-service/customers" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
            Kembali ke daftar pelanggan
          </Link>
          .
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-5 shadow-sm">
          <div>
            <label htmlFor="nama_perusahaan" className={labelClass}>
              Nama Perusahaan
            </label>
            <div className="relative">
              <FiBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
              <input
                type="text"
                name="nama_perusahaan"
                id="nama_perusahaan"
                value={customer.nama_perusahaan}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="alamat" className={labelClass}>
              Alamat
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
              <input
                type="text"
                name="alamat"
                id="alamat"
                value={customer.alamat}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pic" className={labelClass}>
                Nama PIC
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
                <input
                  type="text"
                  name="pic"
                  id="pic"
                  value={customer.pic}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="kontak" className={labelClass}>
                Kontak
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs" />
                <input
                  type="text"
                  name="kontak"
                  id="kontak"
                  value={customer.kontak}
                  onChange={handleChange}
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-50 transition shadow-sm"
            >
              <FiEdit2 /> {isSubmitting ? "Menyimpan..." : "Perbarui Data"}
            </button>
          </div>
        </form>
      )}
    </main>
  );
}

export default function EditCustomerPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-16">
      <Navbar title="Edit Pelanggan" />
      <Suspense fallback={<div className="p-8 text-center text-sm text-zinc-500">Loading form...</div>}>
        <CustomerEditForm />
      </Suspense>
    </div>
  );
}
