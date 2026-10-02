import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { VehicleCard } from "@/components/VehicleCard";
import { CatalogFilters } from "@/components/CatalogFilters";
import { CarFront } from "lucide-react";
import { getVehicles } from "@/lib/store";

export default function Catalog() {
  const [search] = useSearchParams();
  const category = search.get("category") ?? "";
  const transmission = search.get("transmission") ?? "";
  const seats = search.get("seats") ?? "";
  const sort = search.get("sort") ?? "price-asc";

  const vehicles = useMemo(() => {
    let list = getVehicles().filter((v) => v.status === "AVAILABLE" || v.status === "UNAVAILABLE");
    if (category) list = list.filter((v) => v.category === category);
    if (transmission) list = list.filter((v) => v.transmission === transmission);
    if (seats) list = list.filter((v) => v.seats >= Number(seats));
    if (sort === "price-desc") list.sort((a, b) => b.dailyRateMzn - a.dailyRateMzn);
    else if (sort === "newest") list.sort((a, b) => b.year - a.year);
    else list.sort((a, b) => a.dailyRateMzn - b.dailyRateMzn);
    return list;
  }, [category, transmission, seats, sort]);

  return (
    <section className="section">
      <div className="container-tight">
        <div className="max-w-2xl">
          <span className="eyebrow">Catálogo</span>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
            Encontra a viatura certa para ti.
          </h1>
          <p className="mt-3 text-ink-400">
            {vehicles.length} {vehicles.length === 1 ? "viatura" : "viaturas"} na frota.
            Filtra por categoria, transmissão ou lugares.
          </p>
        </div>
        <div className="mt-10">
          <CatalogFilters />
        </div>
        {vehicles.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-night-600 bg-night-800/40 py-20 text-center">
            <CarFront className="h-10 w-10 text-ink-400" />
            <h3 className="font-display text-2xl">Sem resultados</h3>
            <p className="max-w-md text-sm text-ink-400">
              Não encontrámos viaturas com estes filtros. Limpa os filtros ou contacta-nos
              pelo WhatsApp.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((v) => (
              <VehicleCard key={v.id} {...v} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
