import { Car, Clock, CheckCircle2, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDate, formatDateTime, formatMzn } from "@/lib/format";
import { bookingStatusLabel } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [vehiclesAvailable, pendingCount, confirmedThisMonth, upcoming, recent] = await Promise.all([
    prisma.vehicle.count({ where: { status: "AVAILABLE" } }),
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.booking.count({
      where: {
        status: "CONFIRMED",
        createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
      }
    }),
    prisma.booking.findFirst({
      where: { status: "CONFIRMED", pickupAt: { gte: new Date() } },
      orderBy: { pickupAt: "asc" },
      include: { vehicle: true }
    }),
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { vehicle: true }
    })
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
        <p className="text-sm text-ink-400">Visão geral da operação.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={<Car className="h-5 w-5" />}
          label="Viaturas disponíveis"
          value={vehiclesAvailable.toString()}
        />
        <Stat
          icon={<Clock className="h-5 w-5" />}
          label="Pedidos pendentes"
          value={pendingCount.toString()}
          tone={pendingCount > 0 ? "amber" : "default"}
        />
        <Stat
          icon={<CheckCircle2 className="h-5 w-5" />}
          label="Confirmadas este mês"
          value={confirmedThisMonth.toString()}
        />
        <Stat
          icon={<CalendarCheck className="h-5 w-5" />}
          label="Próxima entrega"
          value={upcoming ? formatDate(upcoming.pickupAt) : "—"}
          sub={upcoming ? `${upcoming.vehicle.brand} ${upcoming.vehicle.model}` : "Sem reservas"}
        />
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Atividade recente</h2>
          <Link href="/admin/reservas" className="text-sm text-amber-400 hover:underline">
            Ver todas →
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="mt-6 text-sm text-ink-400">Ainda não há reservas.</p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-ink-400">
                  <th className="py-2">Referência</th>
                  <th className="py-2">Viatura</th>
                  <th className="py-2">Cliente</th>
                  <th className="py-2">Submetida</th>
                  <th className="py-2 text-right">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((b) => (
                  <tr key={b.id} className="border-t border-night-700/60">
                    <td className="py-3 font-mono text-amber-400">{b.reference}</td>
                    <td className="py-3">{b.vehicle.brand} {b.vehicle.model}</td>
                    <td className="py-3">{b.customerName}</td>
                    <td className="py-3 text-ink-400">{formatDateTime(b.createdAt)}</td>
                    <td className="py-3 text-right">
                      <span className="chip">{bookingStatusLabel(b.status)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  sub,
  tone = "default"
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  tone?: "default" | "amber";
}) {
  return (
    <div className="card p-5">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
          tone === "amber"
            ? "bg-amber-400/15 text-amber-400"
            : "bg-night-700 text-bone-200"
        }`}
      >
        {icon}
      </div>
      <p className="mt-4 text-xs uppercase tracking-wider text-ink-400">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold">{value}</p>
      {sub ? <p className="mt-1 text-xs text-ink-400">{sub}</p> : null}
    </div>
  );
}
