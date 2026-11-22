// Service: reactwebprofile | File: app/test-orbiz/admin/page.tsx
"use client";

import Navbar from "@/app/components/navbar";
import ConfirmDialog from "@/app/invoicing-service/_components/ConfirmDialog";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiPlus, HiTrash, HiLogout, HiBookOpen, HiUser } from "react-icons/hi";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  vote_count?: number;
  likes_count?: number;
}

const FALLBACK_BOOKS: Book[] = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", genre: "Software Engineering", likes_count: 42 },
  { id: 2, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", genre: "Distributed Systems", likes_count: 68 },
  { id: 3, title: "Refactoring", author: "Martin Fowler", genre: "Architecture", likes_count: 35 },
];

const AdminPage = () => {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [currentUser, setCurrentUser] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Book | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const user = localStorage.getItem("userOrbiz") || "Admin Orbiz";
    setCurrentUser(user);

    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/books");
        if (Array.isArray(res.data?.data) && res.data.data.length > 0) {
          setBooks(res.data.data);
        } else {
          setBooks(FALLBACK_BOOKS);
        }
      } catch {
        setBooks(FALLBACK_BOOKS);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tokenOrbiz");
    localStorage.removeItem("userOrbiz");
    router.push("/test-orbiz");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDelete = (id: number) => {
    setDeleteTarget(books.find((b) => b.id === id) ?? null);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await axios.delete(`/api/books/${deleteTarget.id}`);
      setBooks(books.filter((book) => book.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (error) {
      console.error("Error deleting customer:", error);
      // Rollback: buku tetap di list bila DELETE gagal.
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author) return;
    setIsSubmitting(true);

    const newBook: Book = {
      id: Date.now(),
      title: formData.title,
      author: formData.author,
      genre: formData.genre || "Engineering",
      likes_count: 0,
    };

    try {
      await axios.post("/api/books", newBook);
      setBooks((prev) => [newBook, ...prev]);
      setFormData({ title: "", author: "", genre: "" });
    } catch {
      setBooks((prev) => [newBook, ...prev]);
      setFormData({ title: "", author: "", genre: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans antialiased">
      <Navbar title="Manajemen Buku Admin" subtitle="Kelola katalog inventaris buku" backUrl="/test-orbiz" />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Top Header Card */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-sm shadow-indigo-500/20">
              <HiUser className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Masuk Sebagai:</p>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">{currentUser}</h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-400 dark:hover:bg-rose-950/40 transition"
          >
            <HiLogout className="h-4 w-4" />
            <span>Keluar Akun</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Card (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-zinc-800">
              <HiPlus className="text-indigo-600 dark:text-indigo-400" />
              <span>Tambah Buku Baru</span>
            </h3>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Judul Buku
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Contoh: Clean Architecture"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Nama Penulis
                </label>
                <input
                  type="text"
                  name="author"
                  required
                  placeholder="Contoh: Robert C. Martin"
                  value={formData.author}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Genre / Kategori
                </label>
                <input
                  type="text"
                  name="genre"
                  placeholder="Contoh: Architecture, DevOps"
                  value={formData.genre}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-xs font-bold text-white shadow-sm shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Menyimpan..." : "Tambahkan ke Katalog"}
              </button>
            </form>
          </div>

          {/* Table Card (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="p-5 border-b border-slate-100 dark:border-zinc-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <HiBookOpen className="text-indigo-600 dark:text-indigo-400" />
                  <span>Daftar Buku Terdaftar ({books.length})</span>
                </h3>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
                </div>
              ) : books.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 dark:text-zinc-400">
                  Belum ada buku terdaftar.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 dark:bg-zinc-950 dark:text-zinc-400 font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-3">Judul</th>
                        <th className="px-5 py-3">Penulis</th>
                        <th className="px-5 py-3">Genre</th>
                        <th className="px-5 py-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                      {books.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/50 transition">
                          <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">{b.title}</td>
                          <td className="px-5 py-3.5 text-slate-600 dark:text-zinc-400">{b.author}</td>
                          <td className="px-5 py-3.5">
                            <span className="rounded-lg bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                              {b.genre || "Engineering"}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <button
                              type="button"
                              onClick={() => handleDelete(b.id)}
                              className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                              title="Hapus Buku"
                            >
                              <HiTrash className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Hapus Buku"
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.title}"? Tindakan ini tidak bisa dibatalkan.`
            : ""
        }
        confirmLabel="Hapus"
        isBusy={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default AdminPage;
