// Service: reactwebprofile | File: app/pengajuan-kredit/create-konsumen/page.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";
import { useRouter } from "next/navigation";
import { HiUserAdd } from "react-icons/hi";

const CreateKonsumenPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    nama: "",
    nik: "",
    tanggal_lahir: "",
    status_perkawinan: "Single",
    data_pasangan: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await axios.get("/api/sanctum/csrf-cookie", { withCredentials: true });
      await axios.post("/api/bcaregister", formData, { withCredentials: true });
      router.push("/pengajuan-kredit");
    } catch {
      setTimeout(() => {
        router.push("/pengajuan-kredit");
      }, 700);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans antialiased">
      <Navbar title="Registrasi Konsumen" subtitle="Pendaftaran data identitas pemohon kredit" backUrl="/pengajuan-kredit" />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <div className="flex items-center gap-3 pb-5 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <HiUserAdd className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Data Identitas Pemohon
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Sesuai dengan Kartu Tanda Penduduk (KTP) resmi
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-xl bg-rose-50 p-4 text-xs font-semibold text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Nama Lengkap (KTP)
                </label>
                <input
                  type="text"
                  name="nama"
                  required
                  placeholder="Contoh: Dion Subaktiar"
                  value={formData.nama}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Nomor Induk Kependudukan (NIK)
                </label>
                <input
                  type="text"
                  name="nik"
                  required
                  placeholder="16 digit nomor KTP"
                  value={formData.nik}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Username Akun
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="dionsubaktiar"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Alamat Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="dion@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  name="tanggal_lahir"
                  required
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Status Perkawinan
                </label>
                <select
                  name="status_perkawinan"
                  value={formData.status_perkawinan}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                >
                  <option value="Single">Belum Menikah (Single)</option>
                  <option value="Married">Menikah (Married)</option>
                  <option value="Divorced">Cerai (Divorced)</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-xs font-bold text-white shadow-sm shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Menyimpan Data..." : "Registrasi Konsumen"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateKonsumenPage;
