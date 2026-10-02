import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatDate, formatMzn } from "@/lib/format";
import { buildBookingWhatsAppUrl } from "@/lib/whatsapp";
import { bookingStatusLabel } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function BookingConfirmationPage({
  params
}: {
  params: { reference: string };
}) {
  const booking = await prisma.booking.findUnique({
    where: { reference: params.reference },
    include: { vehicle: true }
  });
  if (!booking) notFound();

  const settings = (await prisma.settings.findUnique({ where: { id: 1 } }))!;
  const waUrl = buildBookingWhatsAppUrl({
    whatsappNumber: settings.whatsapp,
    reference: booking.reference,
    customerName: booking.customerName,
    vehicle: booking.vehicle,
    pickupAt: booking.pickupAt,
    returnAt: booking.returnAt,
    pickupLocation: booking.pickupLocation,
    totalEstimateMzn: booking.totalEstimateMzn
  });

  return (
    <section className="section">
      <div className="container-tight max-w-3xl">
        <div className="card p-8 text-center sm:p-12">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-amber-400/15 text-amber-400 mx-auto">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h1 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">
            Pedido recebido!
          </h1>
          <p className="mt-2 text-ink-400">
            A tua reserva está em análise. A equipa confirma por telefone ou WhatsApp.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/5 px-4 py-2 font-mono text-sm text-amber-400">
            Referência: {booking.reference}
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Detail label="Viatura" value={`${booking.vehicle.brand} ${booking.vehicle.model}`} />
          <Detail label="Estado" value={bookingStatusLabel(booking.status)} />
          <Detail label="Levantamento" value={formatDate(booking.pickupAt)} />
          <Detail label="Devolução" value={formatDate(booking.returnAt)} />
          {booking.pickupLocation ? (
            <Detail label="Local" value={booking.pickupLocation} />
          ) : null}
          <Detail label="Estimativa" value={formatMzn(booking.totalEstimateMzn)} />
          <Detail label="Nome" value={booking.customerName} />
          <Detail label="Telefone" value={booking.customerPhone} />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <MessageCircle className="h-4 w-4" />
            Enviar resumo pelo WhatsApp
          </a>
          <Link href="/viaturas" className="btn-ghost">
            Voltar ao catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="card px-5 py-4">
      <p className="text-xs uppercase tracking-wider text-ink-400">{label}</p>
      <p className="mt-1 text-sm text-bone-50">{value}</p>
    </div>
  );
}
