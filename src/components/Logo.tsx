import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-glow">
        <span className="font-display text-xl font-bold text-night-900">K</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-tight text-bone-50">
          Kakeylka
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-ink-400 group-hover:text-amber-400">
          Rent a Car
        </span>
      </span>
    </Link>
  );
}
