"use client";

import Navbar from "@/app/components/navbar";
import apiClient from "@/app/lib/api";
import type { Unit } from "@/app/lib/types";
import { formatDateId } from "@/app/lib/format";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FiArrowLeft,
  FiTruck,
  FiEdit2,
  FiAlertCircle,
  FiBriefcase,
  FiMapPin,
  FiUser,
  FiPhone,
} from "react-icons/fi";

const UnitDetailPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [unit, setUnit] = useState<Unit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("ID unit tidak valid.");
      setIsLoading(false);
      return;
    }
    let isMounted = true;
    const fetchUnitDetail = async () => {
      try {
        const response = await apiClient.get(`/unit/${id}`, { timeout: 3500 });
        if (!isMounted) return;
        if (!response.data?.data) {
          setError("Unit tidak ditemukan.");
          return;
        }
        setUnit(response.data.data);
      } catch {
        if (isMounted) setError("Unit tidak ditemukan.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchUnitDetail();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          Memuat detail unit...
        </div>
      </main>
    );
  }

  if (error || !unit) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-2">
          <FiAlertCircle size={28} className="text-zinc-400" />
          <p className="font-semibold text-zinc-700 dark:text-zinc-300">
            {error ?? "Unit tidak ditemukan."}
          </p>
          <Link
            href="/invoicing-service/units"
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition"
          >
            <FiArrowLeft /> Kembali ke Daftar Unit
          </Link>
        </div>
      </main>
    );
  }

  const jatuhTempo: { label: string; value?: string | null }[] = [
    { label: "KIR", value: unit.japo_kir },
    { label: "Pajak", value: unit.japo_pajak },
    { label: "STNK", value: unit.japo_stnk },
    { label: "Kontrak", value: unit.japo_kontrak },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <Link
            href="/invoicing-service/units"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition mb-2"
          >
            <FiArrowLeft /> Kembali ke Daftar Unit
          </Link>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <FiTruck size={22} />
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-mono">
              {unit.nopol}
            </h1>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Detail unit armada, jatuh tempo surat-surat, dan data pemilik.
          </p>
        </div>
        <Link href={`/invoicing-service/units/edit?id=${unit.id}`}>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-sky-600 hover:bg-sky-700 text-white transition shadow-sm">
            <FiEdit2 size={15} /> Edit Unit
          </button>
        </Link>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Informasi Unit</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">No Polisi</dt>
            <dd className="font-mono font-semibold text-zinc-900 dark:text-white mt-1">{unit.nopol}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Tipe</dt>
            <dd className="font-semibold text-zinc-900 dark:text-white mt-1">{unit.tipe}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">No Rangka</dt>
            <dd className="text-zinc-700 dark:text-zinc-300 mt-1">{unit.no_rangka ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">No Mesin</dt>
            <dd className="text-zinc-700 dark:text-zinc-300 mt-1">{unit.no_mesin ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Driver</dt>
            <dd className="font-semibold text-zinc-900 dark:text-white mt-1">{unit.driver || "-"}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Tahun</dt>
            <dd className="font-mono text-zinc-700 dark:text-zinc-300 mt-1">{unit.tahun}</dd>
          </div>
          {jatuhTempo.map((item) => (
            <div key={item.label}>
              <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Jatuh Tempo {item.label}
              </dt>
              <dd className="text-zinc-700 dark:text-zinc-300 mt-1">
                {item.value ? formatDateId(item.value) : "-"}
              </dd>
            </div>
          ))}
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</dt>
            <dd className="mt-1">
              <span
                className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                  unit.status == 1
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                {unit.status == 1 ? "Terdaftar" : "Tidak Terdaftar"}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Informasi Customer</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <FiBriefcase /> Nama Perusahaan
            </dt>
            <dd className="font-semibold text-zinc-900 dark:text-white mt-1">
              {unit.customers?.nama_perusahaan ?? "-"}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <FiMapPin /> Alamat
            </dt>
            <dd className="text-zinc-700 dark:text-zinc-300 mt-1">{unit.customers?.alamat ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <FiUser /> PIC
            </dt>
            <dd className="font-semibold text-zinc-900 dark:text-white mt-1">{unit.customers?.pic ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <FiPhone /> Kontak
            </dt>
            <dd className="font-mono text-emerald-600 dark:text-emerald-400 mt-1">
              {unit.customers?.kontak ?? "-"}
            </dd>
          </div>
        </dl>
      </div>
    </main>
  );
};

const SuspenseEditViewPage = () => (
  <Suspense
    fallback={
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-16 text-center text-sm text-zinc-500">Memuat detail unit...</div>
      </main>
    }
  >
    <UnitDetailPage />
  </Suspense>
);

export default function UnitViewPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-16">
      <Navbar title="Unit Detail" />
      <SuspenseEditViewPage />
    </div>
  );
}
