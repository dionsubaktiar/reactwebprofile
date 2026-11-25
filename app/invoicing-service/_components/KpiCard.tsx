import type { ReactNode } from "react";
import type { HeaderAccent } from "./PageHeader";

const accentIcon: Record<HeaderAccent, string> = {
  indigo:
    "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400",
  emerald:
    "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400",
  sky: "bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400",
  amber:
    "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400",
  rose: "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400",
};

const accentValue: Record<HeaderAccent, string> = {
  indigo: "text-indigo-600 dark:text-indigo-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  sky: "text-sky-600 dark:text-sky-400",
  amber: "text-amber-600 dark:text-amber-400",
  rose: "text-rose-600 dark:text-rose-400",
};

interface KpiCardProps {
  label: string;
  /** Nilai utama KPI — angka dihitung dari data, bukan hardcode. */
  value: ReactNode;
  hint?: string;
  icon: ReactNode;
  accent?: HeaderAccent;
  /** Bila true, nilai memakai warna aksen; bila false, warna default. */
  coloredValue?: boolean;
}

/** Satu kartu KPI di atas list invoicing. */
export default function KpiCard({
  label,
  value,
  hint,
  icon,
  accent = "indigo",
  coloredValue = false,
}: KpiCardProps) {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
      <div>
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {label}
        </span>
        <div
          className={`text-2xl font-semibold mt-1 tabular-nums ${
            coloredValue ? accentValue[accent] : ""
          }`}
        >
          {value}
        </div>
        {hint ? (
          <span className="text-xs text-zinc-400">{hint}</span>
        ) : null}
      </div>
      <div
        className={`w-12 h-12 rounded-xl ${accentIcon[accent]} flex items-center justify-center text-xl`}
      >
        {icon}
      </div>
    </div>
  );
}
