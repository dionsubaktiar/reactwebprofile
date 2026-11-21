// Service: reactwebprofile | File: app/components/createButton.tsx
"use client";

import { useState } from "react";
import CreateUserModal from "./createModal";
import { HiPlus } from "react-icons/hi";

const CreateUserButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Tambah Pengguna Baru"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:scale-105 hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:scale-95"
      >
        <HiPlus className="h-6 w-6 stroke-2" />
      </button>

      <CreateUserModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </div>
  );
};

export default CreateUserButton;
