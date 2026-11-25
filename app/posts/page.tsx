'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FiGrid, FiList, FiColumns, FiSearch } from 'react-icons/fi';

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
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchPosts() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=18', {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        if ((err as { name?: string })?.name !== 'AbortError') {
          setError('Gagal memuat data artikel dari JSONPlaceholder.');
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
    return () => controller.abort();
  }, []);

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Controls Bar */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
              JSONPlaceholder Posts
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Konsumsi data feed publik dengan dukungan dinamis Grid, List, dan Table layout.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px] flex-1 sm:w-64 sm:flex-none">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white py-2 pl-9 pr-3 text-xs text-zinc-900 placeholder-zinc-400 focus:border-indigo-600 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
              />
            </div>

            {/* Layout Mode Switcher */}
            <div className="flex rounded-xl border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900">
              <button
                type="button"
                onClick={() => setMode('grid')}
                title="Grid Mode"
                aria-label="Grid Mode"
                className={`rounded-lg p-2 transition-colors ${
                  mode === 'grid'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
              >
                <FiGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setMode('list')}
                title="List Mode"
                aria-label="List Mode"
                className={`rounded-lg p-2 transition-colors ${
                  mode === 'list'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
              >
                <FiList className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setMode('table')}
                title="Table Mode"
                aria-label="Table Mode"
                className={`rounded-lg p-2 transition-colors ${
                  mode === 'table'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
              >
                <FiColumns className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Viewer */}
        {error ? (
          <div role="alert" className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-xs font-medium text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300">
            {error}
          </div>
        ) : isLoading ? (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 p-12 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            Tidak ada artikel yang cocok dengan pencarian Anda.
          </div>
        ) : mode === 'grid' ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <article
                key={post.id}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tabular-nums">Post #{post.id}</span>
                  <h3 className="mt-2 text-base font-semibold capitalize text-zinc-900 line-clamp-2 dark:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-500 line-clamp-3 dark:text-zinc-400">
                    {post.body}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs text-zinc-400 dark:border-zinc-800">
                  <span>Author UID: {post.userId}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedPost(post)}
                    className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    Baca Lengkap &rarr;
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : mode === 'list' ? (
          <div className="mt-8 space-y-4">
            {filtered.map((post) => (
              <article
                key={post.id}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-colors hover:bg-zinc-50/50 sm:flex-row sm:items-center dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/40"
              >
                <div className="pr-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-semibold tabular-nums text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                      #{post.id}
                    </span>
                    <h3 className="text-sm font-semibold capitalize text-zinc-900 dark:text-white">
                      {post.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 line-clamp-1 dark:text-zinc-400">
                    {post.body}
                  </p>
                </div>
                <div className="mt-3 text-xs font-semibold text-zinc-400 sm:mt-0 sm:shrink-0">
                  User ID: {post.userId}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-200 bg-zinc-50/80 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-300">
                <tr>
                  <th className="px-4 py-3 font-semibold">ID</th>
                  <th className="px-4 py-3 font-semibold">Judul</th>
                  <th className="px-4 py-3 font-semibold">Konten</th>
                  <th className="px-4 py-3 font-semibold">Author</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700 dark:divide-zinc-800 dark:text-zinc-300">
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40">
                    <td className="px-4 py-3 font-semibold tabular-nums text-indigo-600 dark:text-indigo-400">#{post.id}</td>
                    <td className="max-w-[200px] truncate px-4 py-3 font-semibold text-zinc-900 dark:text-white">
                      {post.title}
                    </td>
                    <td className="max-w-[320px] truncate px-4 py-3 text-zinc-500 dark:text-zinc-400">
                      {post.body}
                    </td>
                    <td className="px-4 py-3 tabular-nums">{post.userId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Post #{selectedPost.id} &bull; Author UID {selectedPost.userId}
            </span>
            <h2 className="mt-2 text-lg font-semibold capitalize text-zinc-900 dark:text-white">
              {selectedPost.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {selectedPost.body}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}