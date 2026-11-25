"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import { useEffect, useState, useMemo } from "react";
import apiClient from "@/app/lib/api";
import type {
  Invoice,
  InvoiceStatus,
  SpkStatus,
  Pagination as PaginationType,
  ApiResponse,
} from "@/app/lib/types";
import {
  nextInvoiceStatus,
  nextSpkStatus,
} from "@/app/lib/invoice-status";
import { formatIDR, formatDateId, formatKm } from "@/app/lib/format";
import {
  FiFileText,
  FiTruck,
  FiUsers,
  FiTool,
  FiBarChart2,
  FiPlus,
  FiActivity,
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiPlay,
} from "react-icons/fi";
import DataTable from "./_components/DataTable";
import KpiCard from "./_components/KpiCard";
import PageHeader from "./_components/PageHeader";
import PaginationControls from "./_components/Pagination";
import RowActions from "./_components/RowActions";
import SearchBar from "./_components/SearchBar";
import ConfirmDialog from "@/app/components/ConfirmDialog";
import StatusBadge from "./_components/StatusBadge";

// Fallback high-fidelity sample data to guarantee clean rendering if remote API is offline
const FALLBACK_INVOICES: Invoice[] = [
  {
    id: 101,
    kilometer: 45200,
    tanggal: "2026-11-15",
    harga: 3850000,
    id_package: 1,
    status_invoice: "Lunas",
    status_spk: "Selesai",
    units: {
      id: 1,
      nopol: "B 9182 UXZ",
      tipe: "Hino Dutro 130 HD",
      driver: "Bambang Sudiro",
      tahun: "2022",
      id_customer: 10,
      customers: {
        id: 10,
        nama_perusahaan: "PT Nusantara Logistik Prima",
        alamat: "Kawasan Industri MM2100, Cikarang",
        pic: "Hendro Wibowo",
        kontak: "081234567890",
        created_at: "2024-01-10",
        updated_at: "2026-10-01"
      }
    },
    packages: { id: 1, kode_packages: "PKG-HEAVY-01" }
  },
  {
    id: 102,
    kilometer: 88150,
    tanggal: "2026-11-14",
    harga: 2150000,
    id_package: 2,
    status_invoice: "Pending",
    status_spk: "Selesai",
    units: {
      id: 2,
      nopol: "B 9410 TXM",
      tipe: "Isuzu Giga FVR",
      driver: "Dedi Supriyadi",
      tahun: "2021",
      id_customer: 12,
      customers: {
        id: 12,
        nama_perusahaan: "CV Berkah Mandiri Express",
        alamat: "Jl. Margomulyo Indah No. 45, Surabaya",
        pic: "Rudi Hartono",
        kontak: "081987654321",
        created_at: "2024-03-12",
        updated_at: "2026-09-15"
      }
    },
    packages: { id: 2, kode_packages: "PKG-MEDIUM-02" }
  },
  {
    id: 103,
    kilometer: 124300,
    tanggal: "2026-11-12",
    harga: 5400000,
    id_package: 0,
    status_invoice: "Pending",
    status_spk: "Pending",
    units: {
      id: 3,
      nopol: "L 8821 OK",
      tipe: "Mitsubishi Fuso Fighter",
      driver: "Agus Pratama",
      tahun: "2020",
      id_customer: 14,
      customers: {
        id: 14,
        nama_perusahaan: "PT Global Sentosa Trans",
        alamat: "Pelabuhan Tanjung Perak, Surabaya",
        pic: "Siti Rahma",
        kontak: "082133445566",
        created_at: "2023-11-05",
        updated_at: "2026-11-01"
      }
    },
    packages: { id: 0, kode_packages: null }
  },
  {
    id: 104,
    kilometer: 31200,
    tanggal: "2026-11-10",
    harga: 1650000,
    id_package: 3,
    status_invoice: "Lunas",
    status_spk: "Selesai",
    units: {
      id: 4,
      nopol: "B 9011 KLP",
      tipe: "Toyota Dyna 110 ET",
      driver: "Joko Susilo",
      tahun: "2023",
      id_customer: 10,
      customers: {
        id: 10,
        nama_perusahaan: "PT Nusantara Logistik Prima",
        alamat: "Kawasan Industri MM2100, Cikarang",
        pic: "Hendro Wibowo",
        kontak: "081234567890",
        created_at: "2024-01-10",
        updated_at: "2026-10-01"
      }
    },
    packages: { id: 3, kode_packages: "PKG-LIGHT-03" }
  }
];

const MainPageInvoice = () => {
  const [invoice, setInvoice] = useState<Invoice[]>(FALLBACK_INVOICES);
  const [pagination, setPagination] = useState<PaginationType | null>({
    current_page: 1,
    last_page: 1,
    prev_page_url: null,
    next_page_url: null
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dataSource, setDataSource] = useState<"api" | "demo">("demo");
  const [deleteTarget, setDeleteTarget] = useState<Invoice | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  // Status workflow (Hari 6): id invoice yang sedang diubah statusnya.
  const [statusBusyId, setStatusBusyId] = useState<number | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async (page = 1) => {
      setIsLoading(true);
      try {
        const response = await apiClient.get<ApiResponse<Invoice>>(
          `/invoice?page=${page}`,
          { timeout: 3500 }
        );
        if (isMounted && response.data?.data?.data && response.data.data.data.length > 0) {
          setInvoice(response.data.data.data);
          setPagination(response.data.data);
          setDataSource("api");
        }
      } catch (error) {
        // Fallback to rich structured data gracefully without crashing or showing blank page
        if (isMounted) {
          setDataSource("demo");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setCurrentPage(page);
        }
      }
    };

    fetchData(currentPage);
    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await apiClient.delete(`/invoice/${deleteTarget.id}`);
      setInvoice((prev) => prev.filter((inv) => inv.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (error) {
      console.error("Error deleting invoice:", error);
      // Rollback: invoice tetap di list, tampilkan error yang terlihat.
      setDeleteError(
        `Gagal menghapus Invoice #${deleteTarget.id}. Data tidak dihapus, coba lagi.`
      );
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Ubah status invoice/SPK satu langkah mengikuti alur Hari 6
   * (Pending → Lunas; Pending → Dalam Pengerjaan → Selesai). Hanya
   * mengirim field status — PUT di mock route memvalidasi transisinya
   * dan menolak (400) bila tidak valid. Bila gagal, status di list
   * tidak berubah dan muncul pesan error yang terlihat.
   */
  const changeStatus = async (
    inv: Invoice,
    patch: { status_invoice?: InvoiceStatus; status_spk?: SpkStatus },
  ) => {
    setStatusBusyId(inv.id);
    setStatusError(null);
    try {
      const response = await apiClient.put(`/invoice/${inv.id}`, patch);
      const updated = response.data?.data as Invoice | undefined;
      setInvoice((prev) =>
        prev.map((item) =>
          item.id === inv.id ? { ...item, ...(updated ?? patch) } : item,
        ),
      );
    } catch {
      // Rollback: status di list tidak berubah, tampilkan error.
      setStatusError(
        `Gagal mengubah status Invoice #${inv.id}. Status tidak berubah, coba lagi.`,
      );
    } finally {
      setStatusBusyId(null);
    }
  };

  // Filtered dataset for desktop search and filter
  const filteredInvoices = useMemo(() => {
    return invoice.filter(inv => {
      const matchSearch = 
        (inv.units?.nopol || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inv.units?.customers?.nama_perusahaan || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inv.units?.driver || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inv.packages?.kode_packages || "ADHOC").toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchStatus = true;
      if (statusFilter === "Lunas") matchStatus = inv.status_invoice === "Lunas";
      else if (statusFilter === "Pending") matchStatus = inv.status_invoice === "Pending";
      else if (statusFilter === "SPK Pending") matchStatus = inv.status_spk === "Pending";

      return matchSearch && matchStatus;
    });
  }, [invoice, searchQuery, statusFilter]);

  // Statistics KPIs
  const stats = useMemo(() => {
    const totalCount = invoice.length;
    const totalRevenue = invoice.reduce((acc, curr) => acc + (curr.harga || 0), 0);
    const pendingCount = invoice.filter(i => i.status_invoice === "Pending" || i.status_spk === "Pending").length;
    const lunasCount = invoice.filter(i => i.status_invoice === "Lunas").length;
    return { totalCount, totalRevenue, pendingCount, lunasCount };
  }, [invoice]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-16">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <PageHeader
          icon={<FiFileText size={22} />}
          title="Invoicing & Armada Service Hub"
          subtitle="Manajemen penerbitan invoice perbaikan armada, surat perintah kerja (SPK), dan riwayat servis pelanggan."
          accent="indigo"
          actions={
            <>
              <Link
                href="/invoicing-service/units"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm"
              >
                <FiTruck className="text-indigo-500" /> Unit
              </Link>
              <Link
                href="/invoicing-service/customers"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm"
              >
                <FiUsers className="text-indigo-500" /> Pelanggan
              </Link>
              <Link
                href="/invoicing-service/parts"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm"
              >
                <FiTool className="text-indigo-500" /> Part
              </Link>
              <Link
                href="/invoicing-service/laporan"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm"
              >
                <FiBarChart2 className="text-indigo-500" /> Laporan
              </Link>
              <Link
                href="/invoicing-service/invoice/create"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
              >
                <FiPlus size={15} /> Buat Invoice Baru
              </Link>
            </>
          }
        />

        {/* 4-Column Responsive KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            label="Total Invoice"
            value={`${stats.totalCount} Faktur`}
            hint="Tercatat dalam sistem"
            icon={<FiFileText />}
            accent="indigo"
          />
          <KpiCard
            label="Estimasi Omzet"
            value={<span className="font-mono">{formatIDR(stats.totalRevenue)}</span>}
            hint="Akumulasi seluruh SPK"
            icon={<FiDollarSign />}
            accent="emerald"
            coloredValue
          />
          <KpiCard
            label="Status Lunas"
            value={`${stats.lunasCount} Faktur`}
            hint="Pembayaran selesai"
            icon={<FiCheckCircle />}
            accent="sky"
            coloredValue
          />
          <KpiCard
            label="Perlu Tindakan"
            value={`${stats.pendingCount} Pending`}
            hint="SPK atau Invoice tertunda"
            icon={<FiClock />}
            accent="amber"
            coloredValue
          />
        </div>

        {/* Filter and Search Bar (Desktop-First) */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari berdasarkan nopol kendaraan, nama perusahaan customer, atau kode paket..."
          accent="indigo"
        >
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">Semua Status</option>
              <option value="Lunas">Lunas</option>
              <option value="Pending">Invoice Pending</option>
              <option value="SPK Pending">SPK Pending</option>
            </select>
          </div>

          {dataSource === "demo" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              <FiActivity /> Demo Fallback
            </span>
          )}
        </SearchBar>

        {deleteError && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-sm text-red-600 dark:text-red-400">
            {deleteError}
          </div>
        )}

        {statusError && (
          <div
            role="alert"
            className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-sm text-red-600 dark:text-red-400"
          >
            {statusError}
          </div>
        )}

        <DataTable
          isLoading={isLoading}
          loadingText="Memuat data invoice armada..."
          isEmpty={filteredInvoices.length === 0}
          emptyTitle="Tidak ada data invoice yang sesuai kriteria."
          emptyHint="Coba sesuaikan kata kunci pencarian atau ubah filter status."
          accent="indigo"
          footer={
            <PaginationControls
              currentPage={currentPage}
              hasNext={!!pagination?.next_page_url}
              onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
              onNext={() => setCurrentPage((p) => p + 1)}
              summary={
                <>Menampilkan {filteredInvoices.length} dari {invoice.length} entri invoice aktif</>
              }
            />
          }
        >
          <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-left text-sm">
                <thead className="bg-zinc-50 dark:bg-zinc-950/80 text-zinc-600 dark:text-zinc-400 text-xs font-semibold">
                  <tr>
                    <th className="px-6 py-4">Nomor Polisi / Armada</th>
                    <th className="px-6 py-4">Tanggal SPK</th>
                    <th className="px-6 py-4">Pelanggan / Perusahaan</th>
                    <th className="px-6 py-4">Paket Servis</th>
                    <th className="px-6 py-4">Total Biaya</th>
                    <th className="px-6 py-4">Status Invoice</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredInvoices.map((inv) => {
                    return (
                      <tr 
                        key={inv.id} 
                        className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300 font-semibold text-xs">
                              <FiTruck size={16} />
                            </div>
                            <div>
                              <div className="font-semibold text-zinc-900 dark:text-white font-mono">
                                {inv.units?.nopol || `UNIT-${inv.id}`}
                              </div>
                              <div className="text-xs text-zinc-500">
                                {inv.units?.tipe || "Truk Angkut"} &bull; {inv.units?.driver || "Driver"}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-xs text-zinc-600 dark:text-zinc-400 font-mono tabular-nums">
                          {formatDateId(inv.tanggal)}
                          <div className="text-xs text-zinc-400 tabular-nums">
                            {formatKm(inv.kilometer || 0)} Km
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-semibold text-zinc-900 dark:text-zinc-200 line-clamp-1">
                            {inv.units?.customers?.nama_perusahaan || "Customer Umum"}
                          </div>
                          <div className="text-xs text-zinc-500 line-clamp-1">
                            PIC: {inv.units?.customers?.pic || "-"}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                            {inv.packages?.kode_packages || "ADHOC REPAIR"}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap font-mono font-semibold tabular-nums text-zinc-900 dark:text-white">
                          {formatIDR(inv.harga || 0)}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col gap-1 items-start">
                            <StatusBadge status={inv.status_invoice || "Pending"} />
                            <span className="text-xs text-zinc-400">
                              SPK: {inv.status_spk || "Pending"}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-xs relative">
                          <RowActions
                            label={`Aksi untuk invoice #${inv.id}`}
                            items={[
                              {
                                label: "Tinjau SPK & Invoice",
                                icon: <FiEye size={13} />,
                                href: `/invoicing-service/invoice/view?id=${inv.id}`,
                              },
                              {
                                label: "Edit Data",
                                icon: <FiEdit2 size={13} />,
                                href: `/invoicing-service/invoice/edit?id=${inv.id}`,
                              },
                              // Aksi status (Hari 6): hanya transisi
                              // berikutnya yang diizinkan yang ditampilkan.
                              ...(nextInvoiceStatus(
                                inv.status_invoice || "Pending",
                              ) === "Lunas"
                                ? [
                                    {
                                      label:
                                        statusBusyId === inv.id
                                          ? "Memproses..."
                                          : "Tandai Lunas",
                                      icon: <FiCheckCircle size={13} />,
                                      onClick: () =>
                                        changeStatus(inv, {
                                          status_invoice: "Lunas",
                                        }),
                                    },
                                  ]
                                : []),
                              ...(nextSpkStatus(
                                inv.status_spk || "Pending",
                              ) === "Dalam Pengerjaan"
                                ? [
                                    {
                                      label:
                                        statusBusyId === inv.id
                                          ? "Memproses..."
                                          : "Mulai Pengerjaan SPK",
                                      icon: <FiPlay size={13} />,
                                      onClick: () =>
                                        changeStatus(inv, {
                                          status_spk: "Dalam Pengerjaan",
                                        }),
                                    },
                                  ]
                                : []),
                              ...(nextSpkStatus(
                                inv.status_spk || "Pending",
                              ) === "Selesai"
                                ? [
                                    {
                                      label:
                                        statusBusyId === inv.id
                                          ? "Memproses..."
                                          : "Selesaikan SPK",
                                      icon: <FiCheckCircle size={13} />,
                                      onClick: () =>
                                        changeStatus(inv, {
                                          status_spk: "Selesai",
                                        }),
                                    },
                                  ]
                                : []),
                              {
                                label: "Hapus Faktur",
                                icon: <FiTrash2 size={13} />,
                                danger: true,
                                onClick: () => setDeleteTarget(inv),
                              },
                            ]}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
        </DataTable>
      </main>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Hapus Invoice"
        message={
          deleteTarget
            ? `Yakin ingin menghapus Invoice #${deleteTarget.id}? Tindakan ini tidak bisa dibatalkan.`
            : ""
        }
        confirmLabel="Hapus"
        isBusy={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default MainPageInvoice;
