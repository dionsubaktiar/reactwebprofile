"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiMenu,
  FiX,
  FiMoon,
  FiSun,
  FiArrowLeft,
} from "react-icons/fi";
import { useTheme } from "@/app/lib/theme";

export interface NavbarProps {
  readonly showBack?: boolean;
  readonly backUrl?: string;
  readonly className?: string;
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
  showBack,
  backUrl,
  className = "",
}: Readonly<NavbarProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const isLandingPage = pathname === "/";
  const shouldShowBack = showBack !== undefined ? showBack : !isLandingPage;

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl);
    } else if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/85 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/85 transition-colors duration-200 ${className}`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center gap-3">
          {shouldShowBack && (
            <button
              type="button"
              onClick={handleBack}
              aria-label="Kembali ke halaman sebelumnya"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 text-zinc-700 transition-colors hover:bg-zinc-200 hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              <FiArrowLeft className="h-4 w-4" />
            </button>
          )}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold tracking-tight text-zinc-900 dark:text-white transition-opacity hover:opacity-90"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-semibold text-white">
              DS
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
                Dion Subaktiar
              </span>
              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                Software Engineer
              </span>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {globalNavItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 border border-indigo-200/70 dark:bg-indigo-950/60 dark:text-indigo-400 dark:border-indigo-800/70 font-semibold"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-amber-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-amber-400"
          >
            {isDark ? (
              <FiSun className="h-4 w-4 text-amber-400" />
            ) : (
              <FiMoon className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            {isOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-zinc-200/80 bg-white/95 px-4 pt-3 pb-5 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/95">
          <div className="flex flex-col gap-1">
            {globalNavItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 font-semibold"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
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
