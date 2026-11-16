import Link from "next/link";
interface ResumeButtonProps {
  title: string;
  href: string;
  description: string;
}

const ResumeItemButton: React.FC<ResumeButtonProps> = ({
  title,
  href,
  description,
}) => {
  return (
    <div>
      <p>{title}</p>
      <p className="py-2">{description}</p>
      <Link
        className="bg-gradient-to-r from-cyan-500 to-teal-500
        px-4 py-1 rounded-md mx-auto"
        href={href}
      >
        Go
      </Link>
    </div>
  );
};
export default ResumeItemButton;
