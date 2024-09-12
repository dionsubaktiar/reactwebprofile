"use client";

import { useState, useEffect } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";

const ToggleDarkModeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply or remove the dark mode class from the document's root element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="flex justify-end">
      <BsFillMoonStarsFill
        onClick={toggleDarkMode}
        className={`cursor-pointer text-2xl ${
          isDarkMode ? "text-honeyDew" : "text-eggplant"
        }`}
      />
    </div>
  );
};

export default ToggleDarkModeButton;
