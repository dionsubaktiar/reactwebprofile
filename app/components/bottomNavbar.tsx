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
    <div className="container mx-auto flex justify-center p-3 mb-4 gap-10">
      {/* Conditionally render the Previous button */}
      {previous && (
        <div className="flex flex-col items-center justify-center text-eggplant dark:text-honeyDew">
          <FaCircleArrowLeft
            onClick={() => onPageChange(previous)}
            className="text-4xl cursor-pointer"
          />
          <p>Previous</p>
        </div>
      )}

      {/* Conditionally render the Next button */}
      {next && (
        <div className="flex flex-col items-center justify-center text-eggplant dark:text-honeyDew">
          <FaCircleArrowRight
            onClick={() => onPageChange(next)}
            className="text-4xl cursor-pointer"
          />
          <p>Next</p>
        </div>
      )}
    </div>
  );
};

export default BottomNavBar;
