// Service: reactwebprofile | File: app/users/page.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import Navbar from "../components/navbar";
import UserCard from "../components/userCard";
import FloatingActionButton from "../components/FloatingActionButton";
import CreateUserModal from "../components/createModal";
import axios from "axios";
import { HiUsers, HiSearch, HiRefresh, HiSparkles } from "react-icons/hi";

const profileUrl = "https://api.dionsubaktiar.site/users";

interface User {
  id: string;
  name: string;
  email: string;
}

const FALLBACK_USERS: User[] = [
  { id: "1", name: "Dion Subaktiar", email: "dionsubaktiar@gmail.com" },
  { id: "2", name: "Sarah Oktaviani", email: "sarah.oktaviani@techcorp.id" },
  { id: "3", name: "Bambang Sudiro", email: "bambang.s@logistikprima.co.id" },
  { id: "4", name: "Ahmad Rizky", email: "ahmad.rizky@architech.io" },
  { id: "5", name: "Dewi Lestari", email: "dewi.lestari@fintech.co.id" },
  { id: "6", name: "Hendro Wibowo", email: "hendro.wibowo@enterprise.net" },
];

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(profileUrl, { timeout: 4000 });
      if (Array.isArray(response.data) && response.data.length > 0) {
        setUsers(response.data);
        setIsLive(true);
      } else {
        setUsers(FALLBACK_USERS);
        setIsLive(false);
      }
    } catch {
      // Graceful fallback to verified sample users
      setUsers(FALLBACK_USERS);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
      <Navbar title="Manajemen Pengguna" subtitle="Direktori profil pengguna terdaftar dan otentikasi" />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Header & Search Bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <HiUsers className="h-4 w-4" />
              <span>Direktori Terintegrasi</span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  isLive
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                    : "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                }`}
              >
                <HiSparkles className="h-2.5 w-2.5" />
                {isLive ? "Live API" : "Simulated Dataset"}
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Daftar Profil Pengguna
            </h1>
            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
              Kelola, cari, dan perbarui data akun pengguna yang terdaftar di sistem.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama atau email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
              />
            </div>
            <button
              type="button"
              onClick={fetchUsers}
              title="Refresh Data"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-xs hover:bg-slate-50 hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <HiRefresh className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
            <p className="mt-3 text-xs text-slate-500 dark:text-zinc-400">
              Memuat data pengguna...
            </p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-zinc-800">
            <HiUsers className="mx-auto h-10 w-10 text-slate-400 dark:text-zinc-600" />
            <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
              Tidak ada pengguna ditemukan
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
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
        />
      </main>
    </div>
  );
};

export default UserPage;
