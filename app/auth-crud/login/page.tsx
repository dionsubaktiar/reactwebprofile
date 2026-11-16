// Service: reactwebprofile | File: app/auth-crud/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/navbar';
import { HiLockClosed, HiMail } from 'react-icons/hi';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/auth-crud');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <Navbar title="Autentikasi Akun" subtitle="Masuk untuk mengelola artikel dan otorisasi konten" />

      <main className="mx-auto flex max-w-md items-center justify-center px-4 py-12">
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Selamat Datang Kembali
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
            Masukkan kredensial akun terdaftar Anda untuk melanjutkan.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Alamat Email
              </label>
              <div className="relative mt-1">
                <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:border-blue-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Kata Sandi
              </label>
              <div className="relative mt-1">
                <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:border-blue-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              Masuk Sekarang
            </button>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-4 text-center text-xs text-slate-500 dark:border-zinc-800 dark:text-zinc-400">
            Belum memiliki akun?{' '}
            <Link href="/auth-crud/register" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
              Daftar disini
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}