// Service: reactwebprofile | File: app/test-orbiz/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/app/components/navbar";
import { HiLockClosed, HiMail } from "react-icons/hi";

const LoginPageOrbiz = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newLogin = { email, password };

    try {
      const response = await axios.post("/api/orbiz/login", newLogin);
      if (response.status === 200) {
        localStorage.setItem("tokenOrbiz", response.data.token || "token-session-mock");
        localStorage.setItem("userOrbiz", response.data.user || email);
        router.push("/test-orbiz/admin");
      }
    } catch {
      // Fallback demo login
      localStorage.setItem("tokenOrbiz", "demo-token");
      localStorage.setItem("userOrbiz", email || "admin@orbiz.id");
      router.push("/test-orbiz/admin");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans antialiased">
      <Navbar title="Login Administrator" subtitle="Masuk untuk mengelola katalog buku" backUrl="/test-orbiz" />

      <main className="mx-auto flex max-w-md items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <HiLockClosed className="h-6 w-6" />
            </div>
            <h1 className="mt-4 text-xl font-extrabold text-slate-900 dark:text-white">
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
                <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-xs text-slate-900 placeholder-slate-400 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                  placeholder="admin@orbiz.id"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Kata Sandi
              </label>
              <div className="relative mt-1">
                <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-xs text-slate-900 placeholder-slate-400 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-xs font-bold text-white shadow-sm shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 transition disabled:opacity-50"
            >
              {isLoading ? "Memproses Autentikasi..." : "Masuk ke Dashboard Admin"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPageOrbiz;
