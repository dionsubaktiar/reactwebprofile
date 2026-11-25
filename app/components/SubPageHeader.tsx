"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiArrowLeft, FiHome, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/app/lib/theme";

export interface SubPageHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly showBack?: boolean;
  readonly backUrl?: string;
  readonly className?: string;
  readonly children?: React.ReactNode;
}

export default function SubPageHeader({
  title,
  subtitle,
  showBack,
  backUrl,
  className = "",
  children,
}: Readonly<SubPageHeaderProps>) {
  const { isDark, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const shouldShowBack = showBack !== undefined ? showBack : pathname !== "/";

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
    <header
      className={`mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white/95 p-4 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95 ${className}`}
    >
      <div className="flex items-center gap-3">
        {shouldShowBack && (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Kembali ke halaman sebelumnya"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
          >
            <FiArrowLeft className="h-5 w-5" />
          </button>
        )}
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
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
          className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-zinc-200 px-3 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-indigo-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
        >
          <FiHome className="h-4 w-4" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-amber-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-amber-400"
        >
          {isDark ? (
            <FiSun className="h-5 w-5 text-amber-400" />
          ) : (
            <FiMoon className="h-5 w-5" />
          )}
        </button>
      </div>
    </header>
  );
}
