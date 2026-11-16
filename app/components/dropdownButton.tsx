"use client";
import { useState } from "react";

interface DropdownProps {
  onAction: (action: string, articleId: number) => void;
  articleId: number;
}

const Dropdown = ({ onAction, articleId }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // To disable buttons during action

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAction = async (action: string) => {
    if (isProcessing) return; // Prevent double submission
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
      setIsOpen(false); // Close dropdown after the action
    }
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
            {["edit", "copy", "delete"].map((action) => (
              <div key={action} className="flex justify-center">
                <button
                  onClick={() => handleAction(action)}
                  disabled={isProcessing} // Disable button while processing
                  className={`w-full text-left px-4 py-2 text-sm ${
                    action === "delete"
                      ? "text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {action === "edit" && "Edit"}
                  {action === "copy" && "Copy Link"}
                  {action === "delete" && "Delete"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
