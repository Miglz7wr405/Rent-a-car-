import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const patchSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "REFUSED", "CANCELLED", "COMPLETED"]).optional(),
  notes: z.string().max(2000).optional()
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }
  const booking = await prisma.booking.update({
    where: { id: params.id },
    data: parsed.data
  });
  return NextResponse.json({ id: booking.id, status: booking.status });
}
