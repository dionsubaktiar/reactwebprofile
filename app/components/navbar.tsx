// Service: reactwebprofile | File: app/components/navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HiMenu,
  HiX,
  HiMoon,
  HiSun,
  HiArrowLeft,
  HiHome,
} from "react-icons/hi";

export interface NavbarProps {
  readonly title?: string;
  readonly subtitle?: string;
  readonly showBack?: boolean;
  readonly backUrl?: string;
  readonly className?: string;
  readonly children?: React.ReactNode;
  readonly [key: string]: unknown;
}

const globalNavItems = [
  { label: "Portofolio", href: "/" },
  { label: "Simulasi Cicilan", href: "/simulasi-cicilan" },
  { label: "Invoicing", href: "/invoicing-service" },
  { label: "Kredit Kendaraan", href: "/pengajuan-kredit" },
  { label: "PokeAPI", href: "/pokeapi" },
  { label: "Artikel CRUD", href: "/auth-crud" },
  { label: "BMI", href: "/bmi" },
];

export default function Navbar({
  title,
  subtitle,
  showBack = true,
  backUrl,
  className = "",
  children,
}: Readonly<NavbarProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl);
    } else if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/auth-crud");
    }
  };

  // Varian 1: Ketika dipanggil dengan prop `title` (Modul Header / Sub-page)
  if (title) {
    return (
      <header
        className={`mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/90 ${className}`}
      >
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              aria-label="Kembali"
            >
              <HiArrowLeft className="h-4 w-4" />
              <span>Kembali</span>
            </button>
          )}

          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {children}
          <Link
            href="/"
            className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <HiHome className="h-4 w-4 text-blue-600" />
            <span className="hidden sm:inline">Beranda</span>
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {isDark ? (
              <HiSun className="h-4 w-4 text-amber-400" />
            ) : (
              <HiMoon className="h-4 w-4" />
            )}
          </button>
        </div>
      </header>
    );
  }

  // Varian 2: Navigasi Global Utama (ketika tanpa prop `title`)
  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/80 ${className}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="rounded-lg bg-blue-600 px-2 py-1 text-sm font-extrabold text-white">
            RP
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            ReactWeb<span className="text-blue-600">Profile</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {globalNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                    : "text-slate-600 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="ml-3 rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {isDark ? (
              <HiSun className="h-4 w-4 text-amber-400" />
            ) : (
              <HiMoon className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Mobile Nav Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 dark:border-zinc-700 dark:text-zinc-300"
          >
            {isDark ? (
              <HiSun className="h-4 w-4 text-amber-400" />
            ) : (
              <HiMoon className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {isOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-3 md:hidden dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex flex-col gap-1">
            {globalNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                    : "text-slate-700 dark:text-zinc-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
