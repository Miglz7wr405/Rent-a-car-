import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const vehicleSchema = z.object({
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "slug inválido"),
  brand: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().min(1990).max(new Date().getFullYear() + 1),
  category: z.enum(["SEDAN", "SUV", "SUV_4X4", "PICKUP", "HATCHBACK", "VAN"]),
  seats: z.number().int().min(1).max(30),
  transmission: z.enum(["MANUAL", "AUTO"]),
  fuel: z.enum(["PETROL", "DIESEL"]),
  dailyRateMzn: z.number().int().min(0),
  description: z.string().min(10),
  mainImage: z.string().url(),
  images: z.array(z.string().url()).default([]),
  status: z.enum(["AVAILABLE", "UNAVAILABLE", "ARCHIVED"]).default("AVAILABLE")
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = vehicleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos.", details: parsed.error.flatten() }, { status: 400 });
  }
  const existing = await prisma.vehicle.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return NextResponse.json({ error: "Já existe uma viatura com este slug." }, { status: 409 });
  }
  const vehicle = await prisma.vehicle.create({
    data: {
      slug: parsed.data.slug,
      brand: parsed.data.brand,
      model: parsed.data.model,
      year: parsed.data.year,
      category: parsed.data.category,
      seats: parsed.data.seats,
      transmission: parsed.data.transmission,
      fuel: parsed.data.fuel,
      dailyRateMzn: parsed.data.dailyRateMzn,
      description: parsed.data.description,
      mainImage: parsed.data.mainImage,
      status: parsed.data.status,
      images: {
        create: parsed.data.images.map((url, order) => ({ url, order }))
      }
    }
  });
  return NextResponse.json({ id: vehicle.id }, { status: 201 });
}
