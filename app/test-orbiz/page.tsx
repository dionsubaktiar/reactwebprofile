"use client";

import apiClient from "@/app/lib/api";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import SubPageHeader from "@/app/components/SubPageHeader";
import { FiSearch, FiLogIn, FiThumbsUp, FiBookOpen } from "react-icons/fi";
import { FALLBACK_BOOKS, type Book } from "./_books";

const MainPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    let isMounted = true;
    async function fetchDataBooks() {
      try {
        const response = await apiClient.get("/books");
        if (!isMounted) return;
        if (Array.isArray(response.data?.data)) {
          setBooks(response.data.data);
        } else {
          setBooks(FALLBACK_BOOKS);
        }
      } catch {
        if (isMounted) setBooks(FALLBACK_BOOKS);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchDataBooks();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLike = async (bookId: number) => {
    const wasLiked = likedIds.has(bookId);

    setLikedIds((prev) => {
      const next = new Set(prev);
      if (wasLiked) {
        next.delete(bookId);
      } else {
        next.add(bookId);
      }
      return next;
    });

    setBooks((prev) =>
      prev.map((b) => {
        if (b.id === bookId) {
          const current = b.likes_count ?? b.vote_count ?? 0;
          return {
            ...b,
            likes_count: wasLiked ? Math.max(0, current - 1) : current + 1,
          };
        }
        return b;
      })
    );

    try {
      await apiClient.get("/sanctum/csrf-cookie");
      await apiClient.post(`/books/likes/${bookId}`, {
        action: wasLiked ? "unlike" : "like",
      });
    } catch {
      // Rollback optimistic update on failure
      setLikedIds((prev) => {
        const next = new Set(prev);
        if (wasLiked) {
          next.add(bookId);
        } else {
          next.delete(bookId);
        }
        return next;
      });
      setBooks((prev) =>
        prev.map((b) => {
          if (b.id === bookId) {
            const current = b.likes_count ?? b.vote_count ?? 0;
            return {
              ...b,
              likes_count: wasLiked ? current + 1 : Math.max(0, current - 1),
            };
          }
          return b;
        })
      );
    }
  };

  const filteredBooks = useMemo(() => {
    if (!search.trim()) return books;
    const q = search.toLowerCase();
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        (b.genre && b.genre.toLowerCase().includes(q))
    );
  }, [books, search]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans antialiased">
      <SubPageHeader title="Koleksi Buku &amp; Rating" subtitle="Katalog literatur teknik &amp; sistem voting" />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Controls Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <FiBookOpen className="h-4 w-4" />
              <span>Katalog Terbuka</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Daftar Buku Rekomendasi
            </h1>
            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
              Jelajahi dan berikan apresiasi pada buku-buku rekayasa perangkat lunak terbaik.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari judul, penulis, genre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
              />
            </div>

            <Link
              href="/test-orbiz/login"
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
            >
              <FiLogIn className="h-4 w-4" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>

        {/* Content State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
            <p className="mt-3 text-xs text-slate-500 dark:text-zinc-400">
              Memuat katalog buku...
            </p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-zinc-800">
            <FiBookOpen className="mx-auto h-10 w-10 text-slate-400 dark:text-zinc-600" />
            <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
              Tidak ada buku yang cocok
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
              Coba kata kunci judul atau penulis lain.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => {
              const isLiked = likedIds.has(book.id);
              const count = book.likes_count ?? book.vote_count ?? 0;

              return (
                <div
                  key={book.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-colors duration-200 hover:border-indigo-500/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/80"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                        {book.genre || "Engineering"}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        #{book.id}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {book.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-slate-500 dark:text-zinc-400">
                      Oleh: {book.author}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-zinc-300">
                      {book.description || "Buku referensi arsitektur dan penulisan kode modern berkualitas industri."}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-zinc-800/80">
                    <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">
                      {count} Apresiasi
                    </span>
                    <button
                      type="button"
                      onClick={() => handleLike(book.id)}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                        isLiked
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-indigo-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
                      }`}
                    >
                      <FiThumbsUp className="h-4 w-4" />
                      <span>{isLiked ? "Liked" : "Like"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;
