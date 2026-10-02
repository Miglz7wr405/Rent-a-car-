import { prisma } from "@/lib/db";
import { BookingsTable } from "@/components/admin/BookingsTable";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage({
  searchParams
}: {
  searchParams: { status?: string };
}) {
  const where = searchParams.status ? { status: searchParams.status } : {};
  const bookings = await prisma.booking.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { vehicle: true }
  });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Reservas</h1>
        <p className="text-sm text-ink-400">{bookings.length} pedidos.</p>
      </div>
      <BookingsTable
        bookings={bookings.map((b) => ({
          id: b.id,
          reference: b.reference,
          customerName: b.customerName,
          customerPhone: b.customerPhone,
          customerEmail: b.customerEmail,
          vehicleLabel: `${b.vehicle.brand} ${b.vehicle.model}`,
          pickupAt: b.pickupAt.toISOString(),
          returnAt: b.returnAt.toISOString(),
          pickupLocation: b.pickupLocation,
          totalEstimateMzn: b.totalEstimateMzn,
          status: b.status,
          notes: b.notes,
          createdAt: b.createdAt.toISOString()
        }))}
        currentStatus={searchParams.status ?? ""}
      />
    </div>
  );
}
