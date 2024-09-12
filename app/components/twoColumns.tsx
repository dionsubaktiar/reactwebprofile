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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 text-eggplant dark:text-honeyDew">
        {/* First Column */}
        <div className="bg-gradient-to-bl from-customGreen-default to-transparent rounded-lg p-6">
          <h2 className="text-2xl font-bold text-eggplant  dark:text-honeyDew">
            {column1title}
          </h2>
          {column1content}
        </div>

        {/* Second Column */}
        <div className="bg-gradient-to-tr  from-customGreen-default to-transparent text-eggplant dark:text-honeyDew rounded-lg p-6">
          <h2 className="text-2xl font-bold text-eggplant  dark:text-honeyDew">
            {column2title}
          </h2>
          {column2content}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnLayout;
