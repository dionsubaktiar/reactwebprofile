"use client";

import Navbar from "@/app/components/navbar";
import apiClient from "@/app/lib/api";
import type { Part, Pagination, ApiResponse } from "@/app/lib/types";
import { formatIDR } from "@/app/lib/format";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { 
  FiTool, 
  FiPlus, 
  FiSearch, 
  FiTruck, 
  FiDollarSign, 
  FiPackage, 
  FiArrowLeft, 
  FiEdit2, 
  FiTrash2, 
  FiMoreVertical, 
  FiActivity,
  FiAlertCircle
} from "react-icons/fi";

const FALLBACK_PARTS: Part[] = [
  {
    id: 1,
    part_number: "FLT-OIL-H130",
    nama_barang: "Filter Oli Mesin Diesel HD",
    merk: "Denso",
    kendaraan: "Hino Dutro 130 HD",
    harga: 145000,
    jasa: 50000
  },
  {
    id: 2,
    part_number: "BRK-PAD-ISZ",
    nama_barang: "Brake Pad Front Set Heavy",
    merk: "Bendix",
    kendaraan: "Isuzu Giga FVR",
    harga: 850000,
    jasa: 150000
  },
  {
    id: 3,
    part_number: "CLT-PLT-FUSO",
    nama_barang: "Clutch Disc / Kampas Kopling",
    merk: "Exedy",
    kendaraan: "Mitsubishi Fuso Fighter",
    harga: 1850000,
    jasa: 350000
  },
  {
    id: 4,
    part_number: "FLT-FUEL-GEN",
    nama_barang: "Fuel Filter Priming Pump",
    merk: "Sakura",
    kendaraan: "Toyota Dyna 110 ET",
    harga: 180000,
    jasa: 45000
  },
  {
    id: 5,
    part_number: "BELT-FAN-7PK",
    nama_barang: "V-Ribbed Alternator Fan Belt",
    merk: "Bando",
    kendaraan: "Hino Dutro / Ranger",
    harga: 220000,
    jasa: 75000
  }
];

const PartsPage = () => {
  const [parts, setParts] = useState<Part[]>(FALLBACK_PARTS);
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
  const [selectedMerk, setSelectedMerk] = useState("All");
  const [dataSource, setDataSource] = useState<"api" | "demo">("demo");

  useEffect(() => {
    let isMounted = true;
    const fetchData = async (page = 1) => {
      setIsLoading(true);
      try {
        const response = await apiClient.get<ApiResponse<Part>>(
          `/part?page=${page}`,
          { timeout: 3500 }
        );
        if (isMounted && response.data?.data?.data && response.data.data.data.length > 0) {
          setParts(response.data.data.data);
          setPagination(response.data.data);
          setDataSource("api");
        }
      } catch (error) {
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
    if (confirm(`Yakin ingin menghapus part #${id}?`)) {
      try {
        await apiClient.delete(`/part/${id}`);
        setParts(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        console.error("Error deleting part:", error);
        setParts(prev => prev.filter(p => p.id !== id));
      }
    }
  };

  const filteredParts = useMemo(() => {
    return parts.filter(p => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        (p.nama_barang || "").toLowerCase().includes(q) ||
        (p.part_number || "").toLowerCase().includes(q) ||
        (p.kendaraan || "").toLowerCase().includes(q) ||
        (p.merk || "").toLowerCase().includes(q);

      const matchMerk = selectedMerk === "All" || p.merk === selectedMerk;
      return matchSearch && matchMerk;
    });
  }, [parts, searchQuery, selectedMerk]);

  const stats = useMemo(() => {
    const totalCount = parts.length;
    const totalInventoryValue = parts.reduce((acc, curr) => acc + (curr.harga || 0), 0);
    const avgJasa = totalCount > 0 ? Math.round(parts.reduce((acc, curr) => acc + (curr.jasa || 0), 0) / totalCount) : 0;
    return { totalCount, totalInventoryValue, avgJasa };
  }, [parts]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-16">
      <Navbar title="Manajemen Suku Cadang" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Header & Subsystem Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <FiTool size={22} />
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Katalog Suku Cadang Armada
              </h1>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Inventaris sparepart, tarif suku cadang, dan biaya jasa pemasangan servis armada.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/invoicing-service">
              <button className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition shadow-sm">
                <FiArrowLeft /> Hub Invoicing
              </button>
            </Link>
            <Link href="/invoicing-service/units">
              <button className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition shadow-sm">
                <FiTruck /> Units
              </button>
            </Link>
            <Link href="/invoicing-service/parts/create">
              <button className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm">
                <FiPlus size={15} /> Tambah Suku Cadang
              </button>
            </Link>
          </div>
        </div>

        {/* 3 KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Jenis Part</span>
              <div className="text-2xl font-extrabold mt-1">{stats.totalCount} Item</div>
              <span className="text-[11px] text-zinc-400">Tersedia dalam katalog</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl">
              <FiPackage />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Nilai Total Katalog</span>
              <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                {formatIDR(stats.totalInventoryValue)}
              </div>
              <span className="text-[11px] text-zinc-400">Harga dasar komponen</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl">
              <FiDollarSign />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Rata-Rata Biaya Jasa</span>
              <div className="text-2xl font-extrabold text-sky-600 dark:text-sky-400 mt-1 font-mono">
                {formatIDR(stats.avgJasa)}
              </div>
              <span className="text-[11px] text-zinc-400">Tarif pemasangan mekanik</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xl">
              <FiTool />
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama part, nomor part (SKU), merk, atau tipe kendaraan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedMerk}
              onChange={(e) => setSelectedMerk(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">Semua Merk Sparepart</option>
              <option value="Denso">Denso</option>
              <option value="Bendix">Bendix</option>
              <option value="Exedy">Exedy</option>
              <option value="Sakura">Sakura</option>
              <option value="Bando">Bando</option>
            </select>

            {dataSource === "demo" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                <FiActivity /> Demo Fallback
              </span>
            )}
          </div>
        </div>

        {/* Desktop Responsive Table */}
        <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              Memuat data suku cadang...
            </div>
          ) : filteredParts.length === 0 ? (
            <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-2">
              <FiAlertCircle size={28} className="text-zinc-400" />
              <p className="font-semibold text-zinc-700 dark:text-zinc-300">Tidak ada suku cadang yang cocok.</p>
              <p className="text-xs">Ubah kata kunci pencarian atau sesuaikan filter merk.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-left text-sm">
                <thead className="bg-zinc-50 dark:bg-zinc-950/80 text-zinc-600 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Part Number / SKU</th>
                    <th className="px-6 py-4">Nama Suku Cadang</th>
                    <th className="px-6 py-4">Merk &amp; Kompatibilitas</th>
                    <th className="px-6 py-4">Harga Komponen</th>
                    <th className="px-6 py-4">Biaya Jasa</th>
                    <th className="px-6 py-4">Total Biaya</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredParts.map((part) => (
                    <tr key={part.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">
                        {part.part_number || `SKU-${part.id}`}
                      </td>
                      <td className="px-6 py-4 font-bold text-zinc-900 dark:text-white">
                        {part.nama_barang}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-zinc-600 dark:text-zinc-400">
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200">{part.merk}</span>
                        <div className="text-[11px] text-zinc-500">{part.kendaraan}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-zinc-800 dark:text-zinc-200">
                        {formatIDR(part.harga || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-zinc-500">
                        {formatIDR(part.jasa || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {formatIDR((part.harga || 0) + (part.jasa || 0))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs relative">
                        <div className="relative inline-block text-left">
                          <button
                            onClick={() => setOpenDropdown(openDropdown === part.id ? null : part.id)}
                            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition"
                          >
                            <FiMoreVertical size={16} />
                          </button>
                          {openDropdown === part.id && (
                            <div className="absolute right-0 top-full mt-1 w-36 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl z-50 py-1 divide-y divide-zinc-100 dark:divide-zinc-800">
                              <div className="py-1">
                                <Link
                                  href={`/invoicing-service/parts/edit?id=${part.id}`}
                                  className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                >
                                  <FiEdit2 size={13} /> Edit
                                </Link>
                              </div>
                              <div className="py-1">
                                <button
                                  onClick={() => {
                                    setOpenDropdown(null);
                                    handleDelete(part.id);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                                >
                                  <FiTrash2 size={13} /> Hapus
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Footer */}
          <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-zinc-500">
              Menampilkan {filteredParts.length} dari {parts.length} item suku cadang
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-zinc-300 dark:border-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                Sebelumnya
              </button>
              <span className="text-xs font-mono font-bold px-2">Halaman {currentPage}</span>
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

export default PartsPage;
