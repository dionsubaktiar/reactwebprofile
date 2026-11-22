"use client";

import type { ReactNode } from "react";
import { FiSearch } from "react-icons/fi";
import type { HeaderAccent } from "./PageHeader";

const ring: Record<HeaderAccent, string> = {
  indigo: "focus:ring-indigo-500",
  emerald: "focus:ring-emerald-500",
  sky: "focus:ring-sky-500",
  amber: "focus:ring-amber-500",
  rose: "focus:ring-rose-500",
};

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  accent?: HeaderAccent;
  /** Konten kanan bar pencarian, mis. select filter atau badge sumber data. */
  children?: ReactNode;
}

/** Bar pencarian list invoicing (kartu + input + konten kanan opsional). */
export default function SearchBar({
  value,
  onChange,
  placeholder,
  accent = "indigo",
  children,
}: SearchBarProps) {
  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      <div className="relative flex-1">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 ${ring[accent]}`}
        />
      </div>
      {children ? (
        <div className="flex items-center gap-3">{children}</div>
      ) : null}
    </div>
  );
}
