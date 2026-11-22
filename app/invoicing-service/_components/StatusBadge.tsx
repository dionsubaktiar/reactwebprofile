"use client";

import { FiCheckCircle, FiClock } from "react-icons/fi";
import type { InvoiceStatus, SpkStatus } from "@/app/lib/types";

const tone: Record<string, string> = {
  Lunas:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  Selesai:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  Pending:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  "Dalam Pengerjaan":
    "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20",
};

const fallbackTone =
  "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border border-zinc-500/20";

interface StatusBadgeProps {
  status: InvoiceStatus | SpkStatus | string;
}

/** Badge status invoice/SPK — warna dari union type, bukan string bebas. */
export default function StatusBadge({ status }: StatusBadgeProps) {
  const done = status === "Lunas" || status === "Selesai";
  const Icon = done ? FiCheckCircle : FiClock;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
        tone[status] ?? fallbackTone
      }`}
    >
      <Icon size={11} />
      {status}
    </span>
  );
}
