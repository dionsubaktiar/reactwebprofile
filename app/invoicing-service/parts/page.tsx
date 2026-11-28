"use client";

import SubPageHeader from "@/app/components/SubPageHeader";
import apiClient from "@/app/lib/api";
import type { Part, ApiResponse } from "@/app/lib/types";
import { formatIDR } from "@/app/lib/format";
import {
  DEFAULT_PART_FILTER,
  FILTER_SEMUA,
  LIST_PAGE_SIZE,
  distinctPartKendaraan,
  distinctPartMerks,
  matchesPartFilter,
  paginateItems,
  parsePriceBound,
  summarizeParts,
  type PartFilter,
} from "@/app/lib/list-filter";
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
  FiRotateCcw,
} from "react-icons/fi";
import PageHeader from "../_components/PageHeader";
import KpiCard from "../_components/KpiCard";
import SearchBar from "../_components/SearchBar";
import DataTable from "../_components/DataTable";
import PaginationControls from "../_components/Pagination";
import RowActions from "../_components/RowActions";
import ConfirmDialog from "@/app/components/ConfirmDialog";

const FALLBACK_PARTS: Part[] = [
  {
    id: 1,
    part_number: "FLT-OIL-H130",
    nama_barang: "Filter Oli Mesin Diesel HD",
    merk: "Denso",
    kendaraan: "Hino Dutro 130 HD",
    harga: 145000,
    jasa: 50000,
  },
  {
    id: 2,
    part_number: "BRK-PAD-ISZ",
    nama_barang: "Brake Pad Front Set Heavy",
    merk: "Bendix",
    kendaraan: "Isuzu Giga FVR",
    harga: 850000,
    jasa: 150000,
  },
  {
    id: 3,
    part_number: "CLT-PLT-FUSO",
    nama_barang: "Clutch Disc / Kampas Kopling",
    merk: "Exedy",
    kendaraan: "Mitsubishi Fuso Fighter",
    harga: 1850000,
    jasa: 350000,
  },
  {
    id: 4,
    part_number: "FLT-FUEL-GEN",
    nama_barang: "Fuel Filter Priming Pump",
    merk: "Sakura",
    kendaraan: "Toyota Dyna 110 ET",
    harga: 180000,
    jasa: 45000,
  },
  {
    id: 5,
    part_number: "BELT-FAN-7PK",
    nama_barang: "V-Ribbed Alternator Fan Belt",
    merk: "Bando",
    kendaraan: "Hino Dutro / Ranger",
    harga: 220000,
    jasa: 75000,
  },
];

const selectClassName =
  "px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500";

const inputClassName =
  "w-28 px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500";

const PartsPage = () => {
  // Seluruh katalog (bukan hanya halaman aktif) — lihat app/lib/list-filter.ts.
  const [parts, setParts] = useState<Part[]>(FALLBACK_PARTS);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMerk, setSelectedMerk] = useState(FILTER_SEMUA);
  const [selectedKendaraan, setSelectedKendaraan] = useState(FILTER_SEMUA);
  // Teks mentah input harga — di-parse ke angka hanya saat memfilter.
  const [hargaMinRaw, setHargaMinRaw] = useState("");
  const [hargaMaxRaw, setHargaMaxRaw] = useState("");
  const [dataSource, setDataSource] = useState<"api" | "demo">("demo");
  const [deleteTarget, setDeleteTarget] = useState<Part | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchAllParts = async () => {
      setIsLoading(true);
      try {
        const all: Part[] = [];
        let page = 1;
        let lastPage = 1;
        do {
          const response = await apiClient.get<ApiResponse<Part>>(
            `/part?page=${page}&per_page=100`,
            { timeout: 3500 },
          );
          const paginated = response.data?.data;
          if (!paginated || !Array.isArray(paginated.data)) {
            throw new Error("Respons part tidak berbentuk paginasi");
          }
          all.push(...paginated.data);
          lastPage = paginated.last_page ?? 1;
          page += 1;
        } while (page <= lastPage);
        if (isMounted) {
          setParts(all);
          setDataSource("api");
        }
      } catch (error) {
        if (isMounted) {
          setDataSource("demo");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchAllParts();
    return () => {
      isMounted = false;
    };
  }, []);

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
        `Gagal menghapus part #${deleteTarget.id}. Data tidak dihapus, coba lagi.`,
      );
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const merkOptions = useMemo(() => distinctPartMerks(parts), [parts]);
  const kendaraanOptions = useMemo(() => distinctPartKendaraan(parts), [parts]);

  const filter: PartFilter = useMemo(
    () => ({
      ...DEFAULT_PART_FILTER,
      query: searchQuery,
      merk: selectedMerk,
      kendaraan: selectedKendaraan,
      hargaMin: parsePriceBound(hargaMinRaw),
      hargaMax: parsePriceBound(hargaMaxRaw),
    }),
    [searchQuery, selectedMerk, selectedKendaraan, hargaMinRaw, hargaMaxRaw],
  );

  const filteredParts = useMemo(
    () => parts.filter((p) => matchesPartFilter(p, filter)),
    [parts, filter],
  );

  // KPI dihitung dari SELURUH katalog, bukan halaman aktif (roadmap Hari 10).
  const stats = useMemo(() => summarizeParts(parts), [parts]);

  // Paginasi client-side atas hasil filter — halaman kosong adalah irisan
  // kosong (empty state), bukan data halaman sebelumnya (bug Hari 1–2).
  const page = useMemo(
    () => paginateItems(filteredParts, currentPage, LIST_PAGE_SIZE),
    [filteredParts, currentPage],
  );

  const isFilterActive =
    searchQuery.trim() !== "" ||
    selectedMerk !== FILTER_SEMUA ||
    selectedKendaraan !== FILTER_SEMUA ||
    hargaMinRaw.trim() !== "" ||
    hargaMaxRaw.trim() !== "";

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedMerk(FILTER_SEMUA);
    setSelectedKendaraan(FILTER_SEMUA);
    setHargaMinRaw("");
    setHargaMaxRaw("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-16">
      <SubPageHeader title="Manajemen Suku Cadang" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <PageHeader
          icon={<FiTool size={22} />}
          title="Katalog Suku Cadang Armada"
          subtitle="Inventaris sparepart, tarif suku cadang, dan biaya jasa pemasangan servis armada."
          accent="indigo"
          actions={
            <>
              <Link
                href="/invoicing-service"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
              >
                <FiArrowLeft /> Hub Invoicing
              </Link>
              <Link
                href="/invoicing-service/units"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
              >
                <FiTruck /> Unit
              </Link>
              <Link
                href="/invoicing-service/parts/create"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
              >
                <FiPlus size={15} /> Tambah Suku Cadang
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
            value={
              <span className="font-mono">
                {formatIDR(stats.totalInventoryValue)}
              </span>
            }
            hint="Harga dasar komponen"
            icon={<FiDollarSign />}
            accent="emerald"
            coloredValue
          />
          <KpiCard
            label="Rata-Rata Biaya Jasa"
            value={
              <span className="font-mono">{formatIDR(stats.avgJasa)}</span>
            }
            hint="Tarif pemasangan mekanik"
            icon={<FiTool />}
            accent="sky"
            coloredValue
          />
        </div>

        <SearchBar
          value={searchQuery}
          onChange={(value) => {
            setSearchQuery(value);
            setCurrentPage(1);
          }}
          placeholder="Cari berdasarkan nama part, nomor part (SKU), merk, atau tipe kendaraan..."
          accent="indigo"
        >
          <select
            value={selectedMerk}
            onChange={(e) => {
              setSelectedMerk(e.target.value);
              setCurrentPage(1);
            }}
            className={selectClassName}
            aria-label="Filter merk sparepart"
          >
            <option value={FILTER_SEMUA}>Semua Merk Sparepart</option>
            {merkOptions.map((merk) => (
              <option key={merk} value={merk}>
                {merk}
              </option>
            ))}
          </select>
          {dataSource === "demo" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              <FiActivity /> Demo Fallback
            </span>
          )}
        </SearchBar>

        {/* Filter lanjutan (Hari 10): tipe kendaraan + rentang harga komponen */}
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row md:flex-wrap items-stretch md:items-center gap-3">
          <div className="flex items-center gap-2">
            <label
              htmlFor="parts-kendaraan"
              className="text-xs font-semibold text-zinc-500 whitespace-nowrap"
            >
              Tipe Kendaraan
            </label>
            <select
              id="parts-kendaraan"
              value={selectedKendaraan}
              onChange={(e) => {
                setSelectedKendaraan(e.target.value);
                setCurrentPage(1);
              }}
              className={selectClassName}
            >
              <option value={FILTER_SEMUA}>Semua Tipe</option>
              {kendaraanOptions.map((kendaraan) => (
                <option key={kendaraan} value={kendaraan}>
                  {kendaraan}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="parts-harga-min"
              className="text-xs font-semibold text-zinc-500 whitespace-nowrap"
            >
              Harga (Rp)
            </label>
            <input
              id="parts-harga-min"
              type="number"
              min={0}
              inputMode="numeric"
              value={hargaMinRaw}
              onChange={(e) => {
                setHargaMinRaw(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Min"
              className={inputClassName}
              aria-label="Harga komponen minimum"
            />
            <span className="text-xs text-zinc-400">–</span>
            <input
              id="parts-harga-max"
              type="number"
              min={0}
              inputMode="numeric"
              value={hargaMaxRaw}
              onChange={(e) => {
                setHargaMaxRaw(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Maks"
              className={inputClassName}
              aria-label="Harga komponen maksimum"
            />
          </div>
          <button
            type="button"
            onClick={resetFilters}
            disabled={!isFilterActive}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FiRotateCcw size={13} /> Reset Filter
          </button>
        </div>

        {deleteError && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-sm text-red-600 dark:text-red-400">
            {deleteError}
          </div>
        )}

        <DataTable
          isLoading={isLoading}
          loadingText="Memuat data suku cadang..."
          isEmpty={page.pageItems.length === 0}
          emptyTitle="Tidak ada suku cadang yang cocok."
          emptyHint="Ubah kata kunci pencarian atau sesuaikan filter merk, tipe kendaraan, atau rentang harga."
          accent="indigo"
          footer={
            <PaginationControls
              currentPage={page.currentPage}
              hasNext={page.currentPage < page.totalPages}
              onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
              onNext={() => setCurrentPage((p) => p + 1)}
              summary={
                page.total === 0 ? (
                  <>Menampilkan 0 dari 0 item suku cadang</>
                ) : (
                  <>
                    Menampilkan {page.startIndex + 1}–{page.endIndex} dari{" "}
                    {page.total} item suku cadang
                    {page.total !== parts.length
                      ? ` (difilter dari ${parts.length} total)`
                      : ""}
                  </>
                )
              }
            />
          }
        >
          <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-left text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-950/80 text-zinc-600 dark:text-zinc-400 text-xs font-semibold">
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
              {page.pageItems.map((part) => (
                <tr
                  key={part.id}
                  className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap font-mono font-semibold text-xs text-indigo-600 dark:text-indigo-400">
                    {part.part_number || `SKU-${part.id}`}
                  </td>
                  <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-white">
                    {part.nama_barang}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-zinc-600 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                      {part.merk}
                    </span>
                    <div className="text-xs text-zinc-500">
                      {part.kendaraan}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono tabular-nums text-zinc-800 dark:text-zinc-200">
                    {formatIDR(part.harga || 0)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono tabular-nums text-zinc-500">
                    {formatIDR(part.jasa || 0)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
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
