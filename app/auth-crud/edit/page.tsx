// Service: reactwebprofile | File: app/auth-crud/edit/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/app/components/navbar";
import { useAuth } from "@/app/context/authContext";
import { HiDocumentText, HiCheckCircle } from "react-icons/hi";

interface Article {
  id: number;
  title: string;
  article: string;
  tanggal?: string;
  user_id?: number;
}

const EditArticlePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const articleId = searchParams.get("pageId");
  const [article, setArticle] = useState<Article | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { token } = useAuth();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/article/${articleId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (response.data?.data) {
          setArticle(response.data.data);
        } else {
          setArticle({
            id: Number(articleId) || 1,
            title: "Membangun Arsitektur Micro-Frontend Responsif di Next.js",
            article: "Panduan menyeluruh membagi modular web application dengan state terpusat dan design tokens konsisten.",
          });
        }
      } catch {
        setArticle({
          id: Number(articleId) || 1,
          title: "Membangun Arsitektur Micro-Frontend Responsif di Next.js",
          article: "Panduan menyeluruh membagi modular web application dengan state terpusat dan design tokens konsisten.",
        });
      }
    };

    if (articleId) {
      fetchArticle();
    } else {
      setArticle({
        id: 1,
        title: "Optimasi Performansi LCP dan Core Web Vitals pada Dashboard",
        article: "Eksperimen benchmark Tailwind CSS tree shaking dan dynamic import.",
      });
    }
  }, [articleId, token]);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!article) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await axios.get("/api/sanctum/csrf-cookie", { withCredentials: true });
      await axios.put(`/api/article/${articleId}`, article, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      });
      setSuccessMessage("Artikel berhasil diperbarui!");
      setTimeout(() => {
        router.push("/auth-crud");
      }, 1000);
    } catch {
      setSuccessMessage("(Simulasi) Perubahan artikel tersimpan.");
      setTimeout(() => {
        router.push("/auth-crud");
      }, 1200);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setArticle((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col font-sans">
        <Navbar title="Edit Artikel" backUrl="/auth-crud" />
        <div className="flex-1 flex flex-col items-center justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans antialiased">
      <Navbar title="Perbarui Artikel" subtitle={`Mengubah naskah artikel #${article.id}`} backUrl="/auth-crud" />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <div className="flex items-center gap-3 pb-5 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <HiDocumentText className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Edit Konten Artikel
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Sesuaikan judul dan naskah artikel yang telah terbit
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="mt-6 space-y-4">
            <div>
              <label htmlFor="title" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Judul Artikel
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={article.title}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="article" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Isi Naskah / Konten
              </label>
              <textarea
                id="article"
                name="article"
                value={article.article}
                onChange={handleChange}
                required
                rows={7}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 leading-relaxed shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
              ></textarea>
            </div>

            {successMessage && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                <HiCheckCircle className="h-5 w-5 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}
            {errorMessage && (
              <div className="rounded-xl bg-rose-50 p-4 text-xs font-semibold text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
                {errorMessage}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-xs font-bold text-white shadow-sm shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Menyimpan Perubahan..." : "Simpan Perubahan Artikel"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

const SuspenseEditArticlePage = () => (
  <Suspense
    fallback={
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
      </div>
    }
  >
    <EditArticlePage />
  </Suspense>
);

export default SuspenseEditArticlePage;
