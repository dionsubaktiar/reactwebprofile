"use client";

import Navbar from "@/app/components/navbar";
import apiClient from "@/app/lib/api";
import type { Unit, Pagination, ApiResponse } from "@/app/lib/types";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  FiTruck,
  FiPlus,
  FiUsers,
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiActivity,
  FiCheckCircle,
} from "react-icons/fi";
import PageHeader from "../_components/PageHeader";
import KpiCard from "../_components/KpiCard";
import SearchBar from "../_components/SearchBar";
import DataTable from "../_components/DataTable";
import PaginationControls from "../_components/Pagination";
import RowActions from "../_components/RowActions";
import ConfirmDialog from "../_components/ConfirmDialog";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataSource, setDataSource] = useState<"api" | "demo">("demo");
  const [deleteTarget, setDeleteTarget] = useState<Unit | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchUnits = async (page = 1) => {
      setIsLoading(true);
      try {
        const response = await apiClient.get<ApiResponse<Unit>>(
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

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await apiClient.delete(`/unit/${deleteTarget.id}`);
      setUnits((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (error) {
      console.error("Error deleting unit:", error);
      // Rollback: unit tetap di list, tampilkan error yang terlihat.
      setDeleteError(
        `Gagal menghapus unit ${deleteTarget.nopol}. Data tidak dihapus, coba lagi.`
      );
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
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
        <PageHeader
          icon={<FiTruck size={22} />}
          title="Armada &amp; Unit Kendaraan Servis"
          subtitle="Data unit truk kargo, driver penanggung jawab, spesifikasi armada, dan pemilik perusahaan."
          accent="emerald"
          actions={
            <>
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
            </>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KpiCard
            label="Total Armada Aktif"
            value={<>{stats.totalCount} Kendaraan</>}
            hint="Tergistrasi pada sistem"
            icon={<FiTruck />}
            accent="emerald"
          />
          <KpiCard
            label="Pelanggan Pemilik"
            value={<>{stats.uniqueCustomers} Perusahaan</>}
            hint="Entitas korporasi mitra"
            icon={<FiUsers />}
            accent="indigo"
            coloredValue
          />
          <KpiCard
            label="Armada Usia Prima"
            value={<>{stats.youngUnits} Unit</>}
            hint="Tahun rakitan ≥ 2022"
            icon={<FiCheckCircle />}
            accent="sky"
            coloredValue
          />
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari berdasarkan nopol kendaraan, tipe truk, driver, atau nama perusahaan pemilik..."
          accent="emerald"
        >
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
          loadingText="Memuat data armada kendaraan..."
          isEmpty={filteredUnits.length === 0}
          emptyTitle="Tidak ada unit yang sesuai pencarian."
          emptyHint="Coba gunakan kata kunci nomor polisi atau tipe truk lainnya."
          accent="emerald"
          footer={
            <PaginationControls
              currentPage={currentPage}
              hasNext={!!pagination?.next_page_url || dataSource === "api"}
              onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
              onNext={() => setCurrentPage((p) => p + 1)}
              summary={
                <>Menampilkan {filteredUnits.length} dari {units.length} unit armada</>
              }
            />
          }
        >
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
                    <RowActions
                      label={`Aksi untuk unit ${unit.nopol}`}
                      items={[
                        {
                          label: "Detail",
                          icon: <FiEye size={13} />,
                          href: `/invoicing-service/units/view?id=${unit.id}`,
                        },
                        {
                          label: "Edit",
                          icon: <FiEdit2 size={13} />,
                          href: `/invoicing-service/units/edit?id=${unit.id}`,
                        },
                        {
                          label: "Hapus",
                          icon: <FiTrash2 size={13} />,
                          danger: true,
                          onClick: () => setDeleteTarget(unit),
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
        title="Hapus Unit Armada"
        message={
          deleteTarget
            ? `Yakin ingin menghapus unit ${deleteTarget.nopol} (${deleteTarget.tipe})? Tindakan ini tidak bisa dibatalkan.`
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

export default UnitsPage;
