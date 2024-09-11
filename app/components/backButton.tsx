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
        className="text-2xl cursor-pointer dark:text-gray-200"
      />
    </div>
  );
};

export default BackButton;
