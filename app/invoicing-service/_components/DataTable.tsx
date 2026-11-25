import type { ReactNode } from "react";
import { FiAlertCircle } from "react-icons/fi";
import type { HeaderAccent } from "./PageHeader";

const spinner: Record<HeaderAccent, string> = {
  indigo: "border-indigo-500",
  emerald: "border-emerald-500",
  sky: "border-sky-500",
  amber: "border-amber-500",
  rose: "border-rose-500",
};

interface DataTableProps {
  isLoading: boolean;
  loadingText: string;
  isEmpty: boolean;
  emptyTitle: string;
  emptyHint?: string;
  accent?: HeaderAccent;
  /** Footer tabel, biasanya komponen Pagination. */
  footer?: ReactNode;
  children: ReactNode;
}

/**
 * Kartu tabel list invoicing: spinner saat memuat, empty state saat
 * tidak ada baris, lalu tabel (children) dan footer opsional.
 */
export default function DataTable({
  isLoading,
  loadingText,
  isEmpty,
  emptyTitle,
  emptyHint,
  accent = "indigo",
  footer,
  children,
}: DataTableProps) {
  return (
    <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
      {isLoading ? (
        <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-3">
          <div
            className={`w-8 h-8 border-2 ${spinner[accent]} border-t-transparent rounded-full animate-spin`}
          ></div>
          {loadingText}
        </div>
      ) : isEmpty ? (
        <div className="p-16 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-2">
          <FiAlertCircle size={28} className="text-zinc-400" />
          <p className="font-semibold text-zinc-700 dark:text-zinc-300">
            {emptyTitle}
          </p>
          {emptyHint ? <p className="text-xs">{emptyHint}</p> : null}
        </div>
      ) : (
        <div className="overflow-x-auto">{children}</div>
      )}
      {footer}
    </div>
  );
}
