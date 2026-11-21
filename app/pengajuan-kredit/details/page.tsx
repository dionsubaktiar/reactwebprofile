// Service: reactwebprofile | File: app/pengajuan-kredit/details/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";
import { useSearchParams } from "next/navigation";
import { HiCreditCard, HiTruck, HiUser, HiCheckCircle } from "react-icons/hi";

interface DetailPinjaman {
  id: number;
  asuransi: string;
  down_payment: string;
  tenor: number;
  angsuran: string;
  konsumen: {
    nama: string;
    username: string;
    email: string;
    nik: string;
    tanggal_lahir: string;
    status_perkawinan: string;
    data_pasangan: string | null;
  };
  kendaraan: {
    dealer: string;
    merk_kendaraan: string;
    model_kendaraan: string;
    warna_kendaraan: string;
    harga_kendaraan: string;
  };
}

const FALLBACK_DETAIL: DetailPinjaman = {
  id: 1,
  asuransi: "5000000",
  down_payment: "50000000",
  tenor: 36,
  angsuran: "7250000",
  konsumen: {
    nama: "Dion Subaktiar",
    username: "dionsubaktiar",
    email: "dion@subaktiar.site",
    nik: "3276012903980005",
    tanggal_lahir: "1998-03-29",
    status_perkawinan: "Single",
    data_pasangan: null,
  },
  kendaraan: {
    dealer: "PT Astra International Tbk",
    merk_kendaraan: "Honda",
    model_kendaraan: "HR-V SE Panoramic",
    warna_kendaraan: "Sand Khaki Pearl",
    harga_kendaraan: "415000000",
  },
};

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

const ViewDetailPage = () => {
  const [data, setData] = useState<DetailPinjaman | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/pinjaman/${id || 1}`, {
          withCredentials: true,
          timeout: 3000,
        });
        if (response.data?.id) {
          setData(response.data);
        } else {
          setData(FALLBACK_DETAIL);
        }
      } catch {
        setData(FALLBACK_DETAIL);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col font-sans">
        <Navbar title="Detail Pembiayaan" backUrl="/pengajuan-kredit" />
        <div className="flex-1 flex flex-col items-center justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  const d = data || FALLBACK_DETAIL;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans antialiased">
      <Navbar title="Rincian Pembiayaan Kendaraan" subtitle="Dokumen persetujuan dan rincian angsuran" backUrl="/pengajuan-kredit" />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Pinjaman */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-zinc-800">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                  <HiCreditCard className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">Skema Kredit</h3>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div>
                  <span className="text-slate-400">Angsuran Bulanan:</span>
                  <p className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                    {currencyFormatter.format(Number(d.angsuran))}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Tenor:</span>
                  <p className="font-semibold text-slate-700 dark:text-zinc-300">{d.tenor} Bulan</p>
                </div>
                <div>
                  <span className="text-slate-400">Uang Muka (DP):</span>
                  <p className="font-semibold text-slate-700 dark:text-zinc-300 font-mono">{currencyFormatter.format(Number(d.down_payment))}</p>
                </div>
                <div>
                  <span className="text-slate-400">Premi Asuransi:</span>
                  <p className="font-semibold text-slate-700 dark:text-zinc-300 font-mono">{currencyFormatter.format(Number(d.asuransi))}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              <HiCheckCircle className="h-4 w-4" />
              <span>Status: Disetujui</span>
            </div>
          </div>

          {/* Card 2: Konsumen */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <HiUser className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">Data Konsumen</h3>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <span className="text-slate-400">Nama Pemohon:</span>
                <p className="font-bold text-slate-900 dark:text-white">{d.konsumen.nama}</p>
              </div>
              <div>
                <span className="text-slate-400">NIK:</span>
                <p className="font-mono text-slate-700 dark:text-zinc-300">{d.konsumen.nik}</p>
              </div>
              <div>
                <span className="text-slate-400">Email:</span>
                <p className="text-slate-700 dark:text-zinc-300">{d.konsumen.email}</p>
              </div>
              <div>
                <span className="text-slate-400">Status Pernikahan:</span>
                <p className="text-slate-700 dark:text-zinc-300">{d.konsumen.status_perkawinan}</p>
              </div>
            </div>
          </div>

          {/* Card 3: Kendaraan */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <HiTruck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">Unit Kendaraan</h3>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <span className="text-slate-400">Merk &amp; Tipe:</span>
                <p className="font-bold text-slate-900 dark:text-white">{d.kendaraan.merk_kendaraan} {d.kendaraan.model_kendaraan}</p>
              </div>
              <div>
                <span className="text-slate-400">Harga OTR:</span>
                <p className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{currencyFormatter.format(Number(d.kendaraan.harga_kendaraan))}</p>
              </div>
              <div>
                <span className="text-slate-400">Warna:</span>
                <p className="text-slate-700 dark:text-zinc-300">{d.kendaraan.warna_kendaraan}</p>
              </div>
              <div>
                <span className="text-slate-400">Dealer Rekanan:</span>
                <p className="text-slate-700 dark:text-zinc-300">{d.kendaraan.dealer}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-zinc-950">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
        </div>
      }
    >
      <ViewDetailPage />
    </Suspense>
  );
}
