"use client";

import type { ReactNode } from "react";

interface PaginationProps {
  currentPage: number;
  /** Tombol "Selanjutnya" aktif bila true. */
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  summary: ReactNode;
}

/** Footer paginasi list invoicing. */
export default function Pagination({
  currentPage,
  hasNext,
  onPrev,
  onNext,
  summary,
}: PaginationProps) {
  return (
    <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="text-xs text-zinc-500">{summary}</span>
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage <= 1}
          onClick={onPrev}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-zinc-300 dark:border-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          Sebelumnya
        </button>
        <span className="text-xs font-mono font-bold px-2">
          Halaman {currentPage}
        </span>
        <button
          disabled={!hasNext}
          onClick={onNext}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-zinc-300 dark:border-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
}
