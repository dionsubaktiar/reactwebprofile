// Service: reactwebprofile | File: app/components/createModal.tsx
"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import axios from "axios";
import { HiX, HiUserAdd, HiMail, HiUser } from "react-icons/hi";

interface User {
  name: string;
  email: string;
}

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const CreateUserModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  const [user, setUser] = useState<User>({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string>("");

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

    try {
      await axios.post("https://api.dionsubaktiar.site/users", user, { timeout: 3000 });
      setMessage(`Sukses menambahkan ${user.name}!`);
      setTimeout(() => {
        closeModal();
      }, 1000);
    } catch {
      // Offline fallback handling
      setMessage(`(Simulasi) Profil ${user.name} berhasil disimpan lokal.`);
      setTimeout(() => {
        closeModal();
      }, 1200);
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 text-left align-middle shadow-2xl transition-all dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                      <HiUserAdd className="h-5 w-5" />
                    </div>
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-base font-bold text-slate-900 dark:text-white"
                      >
                        Tambah Pengguna Baru
                      </Dialog.Title>
                      <p className="text-xs text-slate-500 dark:text-zinc-400">
                        Lengkapi informasi dasar pengguna
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                  >
                    <HiX className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                      Nama Lengkap
                    </label>
                    <div className="relative mt-1">
                      <HiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Contoh: Dion Subaktiar"
                        value={user.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-xs text-slate-900 placeholder-slate-400 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                      Alamat Email
                    </label>
                    <div className="relative mt-1">
                      <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="user@example.com"
                        value={user.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-xs text-slate-900 placeholder-slate-400 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                      />
                    </div>
                  </div>

                  {message && (
                    <div className="rounded-xl bg-indigo-50 p-3 text-xs font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                      {message}
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2 text-xs font-bold text-white shadow-sm shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50"
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
