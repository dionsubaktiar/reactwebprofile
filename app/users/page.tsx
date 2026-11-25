"use client";

import { useEffect, useState, useMemo } from "react";
import SubPageHeader from "@/app/components/SubPageHeader";
import UserCard from "../components/UserCard";
import FloatingActionButton from "../components/FloatingActionButton";
import CreateUserModal from "../components/CreateUserModal";
import apiClient from "@/app/lib/api";
import { FiUsers, FiSearch, FiRefreshCw } from "react-icons/fi";

interface User {
  id: string;
  name: string;
  email: string;
}

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [reloadNonce, setReloadNonce] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.get("/users", { timeout: 4000 });
        if (!isMounted) return;
        const list = response.data?.data;
        if (Array.isArray(list)) {
          setUsers(list);
          setIsLive(true);
        } else {
          throw new Error("Respons daftar pengguna tidak valid.");
        }
      } catch {
        if (isMounted) {
          setIsLive(false);
          setError("Gagal memuat daftar pengguna dari server. Coba muat ulang.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUsers();
    return () => {
      isMounted = false;
    };
  }, [reloadNonce]);

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, search]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans antialiased">
      <SubPageHeader title="Manajemen Pengguna" subtitle="Direktori profil pengguna terdaftar dan otentikasi" />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Header & Search Bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <FiUsers className="h-4 w-4" />
              <span>Direktori Terintegrasi</span>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                  isLive
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                    : "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                }`}
              >
                {isLive ? "Live API" : "Simulated Dataset"}
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Daftar Profil Pengguna
            </h1>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Kelola, cari, dan perbarui data akun pengguna yang terdaftar di sistem.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Cari nama atau email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-9 pr-3 text-xs text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
              />
            </div>
            <button
              type="button"
              onClick={() => setReloadNonce((n) => n + 1)}
              title="Refresh Data"
              aria-label="Refresh Data"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 shadow-sm hover:bg-zinc-50 hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <FiRefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {error && !loading && (
          <div role="alert" className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300">
            {error}
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              Memuat data pengguna...
            </p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-800">
            <FiUsers className="mx-auto h-10 w-10 text-zinc-400 dark:text-zinc-600" />
            <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-white">
              Tidak ada pengguna ditemukan
            </h3>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Coba sesuaikan kata kunci pencarian Anda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user) => (
              <UserCard
                name={user.name}
                key={user.id}
                email={user.email}
                id={user.id}
              />
            ))}
          </div>
        )}

        {/* Floating Action Button */}
        <FloatingActionButton
          ariaLabel="Tambah user"
          onClick={() => setIsCreateOpen(true)}
        />
        <CreateUserModal
          isOpen={isCreateOpen}
          closeModal={() => setIsCreateOpen(false)}
          onCreated={() => setReloadNonce((n) => n + 1)}
        />
      </main>
    </div>
  );
};

export default UserPage;
