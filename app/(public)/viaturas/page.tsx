import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { VehicleCard } from "@/components/VehicleCard";
import { CatalogFilters } from "@/components/CatalogFilters";
import { CarFront } from "lucide-react";

export const metadata: Metadata = {
  title: "Viaturas disponíveis"
};

export const dynamic = "force-dynamic";

export default async function CatalogPage({
  searchParams
}: {
  searchParams: { category?: string; transmission?: string; seats?: string; sort?: string };
}) {
  const where: Record<string, unknown> = {
    status: { in: ["AVAILABLE", "UNAVAILABLE"] }
  };
  if (searchParams.category) where.category = searchParams.category;
  if (searchParams.transmission) where.transmission = searchParams.transmission;
  if (searchParams.seats) where.seats = { gte: Number(searchParams.seats) };

  const orderBy =
    searchParams.sort === "price-desc"
      ? { dailyRateMzn: "desc" as const }
      : searchParams.sort === "newest"
        ? { createdAt: "desc" as const }
        : { dailyRateMzn: "asc" as const };

  const vehicles = await prisma.vehicle.findMany({ where, orderBy });

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
