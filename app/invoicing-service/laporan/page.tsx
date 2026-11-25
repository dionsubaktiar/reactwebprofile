"use client";

import Link from "next/link";
import Navbar from "../../components/navbar";
import { useEffect, useMemo, useState } from "react";
import apiClient from "@/app/lib/api";
import type {
  ApiResponse,
  Invoice,
  InvoiceStatus,
  SpkStatus,
} from "@/app/lib/types";
import { formatIDR, formatDateId } from "@/app/lib/format";
import {
  FiBarChart2,
  FiCheckCircle,
  FiDollarSign,
  FiEye,
  FiFileText,
  FiArrowLeft,
  FiAlertCircle,
} from "react-icons/fi";
import PageHeader from "../_components/PageHeader";
import KpiCard from "../_components/KpiCard";
import DataTable from "../_components/DataTable";
import StatusBadge from "../_components/StatusBadge";
import RowActions from "../_components/RowActions";
import {
  NAMA_BULAN,
  DEFAULT_LAPORAN_FILTER,
  availableYears,
  filterInvoicesByPeriod,
  summarizeInvoices,
  type LaporanBulan,
  type LaporanFilter,
  type LaporanTahun,
} from "@/app/lib/laporan";

const STATUS_INVOICE_OPTIONS: Array<InvoiceStatus | "semua"> = [
  "semua",
  "Lunas",
  "Pending",
];
const STATUS_SPK_OPTIONS: Array<SpkStatus | "semua"> = [
  "semua",
  "Selesai",
  "Dalam Pengerjaan",
  "Pending",
];

const selectClassName =
  "px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500";

/**
 * Laporan invoice per periode (Hari 8).
 *
 * Memuat SELURUH invoice dari mock API (loop halaman `per_page=100`)
 * lalu memfilter + menghitung KPI di client lewat `app/lib/laporan.ts`.
 * Bila API tidak bisa dijangkau, halaman menampilkan error + tombol coba
 * lagi — sengaja TIDAK memakai data demo fallback: laporan dengan angka
 * contoh akan menyesatkan bila dibaca sebagai laporan sungguhan.
 */
export default function LaporanPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  // Dipakai tombol "Coba lagi" untuk mengulang fetch tanpa reload halaman.
  const [reloadNonce, setReloadNonce] = useState(0);
  const [filter, setFilter] = useState<LaporanFilter>(DEFAULT_LAPORAN_FILTER);

  useEffect(() => {
    let isMounted = true;
    const fetchAllInvoices = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const all: Invoice[] = [];
        let page = 1;
        let lastPage = 1;
        do {
          const response = await apiClient.get<ApiResponse<Invoice>>(
            `/invoice?page=${page}&per_page=100`,
            { timeout: 3500 },
          );
          const paginated = response.data?.data;
          if (!paginated || !Array.isArray(paginated.data)) {
            throw new Error("Respons invoice tidak berbentuk paginasi");
          }
          all.push(...paginated.data);
          lastPage = paginated.last_page ?? 1;
          page += 1;
        } while (page <= lastPage);
        if (isMounted) setInvoices(all);
      } catch {
        if (isMounted) {
          setLoadError(
            "Gagal memuat data invoice dari API. Periksa server lalu coba lagi.",
          );
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchAllInvoices();
    return () => {
      isMounted = false;
    };
  }, [reloadNonce]);

  const tahunOptions = useMemo(() => {
    const years = availableYears(invoices);
    const tahunBerjalan = new Date().getFullYear();
    if (!years.includes(tahunBerjalan)) years.unshift(tahunBerjalan);
    return years;
  }, [invoices]);

  const filteredInvoices = useMemo(
    () => filterInvoicesByPeriod(invoices, filter),
    [invoices, filter],
  );
  const ringkasan = useMemo(
    () => summarizeInvoices(filteredInvoices),
    [filteredInvoices],
  );

  const labelPeriode =
    filter.bulan === "semua"
      ? `Tahun ${filter.tahun === "semua" ? "— semua tahun" : filter.tahun}`
      : `${NAMA_BULAN[(filter.bulan as number) - 1]} ${filter.tahun === "semua" ? "" : filter.tahun}`.trim();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-16">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <PageHeader
          icon={<FiBarChart2 size={22} />}
          title="Laporan Invoice"
          subtitle={`Ringkasan bisnis per periode — ${labelPeriode}. Semua angka dihitung dari data invoice yang difilter, bukan angka tetap.`}
          accent="indigo"
          above={
            <Link
              href="/invoicing-service"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline mb-2"
            >
              <FiArrowLeft size={13} /> Kembali ke Dashboard
            </Link>
          }
        />

        {/* Filter periode + status */}
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <label htmlFor="laporan-bulan" className="font-semibold">
              Bulan
            </label>
            <select
              id="laporan-bulan"
              value={String(filter.bulan)}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  bulan:
                    e.target.value === "semua"
                      ? "semua"
                      : (Number(e.target.value) as LaporanBulan),
                }))
              }
              className={selectClassName}
            >
              <option value="semua">Semua bulan</option>
              {NAMA_BULAN.map((nama, index) => (
                <option key={nama} value={index + 1}>
                  {nama}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <label htmlFor="laporan-tahun" className="font-semibold">
              Tahun
            </label>
            <select
              id="laporan-tahun"
              value={String(filter.tahun)}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  tahun:
                    e.target.value === "semua"
                      ? "semua"
                      : (Number(e.target.value) as LaporanTahun),
                }))
              }
              className={selectClassName}
            >
              <option value="semua">Semua tahun</option>
              {tahunOptions.map((tahun) => (
                <option key={tahun} value={tahun}>
                  {tahun}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <label htmlFor="laporan-status-invoice" className="font-semibold">
              Status Invoice
            </label>
            <select
              id="laporan-status-invoice"
              value={filter.statusInvoice}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  statusInvoice: e.target.value as InvoiceStatus | "semua",
                }))
              }
              className={selectClassName}
            >
              {STATUS_INVOICE_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status === "semua" ? "Semua status" : status}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <label htmlFor="laporan-status-spk" className="font-semibold">
              Status SPK
            </label>
            <select
              id="laporan-status-spk"
              value={filter.statusSpk}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  statusSpk: e.target.value as SpkStatus | "semua",
                }))
              }
              className={selectClassName}
            >
              {STATUS_SPK_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status === "semua" ? "Semua status" : status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loadError && !isLoading && (
          <div
            role="alert"
            className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-sm text-red-600 dark:text-red-400 flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <span className="flex items-center gap-2">
              <FiAlertCircle size={16} /> {loadError}
            </span>
            <button
              onClick={() => setReloadNonce((n) => n + 1)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Coba lagi
            </button>
          </div>
        )}

        {/* KPI periode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            label="Jumlah Invoice"
            value={`${ringkasan.jumlah} Faktur`}
            hint={`pada ${labelPeriode}`}
            icon={<FiFileText />}
            accent="indigo"
          />
          <KpiCard
            label="Total Nilai"
            value={formatIDR(ringkasan.totalNilai)}
            hint="akumulasi harga invoice periode ini"
            icon={<FiDollarSign />}
            accent="emerald"
            coloredValue
          />
          <KpiCard
            label="Lunas"
            value={`${ringkasan.lunas} Faktur`}
            hint={`${ringkasan.pending} pending`}
            icon={<FiCheckCircle />}
            accent="sky"
          />
          <KpiCard
            label="Rata-rata Nilai Invoice"
            value={formatIDR(Math.round(ringkasan.rataRata))}
            hint="per invoice pada periode ini"
            icon={<FiBarChart2 />}
            accent="amber"
          />
        </div>

        {/* Rincian SPK periode ini */}
        <p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-4">
          SPK periode ini — Selesai:{" "}
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            {ringkasan.spkSelesai}
          </span>
          {" · "}Dalam Pengerjaan:{" "}
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            {ringkasan.spkDalamPengerjaan}
          </span>
          {" · "}Pending:{" "}
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            {ringkasan.spkPending}
          </span>
        </p>

        {/* Daftar invoice pada periode terpilih */}
        <DataTable
          isLoading={isLoading}
          loadingText="Memuat laporan invoice..."
          isEmpty={!isLoading && filteredInvoices.length === 0}
          emptyTitle="Tidak ada invoice pada periode ini."
          emptyHint="Coba ubah bulan, tahun, atau filter status di atas."
          footer={
            <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span className="text-xs text-zinc-500">
                Menampilkan {filteredInvoices.length} dari {invoices.length}{" "}
                invoice yang dimuat
              </span>
              <span className="text-[11px] text-zinc-400">
                Data dari mock store in-memory — angka berubah bila server
                di-restart atau invoice dibuat/dihapus.
              </span>
            </div>
          }
        >
          <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-left text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-950/80 text-zinc-600 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Nopol / Armada</th>
                <th className="px-6 py-4">Pelanggan</th>
                <th className="px-6 py-4">Paket</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {filteredInvoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                    {formatDateId(inv.tanggal)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-extrabold text-zinc-900 dark:text-white font-mono">
                      {inv.units?.nopol || `UNIT-${inv.id}`}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {inv.units?.tipe || "Truk Angkut"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-zinc-900 dark:text-zinc-200 line-clamp-1">
                      {inv.units?.customers?.nama_perusahaan || "Customer Umum"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {inv.packages?.kode_packages || "ADHOC REPAIR"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-zinc-900 dark:text-white">
                    {formatIDR(inv.harga || 0)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1 items-start">
                      <StatusBadge status={inv.status_invoice || "Pending"} />
                      <span className="text-[10px] text-zinc-400">
                        SPK: {inv.status_spk || "Pending"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-xs relative">
                    <RowActions
                      label={`Aksi untuk invoice #${inv.id}`}
                      items={[
                        {
                          label: "Lihat Detail",
                          icon: <FiEye size={13} />,
                          href: `/invoicing-service/invoice/view?id=${inv.id}`,
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      </main>
    </div>
  );
}
