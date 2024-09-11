import { ReactNode } from "react";

interface CardResumeProps {
  children: ReactNode;
}

const CardResume = ({ children }: CardResumeProps) => {
  return (
    <div
      className="container mx-auto border border-gray-200 rounded-lg
     dark:bg-gradient-to-br from-teal-400 to-gray-800 px-4 py-4 dark:border-gray-800"
    >
      {children}
    </div>
  );
};

export default CardResume;
