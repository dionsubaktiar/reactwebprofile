"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiMoreVertical } from "react-icons/fi";
import type { ReactNode } from "react";

export interface RowActionItem {
  label: string;
  icon?: ReactNode;
  /** Bila ada, item dirender sebagai Link; bila tidak, sebagai button onClick. */
  href?: string;
  onClick?: () => void;
  /** Item berbahaya (hapus) — teks merah. */
  danger?: boolean;
}

interface RowActionsProps {
  items: RowActionItem[];
  /** Label aksesibilitas tombol kebab. */
  label?: string;
}

/**
 * Menu aksi baris tabel (kebab): menutup saat klik di luar atau Escape,
 * `aria-expanded` untuk screen reader. Item hapus dirender merah dan
 * dipisah dari item biasa.
 */
export default function RowActions({
  items,
  label = "Pilihan aksi",
}: RowActionsProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open ]);

  const normal = items.filter((i) => !i.danger);
  const dangerous = items.filter((i) => i.danger);

  const renderItem = (item: RowActionItem) => {
    const className = `w-full flex items-center gap-2 px-3 py-1.5 text-xs ${
      item.danger
        ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
    }`;
    const content = (
      <>
        {item.icon}
        {item.label}
      </>
    );
    const close = () => setOpen(false);
    if (item.href) {
      return (
        <Link
          key={item.label}
          href={item.href}
          onClick={close}
          className={className}
        >
          {content}
        </Link>
      );
    }
    return (
      <button
        key={item.label}
        onClick={() => {
          close();
          item.onClick?.();
        }}
        className={className}
      >
        {content}
      </button>
    );
  };

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="menu"
        className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition"
      >
        <FiMoreVertical size={16} />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-1 w-40 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl z-50 py-1 divide-y divide-zinc-100 dark:divide-zinc-800"
        >
          {normal.length > 0 && (
            <div className="py-1">{normal.map(renderItem)}</div>
          )}
          {dangerous.length > 0 && (
            <div className="py-1">{dangerous.map(renderItem)}</div>
          )}
        </div>
      )}
    </div>
  );
}
