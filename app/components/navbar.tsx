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
        className={`mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 ${className}`}
      >
        <div className="flex items-center gap-3">
          {shouldShowBack && (
            <button
              type="button"
              onClick={handleBack}
              aria-label="Kembali ke halaman sebelumnya"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 bg-stone-50 text-stone-700 transition-colors hover:bg-stone-100 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 dark:hover:text-stone-50"
            >
              <HiArrowLeft className="h-4 w-4" />
            </button>
          )}
          <div>
            <h1 className="text-lg font-medium tracking-tight text-stone-900 dark:text-stone-50 sm:text-xl">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-stone-500 dark:text-stone-400">
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
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-stone-200 px-3 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-100 hover:text-emerald-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 dark:hover:text-stone-50"
          >
            <HiHome className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 bg-stone-50 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700 dark:hover:text-stone-50"
          >
            {isDark ? (
              <HiSun className="h-4 w-4" />
            ) : (
              <HiMoon className="h-4 w-4" />
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
      className={`sticky top-0 z-50 w-full border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950 transition-colors duration-200 ${className}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand / Logo + Tombol Back jika di dalam sandbox */}
        <div className="flex items-center gap-3">
          {shouldShowBack && (
            <button
              type="button"
              onClick={handleBack}
              aria-label="Kembali ke halaman sebelumnya"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-stone-100 text-stone-700 transition-colors hover:bg-stone-200 hover:text-emerald-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-50"
            >
              <HiArrowLeft className="h-4 w-4" />
            </button>
          )}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-medium tracking-tight text-stone-900 dark:text-stone-50 transition-colors hover:text-emerald-700 dark:hover:text-emerald-400"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-sm font-semibold text-white">
              DS
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-50">
                Dion Subaktiar
              </span>
              <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                Software Engineer
              </span>
            </span>
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
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-stone-100 text-emerald-700 dark:bg-stone-800 dark:text-emerald-400"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-50"
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-stone-50 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-50"
          >
            {isDark ? (
              <HiSun className="h-4 w-4" />
            ) : (
              <HiMoon className="h-4 w-4" />
            )}
          </button>

          {/* Mobile hamburger menu button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-900 transition-colors"
          >
            {isOpen ? <HiX className="h-4 w-4" /> : <HiMenu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 dark:border-stone-800 dark:bg-stone-950">
          <div className="flex flex-col gap-1">
            {globalNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-stone-100 text-emerald-700 dark:bg-stone-800 dark:text-emerald-400"
                      : "text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
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
