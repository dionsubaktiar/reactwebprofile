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
  FiTruck,
  FiDollarSign,
  FiPackage,
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
  FiActivity,
} from "react-icons/fi";
import PageHeader from "../_components/PageHeader";
import KpiCard from "../_components/KpiCard";
import SearchBar from "../_components/SearchBar";
import DataTable from "../_components/DataTable";
import PaginationControls from "../_components/Pagination";
import RowActions from "../_components/RowActions";
import ConfirmDialog from "../_components/ConfirmDialog";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMerk, setSelectedMerk] = useState("All");
  const [dataSource, setDataSource] = useState<"api" | "demo">("demo");
  const [deleteTarget, setDeleteTarget] = useState<Part | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await apiClient.delete(`/part/${deleteTarget.id}`);
      setParts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (error) {
      console.error("Error deleting part:", error);
      // Rollback: item tetap di list, tampilkan error yang terlihat.
      setDeleteError(
        `Gagal menghapus part #${deleteTarget.id}. Data tidak dihapus, coba lagi.`
      );
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
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
        <PageHeader
          icon={<FiTool size={22} />}
          title="Katalog Suku Cadang Armada"
          subtitle="Inventaris sparepart, tarif suku cadang, dan biaya jasa pemasangan servis armada."
          accent="indigo"
          actions={
            <>
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
            </>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KpiCard
            label="Total Jenis Part"
            value={<>{stats.totalCount} Item</>}
            hint="Tersedia dalam katalog"
            icon={<FiPackage />}
            accent="indigo"
          />
          <KpiCard
            label="Nilai Total Katalog"
            value={<span className="font-mono">{formatIDR(stats.totalInventoryValue)}</span>}
            hint="Harga dasar komponen"
            icon={<FiDollarSign />}
            accent="emerald"
            coloredValue
          />
          <KpiCard
            label="Rata-Rata Biaya Jasa"
            value={<span className="font-mono">{formatIDR(stats.avgJasa)}</span>}
            hint="Tarif pemasangan mekanik"
            icon={<FiTool />}
            accent="sky"
            coloredValue
          />
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari berdasarkan nama part, nomor part (SKU), merk, atau tipe kendaraan..."
          accent="indigo"
        >
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
        </SearchBar>

        {deleteError && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-sm text-red-600 dark:text-red-400">
            {deleteError}
          </div>
        )}

        <DataTable
          isLoading={isLoading}
          loadingText="Memuat data suku cadang..."
          isEmpty={filteredParts.length === 0}
          emptyTitle="Tidak ada suku cadang yang cocok."
          emptyHint="Ubah kata kunci pencarian atau sesuaikan filter merk."
          accent="indigo"
          footer={
            <PaginationControls
              currentPage={currentPage}
              hasNext={!!pagination?.next_page_url || dataSource === "api"}
              onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
              onNext={() => setCurrentPage((p) => p + 1)}
              summary={
                <>Menampilkan {filteredParts.length} dari {parts.length} item suku cadang</>
              }
            />
          }
        >
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
                    <RowActions
                      label={`Aksi untuk part ${part.nama_barang}`}
                      items={[
                        {
                          label: "Edit",
                          icon: <FiEdit2 size={13} />,
                          href: `/invoicing-service/parts/edit?id=${part.id}`,
                        },
                        {
                          label: "Hapus",
                          icon: <FiTrash2 size={13} />,
                          danger: true,
                          onClick: () => setDeleteTarget(part),
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

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Hapus Suku Cadang"
        message={
          deleteTarget
            ? `Yakin ingin menghapus part #${deleteTarget.id} (${deleteTarget.nama_barang})? Tindakan ini tidak bisa dibatalkan.`
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

export default PartsPage;
