// Service: reactwebprofile | File: app/components/twoColumns.tsx
import { ReactNode } from "react";

interface Props {
  column1title: string;
  column1content: ReactNode;
  column2title: string;
  column2content: ReactNode;
}

const TwoColumnLayout: React.FC<Props> = ({
  column1title,
  column1content,
  column2title,
  column2content,
}) => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-slate-900 dark:text-zinc-100">
        {/* First Column */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-zinc-800">
            {column1title}
          </h2>
          {column1content}
        </div>

        {/* Second Column */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-zinc-800">
            {column2title}
          </h2>
          {column2content}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnLayout;
