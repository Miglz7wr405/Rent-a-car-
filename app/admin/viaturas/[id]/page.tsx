import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { VehicleForm } from "@/components/admin/VehicleForm";

export const dynamic = "force-dynamic";

export default async function EditVehiclePage({ params }: { params: { id: string } }) {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: params.id },
    include: { images: { orderBy: { order: "asc" } } }
  });
  if (!vehicle) notFound();
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold">
        {vehicle.brand} {vehicle.model}
      </h1>
      <VehicleForm
        initial={{
          id: vehicle.id,
          slug: vehicle.slug,
          brand: vehicle.brand,
          model: vehicle.model,
          year: vehicle.year,
          category: vehicle.category,
          seats: vehicle.seats,
          transmission: vehicle.transmission,
          fuel: vehicle.fuel,
          dailyRateMzn: vehicle.dailyRateMzn,
          description: vehicle.description,
          mainImage: vehicle.mainImage,
          images: vehicle.images.map((i) => i.url),
          status: vehicle.status
        }}
      />
    </div>
  );
}
