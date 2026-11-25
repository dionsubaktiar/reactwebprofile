'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SubPageHeader from "@/app/components/SubPageHeader";
import ConfirmDialog from "@/app/components/ConfirmDialog";
import apiClient from '@/app/lib/api';
import { useAuth } from '@/app/context/authContext';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFileText, FiLogOut } from "react-icons/fi";

interface Article {
  id: number;
  title: string;
  article?: string;
  excerpt?: string;
  author: string;
  created_at?: string;
  date?: string;
  status: 'Published' | 'Draft';
}

export default function AuthCrudPage() {
  const { logout } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<Article | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchArticles = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const response = await apiClient.get('/article');
        const list = response.data?.data;
        if (!Array.isArray(list)) {
          throw new Error('Format respons artikel tidak valid.');
        }
        if (isMounted) setArticles(list);
      } catch {
        if (isMounted) {
          setLoadError('Gagal memuat daftar artikel. Periksa koneksi lalu coba lagi.');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchArticles();
    return () => {
      isMounted = false;
    };
  }, [reloadNonce]);

  const handleDelete = (id: number) => {
    setDeleteTarget(articles.find((a) => a.id === id) ?? null);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await apiClient.delete(`/article/${deleteTarget.id}`);
      setArticles((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {
      setDeleteError(`Gagal menghapus artikel "${deleteTarget.title}". Data tidak dihapus.`);
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <SubPageHeader title="Modul Artikel CRUD" subtitle="Manajemen publikasi artikel, otorisasi, dan draft konten" />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-72">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari judul / penulis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-600 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              <FiLogOut className="h-4 w-4" />
              <span>Keluar</span>
            </button>
            <Link
              href="/auth-crud/create"
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-indigo-700"
            >
              <FiPlus className="h-4 w-4" />
              <span>Tulis Artikel</span>
            </Link>
          </div>
        </div>

        {loadError && (
          <div
            role="alert"
            className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300"
          >
            <span>{loadError}</span>
            <button
              type="button"
              onClick={() => setReloadNonce((n) => n + 1)}
              className="rounded-lg bg-rose-600 px-3 py-1.5 font-semibold text-white hover:bg-rose-700"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {deleteError && (
          <div
            role="alert"
            className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300"
          >
            {deleteError}
          </div>
        )}

        {/* Responsive Table / Cards */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
              <p className="mt-3 text-xs text-slate-500 dark:text-zinc-400">Memuat artikel...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500 dark:text-zinc-400">
              Tidak ada artikel yang cocok dengan pencarian.
            </div>
          ) : (
            <div className="overflow-x-auto shadow-inner rounded-lg border border-slate-200 dark:border-zinc-800">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 bg-slate-50/80 text-slate-500 dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-400">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Judul &amp; Ringkasan</th>
                    <th className="px-5 py-3 font-semibold">Penulis</th>
                    <th className="px-5 py-3 font-semibold">Tanggal</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 text-right font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-zinc-800/30">
                      <td className="max-w-xs px-5 py-3.5 sm:max-w-md">
                        <div className="flex items-start gap-3">
                          <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                            <FiFileText className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">{item.title}</p>
                            <p className="mt-0.5 text-xs text-slate-500 line-clamp-1 dark:text-zinc-400">
                              {item.excerpt ?? item.article ?? ''}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 font-medium text-slate-700 dark:text-zinc-300">
                        {item.author}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-slate-500 dark:text-zinc-400">
                        {item.created_at ?? item.date ?? '-'}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5">
                        <span
                          className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                            item.status === 'Published'
                              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                              : 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-right">
                        <div className="inline-flex items-center gap-1">
                          <Link
                            href={`/auth-crud/edit?id=${item.id}`}
                            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-indigo-600 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-indigo-400"
                            title="Edit"
                          >
                            <FiEdit2 className="h-4 w-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600 dark:text-zinc-400 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
                            title="Hapus"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Hapus Artikel"
        message={
          deleteTarget
            ? `Apakah Anda yakin ingin menghapus artikel "${deleteTarget.title}"? Tindakan ini tidak bisa dibatalkan.`
            : ""
        }
        confirmLabel="Hapus"
        isBusy={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
