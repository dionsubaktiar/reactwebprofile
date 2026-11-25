"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import apiClient from "@/app/lib/api";
import SubPageHeader from "@/app/components/SubPageHeader";
import { FiLock, FiMail } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";

const LoginPageOrbiz = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/orbiz/login", { email, password });
      const { access_token: token, user } = response.data ?? {};
      if (!token || !user) {
        throw new Error("Respons login tidak lengkap.");
      }
      localStorage.setItem("tokenOrbiz", String(token));
      localStorage.setItem("userOrbiz", user.name || user.email || email);
      router.push("/test-orbiz/admin");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(String(err.response.data.message));
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login gagal. Periksa kredensial Anda lalu coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans antialiased">
      <SubPageHeader title="Login Administrator" subtitle="Masuk untuk mengelola katalog buku" backUrl="/test-orbiz" />

      <main className="mx-auto flex max-w-md items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <FiLock className="h-6 w-6" />
            </div>
            <h1 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              Autentikasi Katalog Orbiz
            </h1>
            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
              Masukkan akun staf atau kredensial demo untuk mengelola buku
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Email Administrator
              </label>
              <div className="relative mt-1">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-xs text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                  placeholder="admin@orbiz.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Kata Sandi
              </label>
              <div className="relative mt-1">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-xs text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div
                role="alert"
                aria-live="polite"
                className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300"
              >
                <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {isLoading ? "Memproses Autentikasi..." : "Masuk ke Dashboard Admin"}
            </button>
          </form>

          <p className="mt-4 rounded-xl bg-slate-50 p-3 text-center text-xs leading-relaxed text-slate-500 dark:bg-zinc-950 dark:text-zinc-400">
            Akun demo (mode mock): <span className="font-semibold text-slate-700 dark:text-zinc-200">admin@orbiz.com</span> / <span className="font-semibold text-slate-700 dark:text-zinc-200">admin123</span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPageOrbiz;
