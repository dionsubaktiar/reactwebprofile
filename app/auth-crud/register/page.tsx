// Service: reactwebprofile | File: app/auth-crud/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../../components/navbar";
import Link from "next/link";
import { HiUserAdd, HiUser, HiMail, HiLockClosed } from "react-icons/hi";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      await axios.get("/api/sanctum/csrf-cookie", { withCredentials: true });
      await axios.post(
        "/api/register",
        { name, email, password },
        { withCredentials: true }
      );
      router.push("/auth-crud/login");
    } catch {
      router.push("/auth-crud/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans antialiased">
      <Navbar title="Registrasi Akun Baru" subtitle="Daftarkan akun untuk membuat artikel" backUrl="/auth-crud" />

      <main className="mx-auto flex max-w-md items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <HiUserAdd className="h-6 w-6" />
            </div>
            <h1 className="mt-4 text-xl font-extrabold text-slate-900 dark:text-white">
              Buat Akun Penulis
            </h1>
            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
              Daftar akun untuk mempublikasikan dan mengelola tulisan
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            className="mt-6 space-y-4"
          >
            <div>
              <label htmlFor="name" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Nama Lengkap
              </label>
              <div className="relative mt-1">
                <HiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-xs text-slate-900 placeholder-slate-400 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                  placeholder="Dion Subaktiar"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Alamat Email
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
                  placeholder="penulis@example.com"
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
              {isLoading ? "Mendaftarkan Akun..." : "Daftar Akun"}
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Sudah memiliki akun?{" "}
              <Link
                href="/auth-crud/login"
                className="font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
