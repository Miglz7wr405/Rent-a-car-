import { formatDate, formatMzn } from "./format";

type Vehicle = { brand: string; model: string };

export function buildBookingWhatsAppUrl(opts: {
  whatsappNumber: string;
  reference: string;
  customerName: string;
  vehicle: Vehicle;
  pickupAt: Date;
  returnAt: Date;
  pickupLocation?: string | null;
  totalEstimateMzn: number;
}) {
  const lines = [
    `Olá! Enviei um pedido de reserva pelo site da Kakeylka Rent a Car.`,
    ``,
    `*Referência:* ${opts.reference}`,
    `*Nome:* ${opts.customerName}`,
    `*Viatura:* ${opts.vehicle.brand} ${opts.vehicle.model}`,
    `*Levantamento:* ${formatDate(opts.pickupAt)}`,
    `*Devolução:* ${formatDate(opts.returnAt)}`,
    opts.pickupLocation ? `*Local:* ${opts.pickupLocation}` : null,
    `*Estimativa:* ${formatMzn(opts.totalEstimateMzn)}`,
    ``,
    `Fico a aguardar a confirmação.`
  ].filter(Boolean);
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${opts.whatsappNumber}?text=${text}`;
}

export function buildContactWhatsAppUrl(whatsappNumber: string, message?: string) {
  const base = `https://wa.me/${whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
