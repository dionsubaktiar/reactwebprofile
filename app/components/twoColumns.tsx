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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* First Column */}
        <div className="bg-gradient-to-bl from-teal-400 to-transparent rounded-lg p-6">
          <h2 className="text-2xl font-bold">{column1title}</h2>
          {column1content}
        </div>

        {/* Second Column */}
        <div className="bg-gradient-to-tr  from-teal-400 to-transparent rounded-lg p-6">
          <h2 className="text-2xl font-bold">{column2title}</h2>
          {column2content}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnLayout;
