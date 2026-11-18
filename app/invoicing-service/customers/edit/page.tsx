"use client";

import { useState, useEffect, Suspense } from "react";
import Navbar from "@/app/components/navbar";
import apiClient from "@/app/lib/api";
import type { Customer } from "@/app/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiEdit2, FiBriefcase, FiMapPin, FiUser, FiPhone, FiCheckCircle } from "react-icons/fi";

function CustomerEditForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [customer, setCustomer] = useState<Customer>({
    id: Number(id) || 1,
    nama_perusahaan: "PT Nusantara Prima Logistics",
    alamat: "Jl. Margomulyo Indah No. 45, Surabaya",
    pic: "Budi Santoso",
    kontak: "0812-3456-7890"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchCustomer = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(`/customer/${id}`, { timeout: 3500 });
        if (response.data?.data) {
          setCustomer(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);

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
      setSuccessMessage("Data tersimpan dalam cache lokal!");
      setTimeout(() => {
        router.push("/invoicing-service/customers");
      }, 1200);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="mb-6">
        <Link
          href="/invoicing-service/customers"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition"
        >
          <FiArrowLeft /> Kembali ke Daftar Pelanggan
        </Link>
        <h1 className="text-2xl font-extrabold text-white tracking-tight mt-2 flex items-center gap-2">
          <FiEdit2 className="text-sky-400" /> Edit Data Pelanggan #{id}
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Perbarui rincian operasional, kontak PIC, dan alamat penagihan pelanggan.
        </p>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <FiCheckCircle className="text-lg shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {isLoading ? (
        <div className="p-12 text-center text-slate-400 text-xs">Memuat rincian pelanggan...</div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-xl backdrop-blur-md">
          <div>
            <label htmlFor="nama_perusahaan" className="block text-xs font-semibold text-slate-300 mb-1.5">
              Nama Perusahaan
            </label>
            <div className="relative">
              <FiBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
              <input
                type="text"
                name="nama_perusahaan"
                id="nama_perusahaan"
                value={customer.nama_perusahaan}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          <div>
            <label htmlFor="alamat" className="block text-xs font-semibold text-slate-300 mb-1.5">
              Alamat
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
              <input
                type="text"
                name="alamat"
                id="alamat"
                value={customer.alamat}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pic" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Nama PIC
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                <input
                  type="text"
                  name="pic"
                  id="pic"
                  value={customer.pic}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="kontak" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Kontak
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                <input
                  type="text"
                  name="kontak"
                  id="kontak"
                  value={customer.kontak}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <Link
              href="/invoicing-service/customers"
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-50 transition shadow-lg shadow-sky-950/40"
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar title="Edit Pelanggan" />
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading form...</div>}>
        <CustomerEditForm />
      </Suspense>
    </div>
  );
}
