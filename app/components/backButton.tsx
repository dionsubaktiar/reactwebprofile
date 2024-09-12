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
        className="text-2xl cursor-pointer text-eggplant dark:text-honeyDew"
      />
    </div>
  );
};

export default BackButton;
