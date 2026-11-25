"use client";

import SubPageHeader from "@/app/components/SubPageHeader";
import apiClient from "@/app/lib/api";
import type { Customer, Pagination } from "@/app/lib/types";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import {
  FiUsers,
  FiPlus,
  FiMapPin,
  FiPhone,
  FiUser,
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
  FiActivity,
  FiBriefcase,
  FiEye,
} from "react-icons/fi";
import PageHeader from "../_components/PageHeader";
import KpiCard from "../_components/KpiCard";
import SearchBar from "../_components/SearchBar";
import DataTable from "../_components/DataTable";
import PaginationControls from "../_components/Pagination";
import ConfirmDialog from "@/app/components/ConfirmDialog";

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
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await apiClient.delete(`/customer/${deleteTarget.id}`);
      setCompanies((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {
      // Rollback: mitra tetap di list, tampilkan error yang terlihat.
      setDeleteError(
        `Gagal menghapus ${deleteTarget.nama_perusahaan}. Data tidak dihapus, coba lagi.`
      );
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
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
      <SubPageHeader title="Direktori Pelanggan & Mitra" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <PageHeader
          icon={<FiUsers size={22} />}
          title="Kelola Pelanggan &amp; Mitra Korporat"
          subtitle="Data master entitas korporat, alamat operasional, dan kontak PIC penanggung jawab armada logistik."
          accent="indigo"
          actions={
            <>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${
                dataSource === "api"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
              }`}>
                <span className={`w-2 h-2 rounded-full ${dataSource === "api" ? "bg-emerald-500" : "bg-amber-400"}`}></span>
                {dataSource === "api" ? "Live Serverless Backend" : "Standalone Client Mode"}
              </span>
              <Link
                href="/invoicing-service"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
              >
                <FiArrowLeft /> Hub Invoicing
              </Link>
              <Link
                href="/invoicing-service/customers/create"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
              >
                <FiPlus size={15} /> Tambah Mitra Baru
              </Link>
            </>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KpiCard
            label="Total Pelanggan Terdaftar"
            value={<>{stats.totalCount} Perusahaan</>}
            hint="Mitra aktif pada ekosistem invoicing"
            icon={<FiBriefcase />}
            accent="indigo"
          />
          <KpiCard
            label="Kontak PIC Valid"
            value={<>{stats.validKontakCount} dari {companies.length}</>}
            hint="Kontak operasional terhubung langsung"
            icon={<FiUser />}
            accent="sky"
            coloredValue
          />
          <KpiCard
            label="Mitra Terbaru"
            value={
              <span className="truncate max-w-[220px]" title={stats.latest?.nama_perusahaan ?? ""}>
                {stats.latest?.nama_perusahaan ?? "Belum ada data"}
              </span>
            }
            hint={stats.latest ? `PIC: ${stats.latest.pic || "-"}` : "Belum ada mitra terdaftar"}
            icon={<FiActivity />}
            accent="indigo"
            coloredValue
          />
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari nama perusahaan, PIC, alamat, atau nomor telepon..."
          accent="indigo"
        >
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

        <DataTable
          isLoading={isLoading}
          loadingText="Memuat direktori pelanggan..."
          isEmpty={filteredCompanies.length === 0}
          emptyTitle="Tidak ada mitra yang cocok dengan pencarian."
          emptyHint="Ubah kata kunci pencarian atau tambah mitra baru."
          accent="indigo"
          footer={
            <PaginationControls
              currentPage={currentPage}
              hasNext={!!pagination?.next_page_url}
              onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
              onNext={() => setCurrentPage((p) => p + 1)}
              summary={
                <>Menampilkan {filteredCompanies.length} dari {stats.totalCount} entitas mitra</>
              }
            />
          }
        >
          <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-left text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-950/80 text-zinc-600 dark:text-zinc-400 text-xs font-semibold">
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
                  <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <FiBriefcase className="text-indigo-600 dark:text-indigo-400 shrink-0" />
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
                  <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-mono text-xs">
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
                        aria-label={`Lihat detail ${company.nama_perusahaan}`}
                      >
                        <FiEye />
                      </Link>
                      <Link
                        href={`/invoicing-service/customers/edit?id=${company.id}`}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition"
                        title="Edit Data Mitra"
                        aria-label={`Edit ${company.nama_perusahaan}`}
                      >
                        <FiEdit2 />
                      </Link>
                      <button
                        onClick={() => setDeleteTarget(company)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                        title="Hapus Mitra"
                        aria-label={`Hapus ${company.nama_perusahaan}`}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      </main>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Hapus Mitra"
        message={
          deleteTarget
            ? `Apakah Anda yakin ingin menghapus data mitra ${deleteTarget.nama_perusahaan}? Tindakan ini tidak bisa dibatalkan.`
            : ""
        }
        confirmLabel="Hapus"
        isBusy={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
