import { prisma } from "./db";

export async function hasConflict(
  vehicleId: string,
  pickupAt: Date,
  returnAt: Date,
  excludeBookingId?: string
): Promise<boolean> {
  const overlapping = await prisma.booking.findFirst({
    where: {
      vehicleId,
      status: { in: ["CONFIRMED", "PENDING"] },
      pickupAt: { lt: returnAt },
      returnAt: { gt: pickupAt },
      ...(excludeBookingId ? { NOT: { id: excludeBookingId } } : {})
    }
  });
  return !!overlapping;
}

export async function generateReference(): Promise<string> {
  const year = new Date().getFullYear();
  const count = await prisma.booking.count({
    where: { createdAt: { gte: new Date(`${year}-01-01`) } }
  });
  const seq = (count + 1).toString().padStart(4, "0");
  return `KK-${year}-${seq}`;
}
