// Service: reactwebprofile | File: app/auth-crud/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar';
import { HiPlus, HiPencil, HiTrash, HiSearch, HiDocumentText } from 'react-icons/hi';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  status: 'Published' | 'Draft';
}

const initialArticles: Article[] = [
  {
    id: 1,
    title: 'Membangun Arsitektur Micro-Frontend Responsif di Next.js',
    excerpt: 'Panduan menyeluruh membagi modular web application dengan state terpusat.',
    author: 'Admin Developer',
    date: '2025-02-15',
    status: 'Published',
  },
  {
    id: 2,
    title: 'Optimasi Performansi LCP dan Core Web Vitals pada Dashboard',
    excerpt: 'Eksperimen benchmark Tailwind CSS tree shaking dan dynamic import.',
    author: 'Staff Editor',
    date: '2025-02-18',
    status: 'Published',
  },
  {
    id: 3,
    title: 'Strategi Autentikasi JWT & Role-Based Access Control',
    excerpt: 'Penerapan bearer token session management pada cloud client portal.',
    author: 'Security Lead',
    date: '2025-02-22',
    status: 'Draft',
  },
];

export default function AuthCrudPage() {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [search, setSearch] = useState('');

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <Navbar title="Modul Artikel CRUD" subtitle="Manajemen publikasi artikel, otorisasi, dan draft konten" />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-72">
            <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari judul / penulis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/auth-crud/login"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Portal Login
            </Link>
            <Link
              href="/auth-crud/create"
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              <HiPlus className="h-4 w-4" />
              <span>Tulis Artikel</span>
            </Link>
          </div>
        </div>

        {/* Responsive Table / Cards */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50/80 text-slate-500 dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Judul & Ringkasan</th>
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
                        <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                          <HiDocumentText className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{item.title}</p>
                          <p className="mt-0.5 text-[11px] text-slate-500 line-clamp-1 dark:text-zinc-400">
                            {item.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 font-medium text-slate-700 dark:text-zinc-300">
                      {item.author}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-slate-500 dark:text-zinc-400">
                      {item.date}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
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
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-blue-400"
                          title="Edit"
                        >
                          <HiPencil className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600 dark:text-zinc-400 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
                          title="Hapus"
                        >
                          <HiTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}