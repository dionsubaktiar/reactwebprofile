export function SkeletonCard() {
  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 animate-pulse space-y-3">
      <div className="h-4 bg-slate-200 dark:bg-zinc-800 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-slate-200 dark:bg-zinc-800 rounded"></div>
        <div className="h-3 bg-slate-200 dark:bg-zinc-800 rounded w-5/6"></div>
      </div>
    </div>
  );
}

export function SkeletonTableRow() {
  return (
    <tr className="animate-pulse border-b border-slate-100 dark:border-zinc-800">
      <td className="py-3 px-4"><div className="h-3 bg-slate-200 dark:bg-zinc-800 rounded w-24"></div></td>
      <td className="py-3 px-4"><div className="h-3 bg-slate-200 dark:bg-zinc-800 rounded w-32"></div></td>
      <td className="py-3 px-4"><div className="h-3 bg-slate-200 dark:bg-zinc-800 rounded w-16"></div></td>
    </tr>
  );
}
