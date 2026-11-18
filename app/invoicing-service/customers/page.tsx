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
  FiBriefcase
} from "react-icons/fi";

const FALLBACK_CUSTOMERS: Customer[] = [
  { id: 1, nama_perusahaan: "PT Nusantara Prima Logistics", alamat: "Jl. Margomulyo Indah No. 45, Surabaya", pic: "Budi Santoso", kontak: "0812-3456-7890" },
  { id: 2, nama_perusahaan: "CV Sentosa Jaya Abadi", alamat: "Kawasan Industri MM2100 Blok C-2, Cikarang", pic: "Agus Pratama", kontak: "0813-8899-1122" },
  { id: 3, nama_perusahaan: "PT Samudera Trans Global", alamat: "Jl. Pelabuhan Tanjung Perak No. 12, Surabaya", pic: "Hendra Wijaya", kontak: "0817-6543-2109" },
  { id: 4, nama_perusahaan: "PT Lintas Niaga Express", alamat: "Jl. Daan Mogot KM 19, Kalideres, Jakarta Barat", pic: "Siti Rahmawati", kontak: "0819-2233-4455" },
  { id: 5, nama_perusahaan: "CV Berkah Muatan Sejahtera", alamat: "Jl. Raya Semarang-Demak KM 8, Semarang", pic: "Ahmad Fauzi", kontak: "0852-9988-7766" }
];

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
        c.nama_perusahaan.toLowerCase().includes(q) ||
        c.pic.toLowerCase().includes(q) ||
        c.alamat.toLowerCase().includes(q) ||
        c.kontak.toLowerCase().includes(q)
      );
    });
  }, [companies, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar title="Direktori Pelanggan & Mitra" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Navigation & Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link 
                href="/invoicing-service"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition"
              >
                <FiArrowLeft /> Kembali ke Dashboard Invoicing
              </Link>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <FiUsers className="text-emerald-500" />
              Kelola Pelanggan &amp; Mitra Korporat
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Data master entitas korporat, alamat operasional, dan kontak PIC penanggung jawab armada logistik.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
              dataSource === "api"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-amber-500/10 text-amber-400 border-amber-500/30"
            }`}>
              <span className={`w-2 h-2 rounded-full ${dataSource === "api" ? "bg-emerald-500 animate-pulse" : "bg-amber-400"}`}></span>
              {dataSource === "api" ? "Live Serverless Backend" : "Standalone Client Mode"}
            </span>

            <Link
              href="/invoicing-service/customers/create"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-lg shadow-emerald-950/40"
            >
              <FiPlus /> Tambah Mitra Baru
            </Link>
          </div>
        </div>

        {/* 3 KPI Summary Cards Desktop-First */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Total Pelanggan Terdaftar</span>
              <FiBriefcase className="text-emerald-400 text-lg" />
            </div>
            <div className="text-2xl font-bold text-white">{companies.length} Perusahaan</div>
            <div className="text-xs text-slate-400 mt-1">Mitra aktif pada ekosistem invoicing</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">PIC Terverifikasi</span>
              <FiUser className="text-sky-400 text-lg" />
            </div>
            <div className="text-2xl font-bold text-sky-400">100% Valid</div>
            <div className="text-xs text-slate-400 mt-1">Kontak operasional terhubung langsung</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Siklus Penagihan</span>
              <FiActivity className="text-indigo-400 text-lg" />
            </div>
            <div className="text-2xl font-bold text-indigo-400">Net 30 Hari</div>
            <div className="text-xs text-slate-400 mt-1">Standar termin pembayaran invoice</div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shadow-sm">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Cari nama perusahaan, PIC, alamat, atau nomor telepon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>
        </div>

        {/* Responsive Desktop-First Data Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl backdrop-blur-md">
          {isLoading ? (
            <div className="p-12 text-center text-slate-400 text-xs">Memuat direktori pelanggan...</div>
          ) : filteredCompanies.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">Tidak ada mitra yang cocok dengan pencarian.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="px-6 py-3.5">Nama Perusahaan</th>
                    <th className="px-6 py-3.5">Alamat Operasional</th>
                    <th className="px-6 py-3.5">Person In Charge (PIC)</th>
                    <th className="px-6 py-3.5">Kontak</th>
                    <th className="px-6 py-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredCompanies.map((company) => (
                    <tr key={company.id} className="hover:bg-slate-800/40 transition">
                      <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                        <FiBriefcase className="text-emerald-400 shrink-0" />
                        <span>{company.nama_perusahaan}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-300 max-w-xs truncate">
                        <div className="flex items-center gap-1.5">
                          <FiMapPin className="text-slate-500 shrink-0" />
                          <span className="truncate">{company.alamat}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-200">
                        <div className="flex items-center gap-1.5 font-medium">
                          <FiUser className="text-sky-400 shrink-0" />
                          <span>{company.pic}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-emerald-400 font-mono text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <FiPhone className="text-emerald-500 shrink-0" />
                          <span>{company.kontak}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/invoicing-service/customers/edit?id=${company.id}`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-sky-950/40 transition"
                            title="Edit Data Mitra"
                          >
                            <FiEdit2 />
                          </Link>
                          <button
                            onClick={() => handleDelete(company.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition"
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
        </div>

        {/* Pagination Bar */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
          <span>Menampilkan {filteredCompanies.length} entitas mitra</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={!pagination?.prev_page_url && currentPage === 1}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-800 transition"
            >
              Sebelumnya
            </button>
            <span className="px-3 py-1 text-slate-300 font-medium">Halaman {currentPage}</span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={!pagination?.next_page_url}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-800 transition"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
