"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import SubPageHeader from "@/app/components/SubPageHeader";
import ProfileCard from "@/app/components/ProfileCard";
import { useSearchParams } from "next/navigation";
import apiClient from "@/app/lib/api";
import { FiUser } from "react-icons/fi";

interface User {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  image: string | null;
}

const UserDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const hasValidId = Boolean(id);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(hasValidId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasValidId || !id) return;

    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/users/${id}`, { timeout: 3000 });
        if (!isMounted) return;
        if (response.data?.data) {
          setUser(response.data.data);
        } else {
          setError("Pengguna tidak ditemukan.");
        }
      } catch {
        if (isMounted) {
          setError("Pengguna tidak ditemukan atau gagal memuat profil.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [hasValidId, id]);

  const effectiveLoading = hasValidId && loading;
  const effectiveError = !hasValidId ? "ID pengguna tidak ditemukan di URL." : error;

  if (effectiveLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col font-sans">
        <SubPageHeader title="Detail Profil" backUrl="/users" />
        <div className="flex-1 flex flex-col items-center justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
          <p className="mt-3 text-xs text-slate-500 dark:text-zinc-400">
            Mengambil data profil...
          </p>
        </div>
      </div>
    );
  }

  if (effectiveError || !user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col font-sans">
        <SubPageHeader title="Detail Profil" backUrl="/users" />
        <div className="mx-auto max-w-md py-16 text-center space-y-3">
          <FiUser className="mx-auto h-12 w-12 text-zinc-400 dark:text-zinc-600" />
          <h2 className="text-base font-bold">Pengguna tidak ditemukan</h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            {effectiveError ?? "ID profil tidak valid atau telah dihapus."}
          </p>
          <Link
            href="/users"
            className="inline-block rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
          >
            Kembali ke Daftar Pengguna
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans antialiased">
      <SubPageHeader title="Detail Profil Pengguna" subtitle="Informasi akun dan pengaturan biodata" backUrl="/users" />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ProfileCard
          id={user.id}
          name={user.name}
          email={user.email}
          bio={user.bio}
          image={user.image}
        />
      </main>
    </div>
  );
};

const UserPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-zinc-950">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
        </div>
      }
    >
      <UserDetails />
    </Suspense>
  );
};

export default UserPage;
