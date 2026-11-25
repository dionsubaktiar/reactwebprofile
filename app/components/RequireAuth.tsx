"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authContext";

/**
 * Route guard client-side sementara (roadmap Hari 5).
 * Halaman yang dibungkus komponen ini hanya bisa dibuka bila sudah login;
 * bila belum, pengguna diarahkan ke /auth-crud/login.
 *
 * Ini lapisan sementara sampai guard middleware Next.js yang sesungguhnya
 * dipasang di Hari 15 — guard ini tidak menggantikan validasi token di
 * server, hanya mencegah halaman privat dibuka lewat navigasi/URL langsung
 * tanpa sesi login.
 */
export default function RequireAuth({ children }: { children: ReactNode }) {
  const { token, isRestoringAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isRestoringAuth && !token) {
      router.replace("/auth-crud/login");
    }
  }, [isRestoringAuth, token, router]);

  if (isRestoringAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Memeriksa sesi login...
          </p>
        </div>
      </div>
    );
  }

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
