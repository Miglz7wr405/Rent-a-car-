import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { VehicleGallery } from "@/components/VehicleGallery";
import { BookingForm } from "@/components/BookingForm";
import { VehicleCard } from "@/components/VehicleCard";
import { formatMzn } from "@/lib/format";
import { categoryLabel, transmissionLabel, fuelLabel } from "@/lib/constants";
import { Users, Fuel, Settings2, Calendar, MapPin } from "lucide-react";

type PageProps = { params: { slug: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const v = await prisma.vehicle.findUnique({ where: { slug: params.slug } });
  if (!v) return { title: "Viatura não encontrada" };
  return {
    title: `${v.brand} ${v.model}`,
    description: v.description.slice(0, 160)
  };
}

export default async function VehiclePage({ params }: PageProps) {
  const vehicle = await prisma.vehicle.findUnique({
    where: { slug: params.slug },
    include: { images: { orderBy: { order: "asc" } } }
  });
  if (!vehicle || vehicle.status === "ARCHIVED") notFound();

  const related = await prisma.vehicle.findMany({
    where: {
      category: vehicle.category,
      id: { not: vehicle.id },
      status: "AVAILABLE"
    },
    take: 3
  });

  const galleryImages =
    vehicle.images.length > 0 ? vehicle.images : [{ url: vehicle.mainImage }];

  return (
    <>
      <section className="section pb-10">
        <div className="container-tight">
          <nav className="mb-6 text-sm text-ink-400">
            <a href="/viaturas" className="hover:text-amber-400">
              Viaturas
            </a>{" "}
            <span className="px-2">/</span>
            <span className="text-bone-200">
              {vehicle.brand} {vehicle.model}
            </span>
          </nav>
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <VehicleGallery
                images={galleryImages}
                alt={`${vehicle.brand} ${vehicle.model}`}
              />
              <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="chip border-amber-400/40 text-amber-400">
                    {categoryLabel(vehicle.category)}
                  </span>
                  <h1 className="mt-3 font-display text-4xl font-semibold">
                    {vehicle.brand} {vehicle.model}
                  </h1>
                  <p className="mt-1 text-ink-400">Ano {vehicle.year}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wider text-ink-400">A partir de</p>
                  <p className="font-display text-4xl font-semibold text-amber-400">
                    {formatMzn(vehicle.dailyRateMzn)}
                  </p>
                  <p className="text-xs text-ink-400">por dia</p>
                </div>
              </div>
              <p className="mt-6 leading-relaxed text-bone-200">{vehicle.description}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Spec icon={<Users className="h-4 w-4" />} label="Lugares" value={`${vehicle.seats}`} />
                <Spec icon={<Settings2 className="h-4 w-4" />} label="Transmissão" value={transmissionLabel(vehicle.transmission)} />
                <Spec icon={<Fuel className="h-4 w-4" />} label="Combustível" value={fuelLabel(vehicle.fuel)} />
                <Spec icon={<Calendar className="h-4 w-4" />} label="Ano" value={`${vehicle.year}`} />
              </div>

              <div className="mt-8 rounded-2xl border border-night-600 bg-night-800/60 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-amber-400">
                  <MapPin className="h-4 w-4" /> Levantamento em Quelimane
                </div>
                <p className="mt-2 text-sm text-ink-400">
                  Avenida de Maputo. Outros locais podem ser combinados após a confirmação do
                  pedido.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-24">
                {vehicle.status === "AVAILABLE" ? (
                  <BookingForm vehicleId={vehicle.id} dailyRateMzn={vehicle.dailyRateMzn} />
                ) : (
                  <div className="card p-6 text-center">
                    <h3 className="font-display text-xl">Viatura indisponível</h3>
                    <p className="mt-2 text-sm text-ink-400">
                      Esta viatura não está a aceitar reservas de momento. Contacta-nos para
                      sugestões.
                    </p>
                    <a href="/contactos" className="btn-primary mt-4">
                      Falar connosco
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section pt-10">
          <div className="container-tight">
            <h2 className="font-display text-2xl font-semibold">Outras na mesma categoria</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((v) => (
                <VehicleCard key={v.id} {...v} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-night-600 bg-night-800/60 p-4">
      <div className="flex items-center gap-2 text-ink-400">
        {icon}
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-2 font-display text-lg font-medium">{value}</p>
    </div>
  );
}
