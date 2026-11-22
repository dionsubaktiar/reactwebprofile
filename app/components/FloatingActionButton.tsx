import Link from "next/link";
import { IoAdd } from "react-icons/io5";
import type { ReactNode } from "react";

interface FloatingActionButtonProps {
  /** Bila ada, tombol berupa Link ke href; bila tidak, button onClick. */
  href?: string;
  onClick?: () => void;
  /** Label teks untuk varian pill; ikon saja untuk varian round. */
  label?: string;
  /** Label aksesibilitas (wajib untuk varian round). */
  ariaLabel?: string;
  /** Posisi fixed, mis. "bottom-4 right-6". Default: bottom-6 right-6. */
  position?: string;
  variant?: "round" | "pill";
  icon?: ReactNode;
}

/**
 * Satu tombol create mengambang untuk seluruh repo — menggantikan
 * createButton, createKendaraanButton, createPinjamanButton,
 * createRegistButton, dan createArticleButton (yang isinya hanya
 * berbeda href/label/posisi).
 */
export default function FloatingActionButton({
  href,
  onClick,
  label,
  ariaLabel,
  position = "bottom-6 right-6",
  variant = "round",
  icon,
}: FloatingActionButtonProps) {
  const className = `fixed ${position} px-4 py-4 bg-green-500 text-white ${
    variant === "round" ? "rounded-full" : "rounded-lg"
  } shadow-lg hover:bg-green-600 transition-all`;
  const content =
    variant === "pill" ? (
      <span className="flex items-center gap-1 text-sm md:text-lg">
        {icon ?? <IoAdd />}
        {label}
      </span>
    ) : (
      icon ?? <IoAdd />
    );

  if (href) {
    return (
      <div className="relative">
        <Link href={href} aria-label={ariaLabel ?? label}>
          <button className={className}>{content}</button>
        </Link>
      </div>
    );
  }
  return (
    <div className="relative">
      <button
        onClick={onClick}
        aria-label={ariaLabel ?? label}
        className={className}
      >
        {content}
      </button>
    </div>
  );
}
