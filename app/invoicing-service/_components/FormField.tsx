"use client";

import type { ReactNode } from "react";
import type { HeaderAccent } from "./PageHeader";

const ring: Record<HeaderAccent, string> = {
  indigo: "focus:ring-indigo-500",
  emerald: "focus:ring-emerald-500",
  sky: "focus:ring-sky-500",
  amber: "focus:ring-amber-500",
  rose: "focus:ring-rose-500",
};

/** Kelas input/select form invoicing (tema zinc light/dark). */
export function formControlClass(accent: HeaderAccent = "emerald"): string {
  return `mt-1 p-2.5 w-full rounded-xl text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 ${ring[accent]} transition`;
}

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string | null;
  children: ReactNode;
}

/** Label + kontrol form + pesan error — satu pola untuk semua form invoicing. */
export default function FormField({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
      >
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p className="text-[11px] text-zinc-400 mt-1">{hint}</p>
      ) : null}
      {error ? (
        <p className="text-xs text-red-600 dark:text-red-400 mt-1">{error}</p>
      ) : null}
    </div>
  );
}
