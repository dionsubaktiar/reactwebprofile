"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const router = useRouter();

  // Function to go back
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="flex justify-start">
      <FaArrowLeft
        onClick={handleBack}
        className="text-xl cursor-pointer text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
      />
    </div>
  );
};

export default BackButton;
