import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { hasConflict, generateReference } from "@/lib/availability";
import { estimateTotal } from "@/lib/pricing";

const bodySchema = z.object({
  vehicleId: z.string().min(1),
  pickupAt: z.string().datetime(),
  returnAt: z.string().datetime(),
  pickupLocation: z.string().max(200).optional(),
  customerName: z.string().min(2).max(120),
  customerPhone: z.string().min(6).max(40),
  customerEmail: z.string().email().optional(),
  notes: z.string().max(1000).optional()
});

const rateBucket = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const LIMIT = 5;

function rateLimited(key: string) {
  const now = Date.now();
  const entry = rateBucket.get(key);
  if (!entry || now - entry.ts > WINDOW_MS) {
    rateBucket.set(key, { count: 1, ts: now });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Demasiados pedidos. Tenta novamente num minuto." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const pickupAt = new Date(parsed.data.pickupAt);
  const returnAt = new Date(parsed.data.returnAt);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  if (pickupAt < now) {
    return NextResponse.json({ error: "A data de levantamento tem de ser futura." }, { status: 400 });
  }
  if (returnAt <= pickupAt) {
    return NextResponse.json({ error: "A devolução tem de ser após o levantamento." }, { status: 400 });
  }

  const vehicle = await prisma.vehicle.findUnique({ where: { id: parsed.data.vehicleId } });
  if (!vehicle || vehicle.status !== "AVAILABLE") {
    return NextResponse.json({ error: "Viatura indisponível." }, { status: 400 });
  }

  const conflict = await hasConflict(vehicle.id, pickupAt, returnAt);
  if (conflict) {
    return NextResponse.json(
      { error: "Esta viatura já tem um pedido para essas datas. Escolhe outro período." },
      { status: 409 }
    );
  }

  const totalEstimateMzn = estimateTotal(vehicle.dailyRateMzn, pickupAt, returnAt);
  const reference = await generateReference();

  const booking = await prisma.booking.create({
    data: {
      reference,
      vehicleId: vehicle.id,
      customerName: parsed.data.customerName,
      customerPhone: parsed.data.customerPhone,
      customerEmail: parsed.data.customerEmail,
      pickupAt,
      returnAt,
      pickupLocation: parsed.data.pickupLocation,
      totalEstimateMzn,
      notes: parsed.data.notes,
      status: "PENDING"
    }
  });

  return NextResponse.json({ reference: booking.reference, id: booking.id }, { status: 201 });
}
