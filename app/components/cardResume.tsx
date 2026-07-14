"use client";

import Link from "next/link";

interface CardResumeProps {
  title: string;
  description: string;
  href: string;
}

const CardResume = ({ title, description, href }: CardResumeProps) => {
  return (
    <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/10 hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 w-full group mb-4">
      <Link href={href}>
        <div className="space-y-2">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white font-poppins group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default CardResume;
