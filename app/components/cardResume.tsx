"use client";

// import { ReactNode } from "react";
import Link from "next/link";

interface CardResumeProps {
  title: string;
  description: string;
  href: string;
}

const CardResume = ({ title, description, href }: CardResumeProps) => {
  return (
    <div
      className="container mx-auto drop-shadow-md rounded-lg bg-customGreen-default
      border-solid border-eggplant border-2 hover:border-0
      transition duration-300 ease-linear transform hover:bg-customGreen-light hover:scale-105  
      mb-1
      "
    >
      <Link href={href}>
        <div className="px-4 py-4 hover:text-customGreen-dark">
          <p>{title}</p>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default CardResume;
