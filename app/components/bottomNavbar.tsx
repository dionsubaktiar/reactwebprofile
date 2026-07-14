"use client";
import React from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

interface PaginationProps {
  next?: string | null;
  previous?: string | null;
  onPageChange: (url: string) => void;
}

const BottomNavBar: React.FC<PaginationProps> = ({
  next,
  previous,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center items-center p-6 gap-8 border-t border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 mt-8">
      {/* Conditionally render the Previous button */}
      {previous ? (
        <button
          onClick={() => onPageChange(previous)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
        >
          <FaCircleArrowLeft className="text-base" />
          <span>Previous</span>
        </button>
      ) : (
        <div className="w-[100px] h-9"></div> // Spacer to keep layout balanced
      )}

      {/* Conditionally render the Next button */}
      {next ? (
        <button
          onClick={() => onPageChange(next)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
        >
          <span>Next</span>
          <FaCircleArrowRight className="text-base" />
        </button>
      ) : (
        <div className="w-[100px] h-9"></div>
      )}
    </div>
  );
};

export default BottomNavBar;
