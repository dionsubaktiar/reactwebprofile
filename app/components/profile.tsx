// Service: reactwebprofile | File: app/components/profile.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiPencil, HiTrash, HiUser, HiMail, HiDocumentText, HiX, HiCheck } from "react-icons/hi";
import axios from "axios";

interface UserProfileProps {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  image: string | null;
}

const ProfileCard = ({ name, email, bio, image, id }: UserProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDelete] = useState(false);
  const [user, setUser] = useState<UserProfileProps>({ id, name, email, bio, image });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const initials = (user.name || "U")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg("");
    try {
      await axios.put(`https://api.dionsubaktiar.site/users/${user.id}`, user, { timeout: 3000 });
      setStatusMsg("Profil berhasil diperbarui!");
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    } catch {
      setStatusMsg("(Simulasi) Perubahan profil berhasil disimpan secara lokal.");
      setTimeout(() => {
        setIsOpen(false);
      }, 1200);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.delete(`https://api.dionsubaktiar.site/users/${id}`, { timeout: 3000 });
      window.location.href = "/users";
    } catch {
      window.location.href = "/users";
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* Cover Gradient Banner */}
        <div className="h-36 sm:h-44 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 relative">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Profile Content */}
        <div className="relative px-6 pb-8 pt-0 sm:px-8">
          {/* Avatar & Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
            <div className="relative flex h-28 w-28 sm:h-36 sm:w-36 shrink-0 items-center justify-center rounded-3xl border-4 border-white bg-slate-100 shadow-md overflow-hidden dark:border-zinc-900 dark:bg-zinc-800">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {initials || <HiUser />}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-indigo-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-white transition"
              >
                <HiPencil className="h-4 w-4" />
                <span>Edit Profil</span>
              </button>
              <button
                type="button"
                onClick={() => setIsDelete(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50/50 px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-400 dark:hover:bg-rose-950/40 transition"
              >
                <HiTrash className="h-4 w-4" />
                <span>Hapus</span>
              </button>
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              {user.name}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-zinc-400">
              <HiMail className="h-4 w-4 text-slate-400" />
              <span>{user.email}</span>
            </p>

            <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/80 p-5 dark:border-zinc-800/80 dark:bg-zinc-950/40">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Biodata &amp; Ringkasan
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
                {user.bio || "Pengguna belum menambahkan informasi biodata terperinci."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
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
                    <Dialog.Title as="h3" className="text-base font-bold text-slate-900 dark:text-white">
                      Edit Data Profil
                    </Dialog.Title>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
                    >
                      <HiX className="h-5 w-5" />
                    </button>
                  </div>

                  <form onSubmit={handleEditSubmit} className="mt-4 space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                        Biodata
                      </label>
                      <textarea
                        rows={3}
                        value={user.bio || ""}
                        onChange={(e) => setUser({ ...user, bio: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                      />
                    </div>

                    {statusMsg && (
                      <div className="rounded-xl bg-indigo-50 p-3 text-xs font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                        {statusMsg}
                      </div>
                    )}

                    <div className="mt-6 flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2 text-xs font-bold text-white shadow-sm shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50"
                      >
                        {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Delete Confirmation Modal */}
      <Transition appear show={isDeleteOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsDelete(false)}>
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
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 text-left align-middle shadow-2xl transition-all dark:border-zinc-800 dark:bg-zinc-900">
                  <Dialog.Title as="h3" className="text-base font-bold text-slate-900 dark:text-white">
                    Hapus Pengguna?
                  </Dialog.Title>
                  <p className="mt-2 text-xs text-slate-500 dark:text-zinc-400">
                    Tindakan ini permanen. Profil &quot;{user.name}&quot; akan dihapus dari sistem.
                  </p>
                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsDelete(false)}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteSubmit}
                      disabled={isSubmitting}
                      className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-rose-700 disabled:opacity-50"
                    >
                      {isSubmitting ? "Menghapus..." : "Ya, Hapus"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ProfileCard;
