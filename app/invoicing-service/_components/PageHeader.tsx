"use client";

import type { ReactNode } from "react";

export type HeaderAccent = "indigo" | "emerald" | "sky" | "amber" | "rose";

export const headerAccentIcon: Record<HeaderAccent, string> = {
  indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  sky: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

interface PageHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  accent?: HeaderAccent;
  /** Konten di atas baris judul, mis. link "Kembali". */
  above?: ReactNode;
  /** Tombol/aksi di sisi kanan header. */
  actions?: ReactNode;
}

/** Header halaman invoicing: ikon + judul + subjudul + aksi kanan. */
export default function PageHeader({
  icon,
  title,
  subtitle,
  accent = "indigo",
  above,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
      <div>
        {above}
        <div className="flex items-center gap-2">
          <span className={`p-2 rounded-xl ${headerAccentIcon[accent]}`}>
            {icon}
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            {title}
          </h1>
        </div>
        {subtitle ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {subtitle}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2.5">{actions}</div>
      ) : null}
    </div>
  );
}
