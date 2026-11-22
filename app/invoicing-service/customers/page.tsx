"use client";

import Navbar from "@/app/components/navbar";
import apiClient from "@/app/lib/api";
import type { Customer, Pagination } from "@/app/lib/types";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { 
  FiUsers, 
  FiPlus, 
  FiSearch, 
  FiMapPin, 
  FiPhone, 
  FiUser, 
  FiArrowLeft, 
  FiEdit2, 
  FiTrash2, 
  FiActivity,
  FiBriefcase,
  FiEye,
  FiAlertCircle
} from "react-icons/fi";

const FALLBACK_CUSTOMERS: Customer[] = [
  { id: 1, nama_perusahaan: "PT Nusantara Prima Logistics", alamat: "Jl. Margomulyo Indah No. 45, Surabaya", pic: "Budi Santoso", kontak: "0812-3456-7890" },
  { id: 2, nama_perusahaan: "CV Sentosa Jaya Abadi", alamat: "Kawasan Industri MM2100 Blok C-2, Cikarang", pic: "Agus Pratama", kontak: "0813-8899-1122" },
  { id: 3, nama_perusahaan: "PT Samudera Trans Global", alamat: "Jl. Pelabuhan Tanjung Perak No. 12, Surabaya", pic: "Hendra Wijaya", kontak: "0817-6543-2109" },
  { id: 4, nama_perusahaan: "PT Lintas Niaga Express", alamat: "Jl. Daan Mogot KM 19, Kalideres, Jakarta Barat", pic: "Siti Rahmawati", kontak: "0819-2233-4455" },
  { id: 5, nama_perusahaan: "CV Berkah Muatan Sejahtera", alamat: "Jl. Raya Semarang-Demak KM 8, Semarang", pic: "Ahmad Fauzi", kontak: "0852-9988-7766" }
];

/** Kontak dianggap valid bila berisi sedikitnya 9 digit angka. */
const isValidKontak = (kontak: string | null | undefined): boolean =>
  (kontak ?? "").replace(/\D/g, "").length >= 9;

export default function CustomerPage() {
  const [companies, setCompanies] = useState<Customer[]>(FALLBACK_CUSTOMERS);
  const [pagination, setPagination] = useState<Pagination | null>({
    current_page: 1,
    last_page: 1,
    prev_page_url: null,
    next_page_url: null
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataSource, setDataSource] = useState<"api" | "demo">("demo");

  useEffect(() => {
    let isMounted = true;
    const fetchCompanies = async (page = 1) => {
      setIsLoading(true);
      try {
        const response = await apiClient.get(`/customer?page=${page}`, { timeout: 3500 });
        if (isMounted && response.data?.data?.data && response.data.data.data.length > 0) {
          setCompanies(response.data.data.data);
          setPagination(response.data.data);
          setDataSource("api");
        }
      } catch {
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

    fetchCompanies(currentPage);
    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data mitra ini?")) {
      try {
        await apiClient.delete(`/customer/${id}`);
      } catch {
        // Fallback delete in-memory
      }
      setCompanies((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const q = searchQuery.toLowerCase();
      return (
        (c.nama_perusahaan || "").toLowerCase().includes(q) ||
        (c.pic || "").toLowerCase().includes(q) ||
        (c.alamat || "").toLowerCase().includes(q) ||
        (c.kontak || "").toLowerCase().includes(q)
      );
    });
  }, [companies, searchQuery]);

  const stats = useMemo(() => {
    const totalCount = pagination?.total ?? companies.length;
    const validKontakCount = companies.filter((c) => isValidKontak(c.kontak)).length;
    const latest = companies.length > 0
      ? companies.reduce((a, b) => (b.id > a.id ? b : a), companies[0])
      : null;
    return { totalCount, validKontakCount, latest };
  }, [companies, pagination]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-16">
      <Navbar title="Direktori Pelanggan & Mitra" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Header & Subsystem Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <FiUsers size={22} />
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Kelola Pelanggan &amp; Mitra Korporat
              </h1>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Data master entitas korporat, alamat operasional, dan kontak PIC penanggung jawab armada logistik.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
              dataSource === "api"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
            }`}>
              <span className={`w-2 h-2 rounded-full ${dataSource === "api" ? "bg-emerald-500 animate-pulse" : "bg-amber-400"}`}></span>
              {dataSource === "api" ? "Live Serverless Backend" : "Standalone Client Mode"}
            </span>
            <Link href="/invoicing-service">
              <button className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition shadow-sm">
                <FiArrowLeft /> Hub Invoicing
              </button>
            </Link>
            <Link href="/invoicing-service/customers/create">
              <button className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm">
                <FiPlus size={15} /> Tambah Mitra Baru
              </button>
            </Link>
          </div>
        </div>

        {/* 3 KPI Summary Cards — semua angka dihitung dari data */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Pelanggan Terdaftar</span>
              <div className="text-2xl font-extrabold mt-1">{stats.totalCount} Perusahaan</div>
              <span className="text-[11px] text-zinc-400">Mitra aktif pada ekosistem invoicing</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl">
              <FiBriefcase />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Kontak PIC Valid</span>
              <div className="text-2xl font-extrabold text-sky-600 dark:text-sky-400 mt-1">
                {stats.validKontakCount} dari {companies.length}
              </div>
              <span className="text-[11px] text-zinc-400">Kontak operasional terhubung langsung</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xl">
              <FiUser />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Mitra Terbaru</span>
              <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1 truncate max-w-[220px]" title={stats.latest?.nama_perusahaan ?? ""}>
                {stats.latest?.nama_perusahaan ?? "Belum ada data"}
              </div>
              <span className="text-[11px] text-zinc-400">
                {stats.latest ? `PIC: ${stats.latest.pic || "-"}` : "Belum ada mitra terdaftar"}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl">
              <FiActivity />
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-sm" />
            <input
              type="text"
              placeholder="Cari nama perusahaan, PIC, alamat, atau nomor telepon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          {dataSource === "demo" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              <FiActivity /> Demo Fallback
            </span>
          )}
        </div>

        {/* Responsive Desktop-First Data Table */}
        <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              Memuat direktori pelanggan...
            </div>
          ) : filteredCompanies.length === 0 ? (
            <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-2">
              <FiAlertCircle size={28} className="text-zinc-400" />
              <p className="font-semibold text-zinc-700 dark:text-zinc-300">Tidak ada mitra yang cocok dengan pencarian.</p>
              <p className="text-xs">Ubah kata kunci pencarian atau tambah mitra baru.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-left text-sm">
                <thead className="bg-zinc-50 dark:bg-zinc-950/80 text-zinc-600 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Nama Perusahaan</th>
                    <th className="px-6 py-4">Alamat Operasional</th>
                    <th className="px-6 py-4">Person In Charge (PIC)</th>
                    <th className="px-6 py-4">Kontak</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredCompanies.map((company) => (
                    <tr key={company.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-zinc-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <FiBriefcase className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{company.nama_perusahaan}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300 max-w-xs truncate">
                        <div className="flex items-center gap-1.5">
                          <FiMapPin className="text-zinc-400 shrink-0" />
                          <span className="truncate">{company.alamat}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-800 dark:text-zinc-200">
                        <div className="flex items-center gap-1.5 font-medium">
                          <FiUser className="text-sky-600 dark:text-sky-400 shrink-0" />
                          <span>{company.pic}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <FiPhone className="text-emerald-600 dark:text-emerald-500 shrink-0" />
                          <span>{company.kontak}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/invoicing-service/customers/view?id=${company.id}`}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition"
                            title="Lihat Detail Mitra"
                          >
                            <FiEye />
                          </Link>
                          <Link
                            href={`/invoicing-service/customers/edit?id=${company.id}`}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition"
                            title="Edit Data Mitra"
                          >
                            <FiEdit2 />
                          </Link>
                          <button
                            onClick={() => handleDelete(company.id)}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                            title="Hapus Mitra"
                          >
                            <FiTrash2 />
                          </button>
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
              Menampilkan {filteredCompanies.length} dari {stats.totalCount} entitas mitra
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-zinc-300 dark:border-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                Sebelumnya
              </button>
              <span className="text-xs font-mono font-bold px-2">Halaman {currentPage}</span>
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={!pagination?.next_page_url}
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
}
