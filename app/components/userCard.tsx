import Link from "next/link";

interface UserProps {
  name: string;
  email: string;
  id: string;
}

const UserCard: React.FC<UserProps> = ({ name, email, id }) => {
  return (
    <Link
      className="flex flex-col justify-center items-center p-4 my-4
    shadow-lg drop-shadow-lg border rounded-lg border-customGreen-default
    hover:bg-customGreen-default transition ease-in-out hover:animate-pulse"
      href={"/users/detail?id=" + id}
    >
      <strong>{name}</strong>
      <p>{email}</p>
    </Link>
  );
};

export default UserCard;
