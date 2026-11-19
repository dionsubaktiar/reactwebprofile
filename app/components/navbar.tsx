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
  showBack,
  backUrl,
  className = "",
  children,
}: Readonly<NavbarProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Di landing page ("/"), tombol kembali tidak boleh muncul secara default
  const isLandingPage = pathname === "/";
  const shouldShowBack = showBack !== undefined ? showBack : !isLandingPage;

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
      router.push("/");
    }
  };

  // Varian 1: Ketika dipanggil dengan prop `title` (Modul Header / Sub-page)
  if (title) {
    return (
      <header
        className={`mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/90 ${className}`}
      >
        <div className="flex items-center gap-3">
          {shouldShowBack && (
            <button
              type="button"
              onClick={handleBack}
              aria-label="Kembali ke halaman sebelumnya"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition-colors hover:bg-slate-100 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
            >
              <HiArrowLeft className="h-5 w-5" />
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
            aria-label="Home Portfolio"
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
          >
            <HiHome className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 hover:text-amber-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-amber-400"
          >
            {isDark ? (
              <HiSun className="h-5 w-5 text-amber-400" />
            ) : (
              <HiMoon className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>
    );
  }

  // Varian 2: Global Navbar Sticky
  return (
    <nav
      aria-label="Main navigation"
      className={`sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80 transition-colors duration-300 ${className}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand / Logo + Tombol Back jika di dalam sandbox */}
        <div className="flex items-center gap-3">
          {shouldShowBack && (
            <button
              type="button"
              onClick={handleBack}
              aria-label="Kembali ke halaman sebelumnya"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-700 transition hover:bg-slate-200 hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              <HiArrowLeft className="h-4 w-4" />
            </button>
          )}
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-bold tracking-tight text-slate-900 dark:text-white transition-opacity hover:opacity-90"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-sm font-black text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              DS
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white">
                Dion Subaktiar
              </span>
              <span className="text-[10px] font-medium tracking-wide text-indigo-600 dark:text-indigo-400">
                Software Engineer
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {globalNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 font-bold shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 hover:text-amber-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-amber-400"
          >
            {isDark ? (
              <HiSun className="h-4 w-4 text-amber-400" />
            ) : (
              <HiMoon className="h-4 w-4" />
            )}
          </button>

          {/* Mobile hamburger menu button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            {isOpen ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white/95 px-4 pt-3 pb-5 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/95">
          <div className="flex flex-col gap-1">
            {globalNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold tracking-wide transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 font-bold"
                      : "text-slate-700 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
