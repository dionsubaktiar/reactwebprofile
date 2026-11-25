"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import RequireAuth from "@/app/components/RequireAuth";

// Rute auth-crud yang TIDAK butuh login: halaman login, register, dan
// callback OAuth (callback justru yang menetapkan sesi login).
const PUBLIC_PATHS = [
  "/auth-crud/login",
  "/auth-crud/register",
  "/auth-crud/callback",
];

export default function AuthCrudLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return <>{children}</>;
  }

  return <RequireAuth>{children}</RequireAuth>;
}
