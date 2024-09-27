"use client";

import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

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

  return (
    <div className="flex justify-end items-center">
      <Switch
        checked={isDarkMode}
        onChange={setIsDarkMode}
        className={`${
          isDarkMode ? "bg-customGreen-light" : "bg-customGreen-dark"
        } relative inline-flex items-center h-8 rounded-full w-14 transition-colors duration-200 ease-in-out`}
      >
        <span
          className={`${
            isDarkMode ? "translate-x-6" : "translate-x-1"
          } w-6 h-6 transform bg-white rounded-full transition-transform duration-200 ease-in-out flex items-center justify-center`}
        >
          {isDarkMode ? (
            <BsFillSunFill className="text-yellow-400 text-xl" />
          ) : (
            <BsFillMoonStarsFill className="text-blue-800 text-xl" />
          )}
        </span>
      </Switch>
    </div>
  );
};

export default ToggleDarkModeButton;
