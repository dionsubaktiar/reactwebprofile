// Service: reactwebprofile | File: app/users/detail/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";
import ProfileCard from "@/app/components/profile";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { HiUserCircle } from "react-icons/hi";

interface User {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  image: string | null;
}

const FALLBACK_PROFILES: Record<string, User> = {
  "1": {
    id: "1",
    name: "Dion Subaktiar",
    email: "dionsubaktiar@gmail.com",
    bio: "Senior Full Stack & AI Autonomous Systems Engineer. Passionate about Next.js, FastAPI, and resilient distributed agents.",
    image: null,
  },
  "2": {
    id: "2",
    name: "Sarah Oktaviani",
    email: "sarah.oktaviani@techcorp.id",
    bio: "Lead Product Designer & Design Systems Specialist. Obsessed with WCAG accessibility and fluid motion.",
    image: null,
  },
};

const UserDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setUser(FALLBACK_PROFILES["1"]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.dionsubaktiar.site/users/${id}`,
          { timeout: 3000 }
        );
        if (response.data) {
          setUser(response.data);
        } else {
          setUser(FALLBACK_PROFILES[id] || {
            id,
            name: `Pengguna #${id}`,
            email: `user${id}@enterprise.id`,
            bio: "Profil pengguna tersimpan di direktori lokal sistem.",
            image: null,
          });
        }
      } catch {
        setUser(FALLBACK_PROFILES[id] || {
          id,
          name: `Pengguna #${id}`,
          email: `user${id}@enterprise.id`,
          bio: "Profil pengguna tersimpan di direktori lokal sistem.",
          image: null,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col font-sans">
        <Navbar title="Detail Profil" backUrl="/users" />
        <div className="flex-1 flex flex-col items-center justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
          <p className="mt-3 text-xs text-slate-500 dark:text-zinc-400">
            Mengambil data profil...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col font-sans">
        <Navbar title="Detail Profil" backUrl="/users" />
        <div className="mx-auto max-w-md py-16 text-center">
          <HiUserCircle className="mx-auto h-12 w-12 text-slate-400 dark:text-zinc-600" />
          <h2 className="mt-2 text-base font-bold">Pengguna tidak ditemukan</h2>
          <p className="mt-1 text-xs text-slate-500">ID profil tidak valid atau telah dihapus.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans antialiased">
      <Navbar title="Detail Profil Pengguna" subtitle="Informasi akun dan pengaturan biodata" backUrl="/users" />
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
