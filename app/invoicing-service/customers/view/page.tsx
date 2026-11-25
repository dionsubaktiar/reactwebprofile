"use client";

import SubPageHeader from "@/app/components/SubPageHeader";
import apiClient from "@/app/lib/api";
import type { ApiResponse, Customer, Invoice, Unit } from "@/app/lib/types";
import { formatDateId, formatIDR } from "@/app/lib/format";
import StatusBadge from "../../_components/StatusBadge";
import KpiCard from "../../_components/KpiCard";
import Link from "next/link";
import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  FiArrowLeft,
  FiBriefcase,
  FiEdit2,
  FiMapPin,
  FiPhone,
  FiUser,
  FiTruck,
  FiFileText,
  FiAlertCircle,
  FiDollarSign,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

function CustomerDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const customerId = Number(id);

  const hasValidId = Boolean(id && Number.isFinite(customerId));
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(hasValidId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasValidId) return;
    let isMounted = true;
    const fetchDetail = async () => {
      try {
        const res = await apiClient.get(`/customer/${customerId}`, { timeout: 3500 });
        if (!isMounted) return;
        if (!res.data?.data) {
          setError("Pelanggan tidak ditemukan.");
          return;
        }
        setCustomer(res.data.data);

        // Unit & invoice milik customer ini (disaring client-side dari list).
        try {
          const unitRes = await apiClient.get<ApiResponse<Unit>>("/unit?per_page=100", { timeout: 3500 });
          if (isMounted) {
            setUnits((unitRes.data?.data?.data ?? []).filter((u) => u.id_customer === customerId));
          }
        } catch {
          if (isMounted) setUnits([]);
        }
        try {
          const invRes = await apiClient.get<ApiResponse<Invoice>>("/invoice?per_page=100", { timeout: 3500 });
          if (isMounted) {
            setInvoices((invRes.data?.data?.data ?? []).filter((inv) => inv.units?.id_customer === customerId));
          }
        } catch {
          if (isMounted) setInvoices([]);
        }
      } catch {
        if (isMounted) setError("Pelanggan tidak ditemukan.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchDetail();
    return () => {
      isMounted = false;
    };
  }, [customerId, hasValidId]);

  /**
   * Ringkasan per-customer (Hari 6): dihitung dari daftar invoice yang
   * dimuat di halaman ini (`/invoice?per_page=100`), bukan hardcode.
   * Tunggakan = total nilai invoice yang statusnya masih Pending.
   */
  const summary = useMemo(() => {
    const totalInvoice = invoices.length;
    const totalNilai = invoices.reduce((acc, inv) => acc + (inv.harga || 0), 0);
    const lunasCount = invoices.filter(
      (inv) => inv.status_invoice === "Lunas",
    ).length;
    const tunggakan = invoices
      .filter((inv) => inv.status_invoice === "Pending")
      .reduce((acc, inv) => acc + (inv.harga || 0), 0);
    return { totalInvoice, totalNilai, lunasCount, tunggakan };
  }, [invoices]);

  const effectiveLoading = hasValidId && isLoading;
  const effectiveError = !hasValidId ? "ID pelanggan tidak valid." : error;

  if (effectiveLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          Memuat detail pelanggan...
        </div>
      </main>
    );
  }

  if (effectiveError || !customer) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-2">
          <FiAlertCircle size={28} className="text-zinc-400" />
          <p className="font-semibold text-zinc-700 dark:text-zinc-300">{effectiveError ?? "Pelanggan tidak ditemukan."}</p>
          <Link
            href="/invoicing-service/customers"
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
          >
            <FiArrowLeft /> Kembali ke Daftar Pelanggan
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <Link
            href="/invoicing-service/customers"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors mb-2"
          >
            <FiArrowLeft /> Kembali ke Daftar Pelanggan
          </Link>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <FiBriefcase size={22} />
            </span>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{customer.nama_perusahaan}</h1>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Detail pelanggan, unit armada, dan invoice milik pelanggan ini.
          </p>
        </div>
        <Link
          href={`/invoicing-service/customers/edit?id=${customer.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
        >
          <FiEdit2 size={15} /> Edit Data Pelanggan
        </Link>
      </div>

      {/* Detail pelanggan */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Informasi Pelanggan</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <div>
            <dt className="text-xs font-medium text-zinc-500 flex items-center gap-1.5">
              <FiBriefcase /> Nama Perusahaan
            </dt>
            <dd className="font-semibold text-zinc-900 dark:text-white mt-1">{customer.nama_perusahaan}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500 flex items-center gap-1.5">
              <FiMapPin /> Alamat Operasional
            </dt>
            <dd className="text-zinc-700 dark:text-zinc-300 mt-1">{customer.alamat}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500 flex items-center gap-1.5">
              <FiUser /> Person In Charge (PIC)
            </dt>
            <dd className="font-semibold text-zinc-900 dark:text-white mt-1">{customer.pic}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500 flex items-center gap-1.5">
              <FiPhone /> Kontak
            </dt>
            <dd className="font-mono text-emerald-600 dark:text-emerald-400 mt-1">{customer.kontak}</dd>
          </div>
          {customer.created_at ? (
            <div>
              <dt className="text-xs font-medium text-zinc-500">Dibuat</dt>
              <dd className="text-zinc-700 dark:text-zinc-300 mt-1">{formatDateId(customer.created_at)}</dd>
            </div>
          ) : null}
          {customer.updated_at ? (
            <div>
              <dt className="text-xs font-medium text-zinc-500">Terakhir Diperbarui</dt>
              <dd className="text-zinc-700 dark:text-zinc-300 mt-1">{formatDateId(customer.updated_at)}</dd>
            </div>
          ) : null}
        </dl>
      </div>

      {/* Ringkasan invoice pelanggan (Hari 6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total Invoice"
          value={`${summary.totalInvoice} Faktur`}
          hint="Milik pelanggan ini"
          icon={<FiFileText />}
          accent="indigo"
        />
        <KpiCard
          label="Total Nilai"
          value={<span className="font-mono">{formatIDR(summary.totalNilai)}</span>}
          hint="Akumulasi seluruh invoice"
          icon={<FiDollarSign />}
          accent="emerald"
          coloredValue
        />
        <KpiCard
          label="Sudah Lunas"
          value={`${summary.lunasCount} Faktur`}
          hint="Pembayaran selesai"
          icon={<FiCheckCircle />}
          accent="sky"
          coloredValue
        />
        <KpiCard
          label="Tunggakan"
          value={<span className="font-mono">{formatIDR(summary.tunggakan)}</span>}
          hint="Invoice masih Pending"
          icon={<FiClock />}
          accent="amber"
          coloredValue
        />
      </div>
      <p className="-mt-4 text-xs text-zinc-400">
        Ringkasan dihitung dari invoice yang dimuat di halaman ini (maks. 100 invoice terbaru).
      </p>

      {/* Unit milik customer */}
      <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
          <FiTruck className="text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-base font-semibold">Unit Armada ({units.length})</h2>
        </div>
        {units.length === 0 ? (
          <p className="p-6 text-sm text-zinc-500">Belum ada unit yang terdaftar untuk pelanggan ini.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-950/80 text-zinc-600 dark:text-zinc-400 text-xs font-semibold">
                <tr>
                  <th className="px-6 py-3">No Polisi</th>
                  <th className="px-6 py-3">Tipe</th>
                  <th className="px-6 py-3">Driver</th>
                  <th className="px-6 py-3">Tahun</th>
                  <th className="px-6 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {units.map((unit) => (
                  <tr key={unit.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="px-6 py-3 font-mono font-semibold text-zinc-900 dark:text-white">{unit.nopol}</td>
                    <td className="px-6 py-3 text-zinc-700 dark:text-zinc-300">{unit.tipe}</td>
                    <td className="px-6 py-3 text-zinc-700 dark:text-zinc-300">{unit.driver}</td>
                    <td className="px-6 py-3 text-zinc-700 dark:text-zinc-300 tabular-nums">{unit.tahun}</td>
                    <td className="px-6 py-3 text-right">
                      <Link
                        href={`/invoicing-service/units/view?id=${unit.id}`}
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Lihat
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invoice milik customer */}
      <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
          <FiFileText className="text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-base font-semibold">Invoice ({invoices.length})</h2>
        </div>
        {invoices.length === 0 ? (
          <p className="p-6 text-sm text-zinc-500">Belum ada invoice untuk pelanggan ini.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-950/80 text-zinc-600 dark:text-zinc-400 text-xs font-semibold">
                <tr>
                  <th className="px-6 py-3">Invoice</th>
                  <th className="px-6 py-3">Tanggal</th>
                  <th className="px-6 py-3">Unit</th>
                  <th className="px-6 py-3">Status Invoice</th>
                  <th className="px-6 py-3">Status SPK</th>
                  <th className="px-6 py-3 text-right">Nilai</th>
                  <th className="px-6 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="px-6 py-3 font-mono font-semibold text-zinc-900 dark:text-white">
                      {inv.kode_invoice ?? `#${inv.id}`}
                    </td>
                    <td className="px-6 py-3 text-zinc-700 dark:text-zinc-300">
                      {inv.tanggal ? formatDateId(inv.tanggal) : "-"}
                    </td>
                    <td className="px-6 py-3 font-mono text-zinc-700 dark:text-zinc-300">{inv.units?.nopol ?? "-"}</td>
                    <td className="px-6 py-3">
                      <StatusBadge status={inv.status_invoice} />
                    </td>
                    <td className="px-6 py-3 text-zinc-700 dark:text-zinc-300">{inv.status_spk}</td>
                    <td className="px-6 py-3 text-right font-mono font-semibold tabular-nums text-zinc-900 dark:text-white">
                      {formatIDR(inv.harga || 0)}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <Link
                        href={`/invoicing-service/invoice/view?id=${inv.id}`}
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Lihat
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

export default function CustomerViewPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-16">
      <SubPageHeader title="Detail Pelanggan" />
      <Suspense
        fallback={
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <div className="p-16 text-center text-sm text-zinc-500">Memuat detail pelanggan...</div>
          </main>
        }
      >
        <CustomerDetail />
      </Suspense>
    </div>
  );
}
