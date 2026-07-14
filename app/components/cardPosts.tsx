interface DataPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const CardPosts: React.FC<DataPost> = ({ userId, id, title, body }) => {
  return (
    <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/10 hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-4">
      <div className="space-y-3">
        {/* Post Header */}
        <div className="flex justify-between items-center text-xs font-mono text-zinc-400 dark:text-zinc-500">
          <span>
            POST ID: <strong className="text-zinc-700 dark:text-zinc-300">{id}</strong>
          </span>
          <span>
            USER ID: <strong className="text-zinc-700 dark:text-zinc-300">{userId}</strong>
          </span>
        </div>

        {/* Post Title */}
        <h3 className="text-base font-bold text-zinc-900 dark:text-white font-poppins capitalize">
          {title}
        </h3>

        {/* Post Body */}
        <p className="text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 font-light leading-relaxed">
          {body}
        </p>
      </div>
    </div>
  );
};

export default CardPosts;
