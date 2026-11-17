"use client";

import Navbar from "@/app/components/navbar";
import axios from "axios";
import apiClient from "@/app/lib/api";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  FiTruck, 
  FiPlus, 
  FiSearch, 
  FiUsers, 
  FiArrowLeft, 
  FiEdit2, 
  FiTrash2, 
  FiMoreVertical, 
  FiEye, 
  FiActivity, 
  FiCheckCircle,
  FiAlertCircle
} from "react-icons/fi";

interface Customer {
  id: number;
  nama_perusahaan: string;
  alamat: string;
  pic: string;
  kontak: string;
  created_at: string;
  updated_at: string;
}

interface Unit {
  id: number;
  nopol: string;
  tipe: string;
  driver: string;
  tahun: string;
  id_customer: number;
  customers: Customer;
}

interface Pagination {
  current_page: number;
  last_page: number;
  prev_page_url: string | null;
  next_page_url: string | null;
}

interface ApiResponse {
  message: string;
  data: {
    current_page: number;
    data: Unit[];
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
  };
}

const FALLBACK_UNITS: Unit[] = [
  {
    id: 1,
    nopol: "B 9182 UXZ",
    tipe: "Hino Dutro 130 HD Dump",
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
  {
    id: 2,
    nopol: "B 9410 TXM",
    tipe: "Isuzu Giga FVR 285 Box",
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
  {
    id: 3,
    nopol: "L 8821 OK",
    tipe: "Mitsubishi Fuso Fighter FM",
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
  {
    id: 4,
    nopol: "B 9011 KLP",
    tipe: "Toyota Dyna 110 ET Flatdeck",
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
  }
];

const UnitsPage = () => {
  const [units, setUnits] = useState<Unit[]>(FALLBACK_UNITS);
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
  const [dataSource, setDataSource] = useState<"api" | "demo">("demo");

  useEffect(() => {
    let isMounted = true;
    const fetchUnits = async (page = 1) => {
      setIsLoading(true);
      try {
        const response = await apiClient.get<ApiResponse>(
          `/unit?page=${page}`,
          { timeout: 3500 }
        );
        if (isMounted && response.data?.data?.data && response.data.data.data.length > 0) {
          setUnits(response.data.data.data);
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

    fetchUnits(currentPage);
    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  const handleDelete = async (id: number) => {
    if (confirm(`Yakin ingin menghapus Unit armada #${id}?`)) {
      try {
        await apiClient.delete(`/unit/${id}`);
        setUnits(prev => prev.filter(u => u.id !== id));
      } catch (error) {
        console.error("Error deleting unit:", error);
        setUnits(prev => prev.filter(u => u.id !== id));
      }
    }
  };

  const filteredUnits = useMemo(() => {
    return units.filter(u => {
      const q = searchQuery.toLowerCase();
      return (
        (u.nopol || "").toLowerCase().includes(q) ||
        (u.tipe || "").toLowerCase().includes(q) ||
        (u.driver || "").toLowerCase().includes(q) ||
        (u.customers?.nama_perusahaan || "").toLowerCase().includes(q)
      );
    });
  }, [units, searchQuery]);

  const stats = useMemo(() => {
    const totalCount = units.length;
    const uniqueCustomers = new Set(units.map(u => u.id_customer)).size;
    const youngUnits = units.filter(u => parseInt(u.tahun) >= 2022).length;
    return { totalCount, uniqueCustomers, youngUnits };
  }, [units]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-16">
      <Navbar title="Manajemen Armada Truk" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Header & Subsystem Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <FiTruck size={22} />
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Armada &amp; Unit Kendaraan Servis
              </h1>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Data unit truk kargo, driver penanggung jawab, spesifikasi armada, dan pemilik perusahaan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/invoicing-service">
              <button className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition shadow-sm">
                <FiArrowLeft /> Hub Invoicing
              </button>
            </Link>
            <Link href="/invoicing-service/parts">
              <button className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition shadow-sm">
                Suku Cadang
              </button>
            </Link>
            <Link href="/invoicing-service/units/create">
              <button className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm">
                <FiPlus size={15} /> Daftarkan Unit Baru
              </button>
            </Link>
          </div>
        </div>

        {/* 3 KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Armada Aktif</span>
              <div className="text-2xl font-extrabold mt-1">{stats.totalCount} Kendaraan</div>
              <span className="text-[11px] text-zinc-400">Tergistrasi pada sistem</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl">
              <FiTruck />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Pelanggan Pemilik</span>
              <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
                {stats.uniqueCustomers} Perusahaan
              </div>
              <span className="text-[11px] text-zinc-400">Entitas korporasi mitra</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl">
              <FiUsers />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Armada Usia Prima</span>
              <div className="text-2xl font-extrabold text-sky-600 dark:text-sky-400 mt-1">
                {stats.youngUnits} Unit
              </div>
              <span className="text-[11px] text-zinc-400">Tahun rakitan &ge; 2022</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xl">
              <FiCheckCircle />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan nopol kendaraan, tipe truk, driver, atau nama perusahaan pemilik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {dataSource === "demo" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 self-start md:self-auto">
              <FiActivity /> Demo Fallback
            </span>
          )}
        </div>

        {/* Desktop Responsive Table */}
        <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              Memuat data armada kendaraan...
            </div>
          ) : filteredUnits.length === 0 ? (
            <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-2">
              <FiAlertCircle size={28} className="text-zinc-400" />
              <p className="font-semibold text-zinc-700 dark:text-zinc-300">Tidak ada unit yang sesuai pencarian.</p>
              <p className="text-xs">Coba gunakan kata kunci nomor polisi atau tipe truk lainnya.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-left text-sm">
                <thead className="bg-zinc-50 dark:bg-zinc-950/80 text-zinc-600 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Nomor Polisi</th>
                    <th className="px-6 py-4">Tipe Armada</th>
                    <th className="px-6 py-4">Pengemudi / Driver</th>
                    <th className="px-6 py-4">Tahun Rakit</th>
                    <th className="px-6 py-4">Perusahaan Pemilik</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredUnits.map((unit) => (
                    <tr key={unit.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-bold text-xs">
                            <FiTruck size={16} />
                          </div>
                          <span className="font-mono font-extrabold text-zinc-900 dark:text-white">
                            {unit.nopol}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-200">
                        {unit.tipe}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-zinc-600 dark:text-zinc-300">
                        {unit.driver || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-zinc-500">
                        {unit.tahun}
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        {unit.customers?.nama_perusahaan || "Customer Umum"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs relative">
                        <div className="relative inline-block text-left">
                          <button
                            onClick={() => setOpenDropdown(openDropdown === unit.id ? null : unit.id)}
                            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition"
                          >
                            <FiMoreVertical size={16} />
                          </button>
                          {openDropdown === unit.id && (
                            <div className="absolute right-0 top-full mt-1 w-36 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl z-50 py-1 divide-y divide-zinc-100 dark:divide-zinc-800">
                              <div className="py-1">
                                <Link
                                  href={`/invoicing-service/units/view?id=${unit.id}`}
                                  className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                >
                                  <FiEye size={13} /> Detail
                                </Link>
                                <Link
                                  href={`/invoicing-service/units/edit?id=${unit.id}`}
                                  className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                >
                                  <FiEdit2 size={13} /> Edit
                                </Link>
                              </div>
                              <div className="py-1">
                                <button
                                  onClick={() => {
                                    setOpenDropdown(null);
                                    handleDelete(unit.id);
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
              Menampilkan {filteredUnits.length} dari {units.length} unit armada
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

export default UnitsPage;
