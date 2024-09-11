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
      className={`min-h-screen flex items-center justify-center ${
        isDarkMode
          ? "bg-gradient-to-b from-teal-600 to-gray-800 text-gray-200"
          : "bg-gradient-to-b from from-teal-500 to to-transparent text-black"
      }`}
    >
      <main className="px-10 font-poppins">
        <section className="min-h-screen">
          <nav className="py-10 mb-4 flex justify-between">
            <div className="flex justify-start">
              <FaArrowLeft
                onClick={handleBack}
                className="text-2xl cursor-pointer dark:text-gray-200"
              />
            </div>
            <div className="flex justify-end">
              <BsFillMoonStarsFill
                onClick={toggleDarkMode}
                className="text-2xl dark:text-gray-200"
              />
            </div>
          </nav>
          <div className="text-center text-lg items-center justify-center">
            <strong
              className={`text-5xl ${
                isDarkMode ? "text-gray-200" : "text-black"
              }`}
            >
              COMING SOON
            </strong>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Resume;
