// Service: reactwebprofile | File: app/posts/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { HiViewGrid, HiViewList, HiTable, HiSearch } from 'react-icons/hi';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

type LayoutMode = 'grid' | 'list' | 'table';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState<LayoutMode>('grid');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=18');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Failed fetching posts:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Controls Bar */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
              JSONPlaceholder Posts
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
              Konsumsi data feed publik dengan dukungan dinamis Grid, List, dan Table layout.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px] flex-1 sm:w-64 sm:flex-none">
              <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
              />
            </div>

            {/* Layout Mode Switcher */}
            <div className="flex rounded-xl border border-slate-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900">
              <button
                type="button"
                onClick={() => setMode('grid')}
                title="Grid Mode"
                className={`rounded-lg p-2 transition ${
                  mode === 'grid'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
              >
                <HiViewGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setMode('list')}
                title="List Mode"
                className={`rounded-lg p-2 transition ${
                  mode === 'list'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
              >
                <HiViewList className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setMode('table')}
                title="Table Mode"
                className={`rounded-lg p-2 transition ${
                  mode === 'table'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
              >
                <HiTable className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Viewer */}
        {isLoading ? (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              />
            ))}
          </div>
        ) : mode === 'grid' ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <article
                key={post.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Post #{post.id}</span>
                  <h3 className="mt-2 text-base font-bold capitalize text-slate-900 line-clamp-2 dark:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 line-clamp-3 dark:text-zinc-400">
                    {post.body}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-400 dark:border-zinc-800">
                  <span>Author UID: {post.userId}</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Baca Lengkap &rarr;</span>
                </div>
              </article>
            ))}
          </div>
        ) : mode === 'list' ? (
          <div className="mt-8 space-y-4">
            {filtered.map((post) => (
              <article
                key={post.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:bg-slate-50/50 sm:flex-row sm:items-center dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/40"
              >
                <div className="pr-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                      #{post.id}
                    </span>
                    <h3 className="text-sm font-bold capitalize text-slate-900 dark:text-white">
                      {post.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-1 dark:text-zinc-400">
                    {post.body}
                  </p>
                </div>
                <div className="mt-3 text-xs font-semibold text-slate-400 sm:mt-0 sm:shrink-0">
                  User ID: {post.userId}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50/80 text-slate-600 dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-300">
                <tr>
                  <th className="px-4 py-3 font-semibold">ID</th>
                  <th className="px-4 py-3 font-semibold">Judul</th>
                  <th className="px-4 py-3 font-semibold">Konten</th>
                  <th className="px-4 py-3 font-semibold">Author</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 dark:divide-zinc-800 dark:text-zinc-300">
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/40">
                    <td className="px-4 py-3 font-bold text-blue-600 dark:text-blue-400">#{post.id}</td>
                    <td className="max-w-[200px] truncate px-4 py-3 font-semibold text-slate-900 dark:text-white">
                      {post.title}
                    </td>
                    <td className="max-w-[320px] truncate px-4 py-3 text-slate-500 dark:text-zinc-400">
                      {post.body}
                    </td>
                    <td className="px-4 py-3">{post.userId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}