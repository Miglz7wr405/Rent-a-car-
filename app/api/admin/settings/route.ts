import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  phone: z.string().min(4),
  whatsapp: z.string().regex(/^\d{6,20}$/, "Apenas dígitos, com indicativo"),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().min(1),
  hoursText: z.string().optional().default("")
});

export async function PATCH(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos.", details: parsed.error.flatten() }, { status: 400 });
  }
  const settings = await prisma.settings.upsert({
    where: { id: 1 },
    create: { id: 1, ...parsed.data, email: parsed.data.email ?? "" },
    update: { ...parsed.data, email: parsed.data.email ?? "" }
  });
  return NextResponse.json({ ok: true, settings });
}
