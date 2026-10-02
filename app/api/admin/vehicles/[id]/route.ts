import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const patchSchema = z.object({
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/).optional(),
  brand: z.string().min(1).optional(),
  model: z.string().min(1).optional(),
  year: z.number().int().optional(),
  category: z.string().optional(),
  seats: z.number().int().min(1).max(30).optional(),
  transmission: z.string().optional(),
  fuel: z.string().optional(),
  dailyRateMzn: z.number().int().min(0).optional(),
  description: z.string().optional(),
  mainImage: z.string().url().optional(),
  images: z.array(z.string().url()).optional(),
  status: z.enum(["AVAILABLE", "UNAVAILABLE", "ARCHIVED"]).optional()
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos.", details: parsed.error.flatten() }, { status: 400 });
  }
  const { images, ...rest } = parsed.data;
  const vehicle = await prisma.vehicle.update({
    where: { id: params.id },
    data: {
      ...rest,
      ...(images
        ? {
            images: {
              deleteMany: {},
              create: images.map((url, order) => ({ url, order }))
            }
          }
        : {})
    }
  });
  return NextResponse.json({ id: vehicle.id });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await prisma.vehicle.update({
    where: { id: params.id },
    data: { status: "ARCHIVED" }
  });
  return NextResponse.json({ ok: true });
}
