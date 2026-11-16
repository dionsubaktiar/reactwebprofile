import { ReactNode } from "react";

interface SectionProps {
  content: ReactNode;
  idSection: string;
}

const SectionCardNusantara: React.FC<SectionProps> = ({
  content,
  idSection,
}) => {
  return (
    <div>
      <section id={idSection}>{content}</section>
    </div>
  );
};

export default SectionCardNusantara;
