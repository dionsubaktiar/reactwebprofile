import { ReactNode } from "react";

interface Props {
  column1title: string;
  column1content: ReactNode;
  column2title: string;
  column2content: ReactNode;
}

const TwoColumnNusantara: React.FC<Props> = ({
  column1title,
  column1content,
  column2title,
  column2content,
}) => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 text-black dark:text-white">
        {/* First Column */}
        <div className="bg-gradient-to-bl from-brandColor-darkenBlue to-brandColor-darkenRed rounded-lg p-6">
          <h2 className="text-2xl font-bold text-black  dark:text-white">
            {column1title}
          </h2>
          {column1content}
        </div>

        {/* Second Column */}
        <div className="bg-gradient-to-tr  from-brandColor-darkenBlue to-brandColor-darkenRed text-black dark:text-white rounded-lg p-6">
          <h2 className="text-2xl font-bold text-black  dark:text-white">
            {column2title}
          </h2>
          {column2content}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnNusantara;
