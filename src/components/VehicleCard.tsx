import { Link } from "react-router-dom";
import { Users, Fuel, Settings2, ArrowUpRight } from "lucide-react";
import { formatMzn } from "@/lib/format";
import { categoryLabel, transmissionLabel, fuelLabel } from "@/lib/constants";

type Props = {
  slug: string;
  brand: string;
  model: string;
  category: string;
  seats: number;
  transmission: string;
  fuel: string;
  dailyRateMzn: number;
  mainImage: string;
  status: string;
};

export function VehicleCard(v: Props) {
  const unavailable = v.status !== "AVAILABLE";
  return (
    <Link
      to={`/viaturas/${v.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-night-600 bg-night-800/70 shadow-card transition hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-glow"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-night-700">
        <img
          src={v.mainImage}
          alt={`${v.brand} ${v.model}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/10 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="chip border-amber-400/40 bg-night-900/70 text-amber-400">
            {categoryLabel(v.category)}
          </span>
          {unavailable ? (
            <span className="chip border-rose-500/40 bg-night-900/70 text-rose-300">
              Indisponível
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-semibold text-bone-50">
              {v.brand} {v.model}
            </h3>
            <p className="text-sm text-ink-400">A partir de</p>
          </div>
          <div className="flex items-baseline gap-1 text-right">
            <span className="font-display text-2xl font-semibold text-amber-400">
              {formatMzn(v.dailyRateMzn)}
            </span>
            <span className="text-xs text-ink-400">/dia</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="chip">
            <Users className="h-3.5 w-3.5" /> {v.seats} lugares
          </span>
          <span className="chip">
            <Settings2 className="h-3.5 w-3.5" /> {transmissionLabel(v.transmission)}
          </span>
          <span className="chip">
            <Fuel className="h-3.5 w-3.5" /> {fuelLabel(v.fuel)}
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-xs uppercase tracking-wider text-ink-400">Ver detalhes</span>
          <ArrowUpRight className="h-4 w-4 text-amber-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
