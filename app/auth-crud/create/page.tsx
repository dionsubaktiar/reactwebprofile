"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import apiClient from "@/app/lib/api";
import SubPageHeader from "@/app/components/SubPageHeader";
import { useAuth } from "../../context/authContext";
import { FiFileText, FiCheckCircle } from "react-icons/fi";

const CreateArticlePage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    article: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const authorName = user?.name || "Admin Developer";

    try {
      await apiClient.get("/sanctum/csrf-cookie");
      await apiClient.post("/article", { ...formData, author: authorName });

      setSuccessMessage("Artikel berhasil diterbitkan!");
      setFormData({ title: "", article: "" });
      setTimeout(() => {
        router.push("/auth-crud");
      }, 800);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setErrorMessage(String(err.response.data.message));
      } else {
        setErrorMessage("Gagal menerbitkan artikel. Periksa koneksi atau isian lalu coba lagi.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans antialiased">
      <SubPageHeader title="Publikasikan Artikel Baru" subtitle="Formulir pembuatan konten dan artikel blog" backUrl="/auth-crud" />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <div className="flex items-center gap-3 pb-5 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <FiFileText className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Konten &amp; Naskah Artikel
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Tuliskan judul persuasif dan isi artikel lengkap
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="title" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Judul Artikel
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Contoh: Menguasai Next.js Server Components"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="article" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Isi Naskah / Konten
              </label>
              <textarea
                id="article"
                name="article"
                value={formData.article}
                onChange={handleChange}
                required
                rows={7}
                placeholder="Tuliskan isi artikel Anda di sini..."
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 leading-relaxed shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
              ></textarea>
            </div>

            {successMessage && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                <FiCheckCircle className="h-5 w-5 shrink-0" />
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
                className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Menerbitkan..." : "Terbitkan Artikel"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateArticlePage;
