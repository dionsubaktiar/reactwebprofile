// Service: reactwebprofile | File: app/components/dropdownButton.tsx
"use client";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

interface DropdownProps {
  onAction: (action: string, articleId: number) => void;
  articleId: number;
}

const Dropdown = ({ onAction, articleId }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAction = async (action: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      await onAction(action, articleId);
    } catch (error) {
      console.error(
        `Failed to process action ${action} for article ${articleId}:`,
        error
      );
    } finally {
      setIsProcessing(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white transition"
      >
        <HiDotsVertical className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-30 mt-2 w-40 origin-top-right rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 transition ease-in-out duration-150">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleAction("edit")}
              disabled={isProcessing}
              className="w-full text-left rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleAction("copy")}
              disabled={isProcessing}
              className="w-full text-left rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white transition"
            >
              Copy Link
            </button>
            <button
              onClick={() => handleAction("delete")}
              disabled={isProcessing}
              className="w-full text-left rounded-xl px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 transition"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
