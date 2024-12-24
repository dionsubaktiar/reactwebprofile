"use client";
import { useState } from "react";
import axios from "axios";

interface DropdownProps {
  onAction: (action: string, articleId: number) => void;
  articleId: number;
}

const Dropdown = ({ onAction, articleId }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAction = (action: string) => {
    if (action === "delete") {
      axios.get(
        "https://personalproject.nusantaratranssentosa.co.id/sanctum/csrf-cookie",
        { withCredentials: true }
      );
      axios
        .delete(
          `https://personalproject.nusantaratranssentosa.co.id/api/article/${articleId}`,
          { withCredentials: true }
        )
        .then((response) => {
          console.log("Article deleted successfully:", response.data);
          onAction(action, articleId); // Call the onAction callback to notify parent
        })
        .catch((error) => {
          console.error("Failed to delete article:", error);
        });
    } else {
      onAction(action, articleId); // Handle other actions
    }
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-customGreen-light dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:ring-customGreen-light"
      >
        Manage
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700 transition ease-in-out duration-200">
          <div className="py-1">
            <div className="flex justify-center">
              <button
                onClick={() => handleAction("edit")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Edit
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => handleAction("copy")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Copy Link
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => handleAction("delete")}
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
