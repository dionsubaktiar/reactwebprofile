"use client";

import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import apiClient from "@/app/lib/api";
import { formatIDR } from "@/app/lib/format";
import SubPageHeader from "@/app/components/SubPageHeader";
import { useRouter, useSearchParams } from "next/navigation";
import { FiCreditCard } from "react-icons/fi";

interface Kendaraan {
  id: number;
  merk_kendaraan: string;
  model_kendaraan: string;
}

interface Konsumen {
  id: number;
  nama: string;
  email: string;
}

interface FormData {
  asuransi: number;
  down_payment: number;
  tenor: number;
  id_kendaraan: number;
  id_user: number;
}

const currencyFormatter = { format: formatIDR };

const CreatePinjamanForm = () => {
  const searchParams = useSearchParams();
  const dpParam = Number(searchParams.get("dp"));
  const tenorParam = Number(searchParams.get("tenor"));

  const [formData, setFormData] = useState<FormData>({
    asuransi: 5000000,
    down_payment: Number.isFinite(dpParam) && dpParam > 0 ? dpParam : 35000000,
    tenor: [12, 24, 36, 48, 60].includes(tenorParam) ? tenorParam : 36,
    id_kendaraan: 10,
    id_user: 101,
  });
  const [kendaraanOptions, setKendaraanOptions] = useState<Kendaraan[]>([]);
  const [konsumenOptions, setKonsumenOptions] = useState<Konsumen[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resK, resU] = await Promise.all([
          apiClient.get<{ data?: Kendaraan[] }>("/kendaraan"),
          apiClient.get<{ data?: Konsumen[] }>("/konsumen"),
        ]);
        const listK = resK.data?.data ?? [];
        const listU = resU.data?.data ?? [];
        setKendaraanOptions(listK);
        setKonsumenOptions(listU);
        if (listK.length > 0 || listU.length > 0) {
          setFormData((prev) => ({
            ...prev,
            id_kendaraan: listK[0]?.id ?? prev.id_kendaraan,
            id_user: listU[0]?.id ?? prev.id_user,
          }));
        }
      } catch {
        setError("Gagal memuat daftar kendaraan dan konsumen.");
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const cleanNum = Number(value.replace(/[^\d]/g, "")) || 0;
    setFormData((prev) => ({ ...prev, [name]: cleanNum }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await apiClient.get("/sanctum/csrf-cookie");
      await apiClient.post("/pinjaman", formData);
      router.push("/pengajuan-kredit");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(String(err.response.data.message));
      } else {
        setError("Gagal menyimpan pengajuan pembiayaan. Periksa data isian lalu coba lagi.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans antialiased">
      <SubPageHeader title="Formulir Pengajuan Pembiayaan" subtitle="Input parameter kredit kendaraan bermotor" backUrl="/pengajuan-kredit" />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <div className="flex items-center gap-3 pb-5 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <FiCreditCard className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Skema Akad Pembiayaan
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Pilih unit kendaraan, profil pemohon, dan nominal uang muka
              </p>
            </div>
          </div>

          {error && (
            <div role="alert" className="mt-4 rounded-xl bg-rose-50 p-4 text-xs font-semibold text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="id_kendaraan" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Pilih Kendaraan
                </label>
                <div className="relative mt-1">
                  <select
                    id="id_kendaraan"
                    name="id_kendaraan"
                    value={formData.id_kendaraan}
                    onChange={handleSelectChange}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                    required
                  >
                    {kendaraanOptions.map((k) => (
                      <option key={k.id} value={k.id}>
                        {k.merk_kendaraan} {k.model_kendaraan}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="id_user" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Data Konsumen
                </label>
                <div className="relative mt-1">
                  <select
                    id="id_user"
                    name="id_user"
                    value={formData.id_user}
                    onChange={handleSelectChange}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                    required
                  >
                    {konsumenOptions.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nama} ({c.email})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label htmlFor="down_payment" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Down Payment (DP)
                </label>
                <input
                  type="text"
                  id="down_payment"
                  name="down_payment"
                  value={currencyFormatter.format(formData.down_payment)}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 font-mono shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="asuransi" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Premi Asuransi
                </label>
                <input
                  type="text"
                  id="asuransi"
                  name="asuransi"
                  value={currencyFormatter.format(formData.asuransi)}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 font-mono shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="tenor" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Tenor Pembiayaan
                </label>
                <select
                  id="tenor"
                  name="tenor"
                  value={formData.tenor}
                  onChange={handleSelectChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                >
                  <option value={12}>12 Bulan (1 Tahun)</option>
                  <option value={24}>24 Bulan (2 Tahun)</option>
                  <option value={36}>36 Bulan (3 Tahun)</option>
                  <option value={48}>48 Bulan (4 Tahun)</option>
                  <option value={60}>60 Bulan (5 Tahun)</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Memproses Akad..." : "Simpan & Ajukan Pembiayaan"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default function CreatePinjamanPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-zinc-950">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
        </div>
      }
    >
      <CreatePinjamanForm />
    </Suspense>
  );
}
