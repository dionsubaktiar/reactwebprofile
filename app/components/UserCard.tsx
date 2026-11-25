import Link from "next/link";
import { FiUser, FiArrowRight, FiMail } from "react-icons/fi";

interface UserProps {
  name: string;
  email: string;
  id: string;
}

const UserCard: React.FC<UserProps> = ({ name, email, id }) => {
  const initials = (name || "U")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Link
      href={`/users/detail?id=${id}`}
      className="group relative flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-colors duration-200 hover:border-indigo-500/50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-indigo-500/50"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-sm font-semibold text-white">
          {initials || <FiUser className="h-5 w-5" />}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {name}
          </h3>
          <p className="flex items-center gap-1.5 truncate text-xs text-zinc-500 dark:text-zinc-400">
            <FiMail className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
            <span className="truncate">{email}</span>
          </p>
        </div>
      </div>

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-400 transition-colors group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-500 dark:group-hover:border-indigo-900/50 dark:group-hover:bg-indigo-950/50 dark:group-hover:text-indigo-400">
        <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
};

export default UserCard;
