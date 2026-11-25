"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import apiClient from "@/app/lib/api";
import { formatIDR } from "@/app/lib/format";
import SubPageHeader from "@/app/components/SubPageHeader";
import { useSearchParams } from "next/navigation";
import { FiCreditCard, FiTruck, FiUser, FiCheckCircle } from "react-icons/fi";

interface DetailPinjaman {
  id: number;
  asuransi: string;
  down_payment: string;
  tenor: number;
  angsuran: string;
  status?: "Disetujui" | "Dalam Review";
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

function formatAsuransi(value: string): string {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return "-";
  const num = Number(trimmed);
  if (Number.isFinite(num)) {
    return formatIDR(num);
  }
  return trimmed;
}

const ViewDetailPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const hasValidId = Boolean(id);
  const [data, setData] = useState<DetailPinjaman | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(hasValidId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasValidId || !id) return;

    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await apiClient.get<{ data?: DetailPinjaman }>(`/pinjaman/${id}`, {
          timeout: 3000,
        });
        if (!isMounted) return;
        if (response.data?.data?.id) {
          setData(response.data.data);
        } else {
          setError("Data pengajuan kredit tidak ditemukan.");
        }
      } catch {
        if (isMounted) {
          setError("Data pengajuan kredit tidak ditemukan atau gagal dimuat.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [hasValidId, id]);

  const effectiveLoading = hasValidId && isLoading;
  const effectiveError = !hasValidId ? "ID pengajuan kredit tidak ditemukan di URL." : error;

  if (effectiveLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col font-sans">
        <SubPageHeader title="Detail Pembiayaan" backUrl="/pengajuan-kredit" />
        <div className="flex-1 flex flex-col items-center justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (effectiveError || !data) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col font-sans">
        <SubPageHeader title="Detail Pembiayaan" backUrl="/pengajuan-kredit" />
        <div className="mx-auto max-w-md py-16 text-center space-y-3">
          <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">
            {effectiveError ?? "Data pengajuan kredit tidak ditemukan."}
          </p>
          <Link
            href="/pengajuan-kredit"
            className="inline-block rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
          >
            Kembali ke Daftar Pengajuan
          </Link>
        </div>
      </div>
    );
  }

  const d = data;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans antialiased">
      <SubPageHeader title="Rincian Pembiayaan Kendaraan" subtitle="Dokumen persetujuan dan rincian angsuran" backUrl="/pengajuan-kredit" />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Pinjaman */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-zinc-800">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                  <FiCreditCard className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">Skema Kredit</h3>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div>
                  <span className="text-slate-400">Angsuran Bulanan:</span>
                  <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                    {formatIDR(Number(d.angsuran) || 0)}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Tenor:</span>
                  <p className="font-semibold text-slate-700 dark:text-zinc-300">{d.tenor} Bulan</p>
                </div>
                <div>
                  <span className="text-slate-400">Uang Muka (DP):</span>
                  <p className="font-semibold text-slate-700 dark:text-zinc-300 font-mono">{formatIDR(Number(d.down_payment) || 0)}</p>
                </div>
                <div>
                  <span className="text-slate-400">Premi / Jenis Asuransi:</span>
                  <p className="font-semibold text-slate-700 dark:text-zinc-300 font-mono">{formatAsuransi(d.asuransi)}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              <FiCheckCircle className="h-4 w-4" />
              <span>Status: {d.status ?? "Disetujui"}</span>
            </div>
          </div>

          {/* Card 2: Konsumen */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <FiUser className="h-5 w-5" />
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
                <FiTruck className="h-5 w-5" />
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
                <p className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{formatIDR(Number(d.kendaraan.harga_kendaraan) || 0)}</p>
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
