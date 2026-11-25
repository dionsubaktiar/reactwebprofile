"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import axios from "axios";
import apiClient from "@/app/lib/api";
import { FiX, FiUserPlus, FiMail, FiUser } from "react-icons/fi";

interface User {
  name: string;
  email: string;
}

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onCreated?: () => void;
}

const CreateUserModal: React.FC<ModalProps> = ({ isOpen, closeModal, onCreated }) => {
  const [user, setUser] = useState<User>({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setError(null);

    try {
      await apiClient.post("/users", user, { timeout: 3000 });
      setMessage(`Sukses menambahkan ${user.name}!`);
      setUser({ name: "", email: "" });
      onCreated?.();
      setTimeout(() => {
        setMessage("");
        closeModal();
      }, 700);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(String(err.response.data.message));
      } else {
        setError("Gagal menambahkan pengguna. Periksa data isian lalu coba lagi.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 text-left align-middle shadow-2xl transition-colors dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                      <FiUserPlus className="h-5 w-5" />
                    </div>
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold text-zinc-900 dark:text-white"
                      >
                        Tambah Pengguna Baru
                      </Dialog.Title>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Lengkapi informasi dasar pengguna
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Tutup modal"
                    className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="create-user-name" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Nama Lengkap
                    </label>
                    <div className="relative mt-1">
                      <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        id="create-user-name"
                        type="text"
                        name="name"
                        required
                        placeholder="Contoh: Dion Subaktiar"
                        value={user.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-3 text-xs text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="create-user-email" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Alamat Email
                    </label>
                    <div className="relative mt-1">
                      <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        id="create-user-email"
                        type="email"
                        name="email"
                        required
                        placeholder="user@example.com"
                        value={user.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-3 text-xs text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                      />
                    </div>
                  </div>

                  {message && (
                    <div className="rounded-xl bg-indigo-50 p-3 text-xs font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                      {message}
                    </div>
                  )}
                  {error && (
                    <div role="alert" className="rounded-xl bg-rose-50 p-3 text-xs font-medium text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
                      {error}
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-xl bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-xs font-semibold text-white shadow-sm disabled:opacity-50 transition-colors"
                    >
                      {isSubmitting ? "Menyimpan..." : "Simpan Pengguna"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateUserModal;
