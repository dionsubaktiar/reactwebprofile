"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FiAlertTriangle } from "react-icons/fi";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Tombol konfirmasi sibuk (mis. DELETE sedang berjalan). */
  isBusy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Dialog konfirmasi pengganti `confirm()` browser — dipakai semua aksi
 * hapus di invoicing (dan auth-crud / test-orbiz). Dialog ditutup tanpa
 * aksi bila pengguna batal; pemanggil yang menangani rollback bila
 * penghapusan gagal.
 */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Hapus",
  cancelLabel = "Batal",
  isBusy = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 text-left align-middle shadow-xl transition-colors">
                <div className="flex items-start gap-3">
                  <span className="p-2 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 shrink-0">
                    <FiAlertTriangle size={20} />
                  </span>
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-base font-bold text-zinc-900 dark:text-white"
                    >
                      {title}
                    </Dialog.Title>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      {message}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onCancel}
                    disabled={isBusy}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition disabled:opacity-50"
                  >
                    {cancelLabel}
                  </button>
                  <button
                    type="button"
                    onClick={onConfirm}
                    disabled={isBusy}
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-700 text-white transition shadow-sm disabled:opacity-50"
                  >
                    {isBusy ? "Memproses..." : confirmLabel}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
