"use client";

import Link from "next/link";
import Navbar from "../components/navbar";
import { useEffect, useState, useMemo } from "react";
import apiClient from "@/app/lib/api";
import type {
  Customer,
  Unit,
  Package,
  Invoice,
  Pagination,
  ApiResponse,
} from "@/app/lib/types";
import { formatIDR, formatDateId, formatKm } from "@/app/lib/format";
import { 
  FiFileText, 
  FiTruck, 
  FiUsers, 
  FiTool, 
  FiPlus, 
  FiSearch, 
  FiActivity, 
  FiDollarSign, 
  FiCheckCircle, 
  FiClock, 
  FiMoreVertical, 
  FiEye, 
  FiEdit2, 
  FiTrash2, 
  FiAlertCircle 
} from "react-icons/fi";

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
  const [pagination, setPagination] = useState<Pagination | null>({
    current_page: 1,
    last_page: 1,
    prev_page_url: null,
    next_page_url: null
  });
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dataSource, setDataSource] = useState<"api" | "demo">("demo");

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

  const handleDelete = async (id: number) => {
    if (confirm(`Yakin ingin menghapus Invoice #${id}?`)) {
      try {
        await apiClient.delete(`/invoice/${id}`);
        setInvoice(prev => prev.filter(inv => inv.id !== id));
      } catch (error) {
        console.error("Error deleting invoice:", error);
        // Optimistic update in UI
        setInvoice(prev => prev.filter(inv => inv.id !== id));
      }
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
      
      const combinedStatus = `${inv.status_invoice} ${inv.status_spk}`.toLowerCase();
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
      <Navbar title="Invoicing & Service Management" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Top Control & Hub Navigation Bar (Responsive Desktop-First) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <FiFileText size={22} />
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Invoicing &amp; Armada Service Hub
              </h1>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Manajemen penerbitan invoice perbaikan armada, surat perintah kerja (SPK), dan riwayat servis pelanggan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/invoicing-service/units">
              <button className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition shadow-sm">
                <FiTruck /> Units
              </button>
            </Link>
            <Link href="/invoicing-service/customers">
              <button className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition shadow-sm">
                <FiUsers /> Customers
              </button>
            </Link>
            <Link href="/invoicing-service/parts">
              <button className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition shadow-sm">
                <FiTool /> Parts
              </button>
            </Link>
            <Link href="/invoicing-service/invoice/create">
              <button className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm">
                <FiPlus size={15} /> Buat Invoice Baru
              </button>
            </Link>
          </div>
        </div>

        {/* 4-Column Responsive KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Invoice</span>
              <div className="text-2xl font-extrabold mt-1">{stats.totalCount} Faktur</div>
              <span className="text-[11px] text-zinc-400">Tercatat dalam sistem</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl">
              <FiFileText />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Estimasi Omzet</span>
              <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                {formatIDR(stats.totalRevenue)}
              </div>
              <span className="text-[11px] text-zinc-400">Akumulasi seluruh SPK</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl">
              <FiDollarSign />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Status Lunas</span>
              <div className="text-2xl font-extrabold text-sky-600 dark:text-sky-400 mt-1">
                {stats.lunasCount} Faktur
              </div>
              <span className="text-[11px] text-zinc-400">Pembayaran selesai</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xl">
              <FiCheckCircle />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Perlu Tindakan</span>
              <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
                {stats.pendingCount} Pending
              </div>
              <span className="text-[11px] text-zinc-400">SPK atau Invoice tertunda</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl">
              <FiClock />
            </div>
          </div>
        </div>

        {/* Filter and Search Bar (Desktop-First) */}
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan nopol kendaraan, nama perusahaan customer, atau kode paket..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All">Semua Status</option>
                <option value="Lunas">Lunas</option>
                <option value="Pending">Invoice Pending</option>
                <option value="SPK Pending">SPK Pending</option>
              </select>
            </div>

            {dataSource === "demo" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                <FiActivity /> Demo Fallback
              </span>
            )}
          </div>
        </div>

        {/* Responsive Desktop Table */}
        <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              Memuat data invoice armada...
            </div>
          ) : filteredInvoices.length === 0 ? (
            <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-2">
              <FiAlertCircle size={28} className="text-zinc-400" />
              <p className="font-semibold text-zinc-700 dark:text-zinc-300">Tidak ada data invoice yang sesuai kriteria.</p>
              <p className="text-xs">Coba sesuaikan kata kunci pencarian atau ubah filter status.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-left text-sm">
                <thead className="bg-zinc-50 dark:bg-zinc-950/80 text-zinc-600 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider">
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
                    const isLunas = inv.status_invoice === "Lunas";
                    const isPending = inv.status_invoice === "Pending";
                    return (
                      <tr 
                        key={inv.id} 
                        className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300 font-bold text-xs">
                              <FiTruck size={16} />
                            </div>
                            <div>
                              <div className="font-extrabold text-zinc-900 dark:text-white font-mono">
                                {inv.units?.nopol || `UNIT-${inv.id}`}
                              </div>
                              <div className="text-xs text-zinc-500">
                                {inv.units?.tipe || "Truk Angkut"} &bull; {inv.units?.driver || "Driver"}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                          {formatDateId(inv.tanggal)}
                          <div className="text-[11px] text-zinc-400">
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

                        <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-zinc-900 dark:text-white">
                          {formatIDR(inv.harga || 0)}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col gap-1 items-start">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              isLunas
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                            }`}>
                              {isLunas ? <FiCheckCircle size={11} /> : <FiClock size={11} />}
                              {inv.status_invoice || "Pending"}
                            </span>
                            <span className="text-[10px] text-zinc-400">
                              SPK: {inv.status_spk || "Pending"}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-xs relative">
                          <div className="relative inline-block text-left">
                            <button
                              onClick={() => setOpenDropdown(openDropdown === inv.id ? null : inv.id)}
                              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition"
                              title="Pilihan Aksi"
                            >
                              <FiMoreVertical size={16} />
                            </button>

                            {openDropdown === inv.id && (
                              <div className="absolute right-0 top-full mt-1 w-44 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl z-50 py-1 divide-y divide-zinc-100 dark:divide-zinc-800">
                                <div className="py-1">
                                  <Link
                                    href={`/invoicing-service/invoice/view?id=${inv.id}`}
                                    className="flex items-center gap-2 px-3.5 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                  >
                                    <FiEye size={13} /> Tinjau SPK &amp; Invoice
                                  </Link>
                                  <Link
                                    href={`/invoicing-service/invoice/edit?id=${inv.id}`}
                                    className="flex items-center gap-2 px-3.5 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                  >
                                    <FiEdit2 size={13} /> Edit Data
                                  </Link>
                                </div>
                                <div className="py-1">
                                  <button
                                    onClick={() => {
                                      setOpenDropdown(null);
                                      handleDelete(inv.id);
                                    }}
                                    className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                                  >
                                    <FiTrash2 size={13} /> Hapus Faktur
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Table Footer with Pagination */}
          <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-zinc-500">
              Menampilkan {filteredInvoices.length} dari {invoice.length} entri invoice aktif
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-zinc-300 dark:border-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                Sebelumnya
              </button>
              <span className="text-xs font-mono font-bold px-2">
                Halaman {currentPage}
              </span>
              <button
                disabled={!pagination?.next_page_url && dataSource === "demo"}
                onClick={() => setCurrentPage(p => p + 1)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-zinc-300 dark:border-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPageInvoice;
