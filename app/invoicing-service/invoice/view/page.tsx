"use client";

import Navbar from "@/app/components/navbar";
import apiClient from "@/app/lib/api";
import type { Invoice } from "@/app/lib/types";
import { formatDateId, formatIDR, formatKm } from "@/app/lib/format";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiFileText,
  FiEdit2,
  FiAlertCircle,
  FiTruck,
  FiBriefcase,
  FiPackage,
} from "react-icons/fi";
import StatusBadge from "../../_components/StatusBadge";

const ViewInvoicePage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("ID invoice tidak valid.");
      setIsLoading(false);
      return;
    }
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/invoice/${id}`, { timeout: 3500 });
        if (!isMounted) return;
        if (!response.data?.data) {
          setError("Invoice tidak ditemukan.");
          return;
        }
        setInvoice(response.data.data);
      } catch {
        if (isMounted) setError("Invoice tidak ditemukan.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading)
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          Memuat detail invoice...
        </div>
      </main>
    );

  if (error || !invoice)
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-2">
          <FiAlertCircle size={28} className="text-zinc-400" />
          <p className="font-semibold text-zinc-700 dark:text-zinc-300">
            {error ?? "Invoice tidak ditemukan."}
          </p>
          <Link
            href="/invoicing-service"
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition"
          >
            <FiArrowLeft /> Kembali ke Hub Invoicing
          </Link>
        </div>
      </main>
    );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <Link
            href="/invoicing-service"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition mb-2"
          >
            <FiArrowLeft /> Kembali ke Hub Invoicing
          </Link>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <FiFileText size={22} />
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {invoice.kode_invoice ?? `Invoice #${invoice.id}`}
            </h1>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Detail invoice, unit, pelanggan, dan rincian part/paket servis.
          </p>
        </div>
        <Link href={`/invoicing-service/invoice/edit?id=${invoice.id}`}>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-sky-600 hover:bg-sky-700 text-white transition shadow-sm">
            <FiEdit2 size={15} /> Edit Invoice
          </button>
        </Link>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Detail Invoice</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Kilometer</dt>
            <dd className="font-mono font-semibold text-zinc-900 dark:text-white mt-1">
              {formatKm(invoice.kilometer || 0)} KM
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Tanggal</dt>
            <dd className="text-zinc-700 dark:text-zinc-300 mt-1">
              {invoice.tanggal ? formatDateId(invoice.tanggal) : "-"}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Harga</dt>
            <dd className="font-mono font-bold text-zinc-900 dark:text-white mt-1">
              {formatIDR(invoice.harga || 0)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Status Invoice</dt>
            <dd className="mt-1">
              <StatusBadge status={invoice.status_invoice} />
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Status SPK</dt>
            <dd className="mt-1">
              <StatusBadge status={invoice.status_spk} />
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Paket Servis</dt>
            <dd className="font-semibold text-zinc-900 dark:text-white mt-1">
              {invoice.packages?.kode_packages ?? "ADHOC REPAIR"}
            </dd>
          </div>
        </dl>
      </div>

      {invoice.units && (
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FiTruck className="text-indigo-600 dark:text-indigo-400" /> Informasi Unit
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div>
              <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">No Polisi</dt>
              <dd className="font-mono font-semibold text-zinc-900 dark:text-white mt-1">
                {invoice.units.nopol}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Tipe</dt>
              <dd className="text-zinc-700 dark:text-zinc-300 mt-1">{invoice.units.tipe}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Driver</dt>
              <dd className="text-zinc-700 dark:text-zinc-300 mt-1">{invoice.units.driver || "-"}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Tahun</dt>
              <dd className="font-mono text-zinc-700 dark:text-zinc-300 mt-1">{invoice.units.tahun}</dd>
            </div>
          </dl>
        </div>
      )}

      {invoice.units?.customers && (
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FiBriefcase className="text-indigo-600 dark:text-indigo-400" /> Informasi Customer
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div>
              <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Nama Perusahaan</dt>
              <dd className="font-semibold text-zinc-900 dark:text-white mt-1">
                {invoice.units.customers.nama_perusahaan}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">PIC</dt>
              <dd className="text-zinc-700 dark:text-zinc-300 mt-1">{invoice.units.customers.pic}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Alamat</dt>
              <dd className="text-zinc-700 dark:text-zinc-300 mt-1">{invoice.units.customers.alamat}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Kontak</dt>
              <dd className="font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                {invoice.units.customers.kontak}
              </dd>
            </div>
          </dl>
        </div>
      )}

      {invoice.parts && invoice.parts.length > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FiPackage className="text-indigo-600 dark:text-indigo-400" /> Rincian Part
          </h2>
          <div className="space-y-2">
            {invoice.parts.map((part) => (
              <div
                key={part.id_part}
                className="flex items-center justify-between gap-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
              >
                <p className="font-semibold text-sm text-zinc-900 dark:text-white">
                  {part.name ?? `Part #${part.id_part}`}
                  {part.quantity ? (
                    <span className="text-zinc-500 font-normal"> × {part.quantity}</span>
                  ) : null}
                </p>
                <p className="font-mono font-bold text-sm text-zinc-900 dark:text-white">
                  {formatIDR(part.total_price ?? 0)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {invoice.package_items && invoice.package_items.length > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FiPackage className="text-indigo-600 dark:text-indigo-400" /> Rincian Paket
          </h2>
          <div className="space-y-2">
            {invoice.package_items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
              >
                <p className="font-semibold text-sm text-zinc-900 dark:text-white">{item.sparepart}</p>
                <p className="font-mono font-bold text-sm text-zinc-900 dark:text-white">
                  {formatIDR((item.harga_part || 0) + (item.harga_jasa || 0))}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

const SuspenseInvoiceEditPage = () => (
  <Suspense
    fallback={
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-16 text-center text-sm text-zinc-500">Memuat detail invoice...</div>
      </main>
    }
  >
    <ViewInvoicePage />
  </Suspense>
);

export default function InvoiceViewPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-16">
      <Navbar title="Invoice Detail" />
      <SuspenseInvoiceEditPage />
    </div>
  );
}
