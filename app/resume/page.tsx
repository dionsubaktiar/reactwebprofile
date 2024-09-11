"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { FaArrowLeft } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";

const Resume = () => {
  // State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Get router instance
  const router = useRouter();

  // Function to go back
  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode
          ? "bg-gradient-to-b from-teal-600 to-gray-800 text-gray-200"
          : "bg-gradient-to-b from-teal-500 to-transparent text-black"
      }`}
    >
      <nav className="pt-10 px-10 flex justify-between items-center">
        <div className="flex items-center">
          <FaArrowLeft
            onClick={handleBack}
            className="text-2xl cursor-pointer dark:text-gray-200"
          />
        </div>
        <div className="flex items-center">
          <BsFillMoonStarsFill
            onClick={toggleDarkMode}
            className="text-2xl dark:text-gray-200"
          />
        </div>
      </nav>
      <main className="flex flex-1 items-center justify-center px-10 font-poppins">
        <section className="text-center text-lg">
          <strong
            className={`text-4xl ${
              isDarkMode ? "text-gray-200" : "text-black"
            }`}
          >
            COMING SOON
          </strong>
        </section>
      </main>
    </div>
  );
};

export default Resume;
