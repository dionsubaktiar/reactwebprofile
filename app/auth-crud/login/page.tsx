'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import SubPageHeader from "@/app/components/SubPageHeader";
import { FiLock, FiMail } from "react-icons/fi";
import { FiAlertCircle } from 'react-icons/fi';
import apiClient from '@/app/lib/api';
import { useAuth } from '@/app/context/authContext';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await apiClient.post('/orbiz/login', { email, password });
      const { access_token: token, user } = res.data ?? {};
      if (!token || !user) {
        throw new Error('Respons login tidak lengkap.');
      }
      // Simpan token + user lewat satu sumber (authContext / api.ts),
      // supaya request berikutnya membawa header Authorization: Bearer.
      setAuth(user, token);
      router.push('/auth-crud');
    } catch (err) {
      // Kredensial salah (401) atau form kosong (400) ditolak mock —
      // tampilkan pesan dan JANGAN redirect seolah berhasil.
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(String(err.response.data.message));
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login gagal. Periksa koneksi lalu coba lagi.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <SubPageHeader title="Autentikasi Akun" subtitle="Masuk untuk mengelola artikel dan otorisasi konten" />

      <main className="mx-auto flex max-w-md items-center justify-center px-4 py-12">
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Selamat Datang Kembali
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
            Masukkan kredensial akun terdaftar Anda untuk melanjutkan.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="auth-login-email" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Alamat Email
              </label>
              <div className="relative mt-1">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="auth-login-email"
                  type="email"
                  required
                  placeholder="admin@orbiz.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="auth-login-password" className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Kata Sandi
              </label>
              <div className="relative mt-1">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="auth-login-password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
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
              disabled={isSubmitting}
              className="mt-2 w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Memeriksa...' : 'Masuk Sekarang'}
            </button>
          </form>

          <p className="mt-4 rounded-xl bg-slate-50 p-3 text-center text-xs leading-relaxed text-slate-500 dark:bg-zinc-950 dark:text-zinc-400">
            Akun demo (mode mock): <span className="font-semibold text-slate-700 dark:text-zinc-200">admin@orbiz.com</span> / <span className="font-semibold text-slate-700 dark:text-zinc-200">admin123</span>
          </p>

          <div className="mt-6 border-t border-slate-100 pt-4 text-center text-xs text-slate-500 dark:border-zinc-800 dark:text-zinc-400">
            Belum memiliki akun?{' '}
            <Link href="/auth-crud/register" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
              Daftar disini
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
