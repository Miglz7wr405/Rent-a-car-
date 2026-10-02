import { Link } from "react-router-dom";
import { Car, CalendarCheck, Clock, AlertTriangle } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { getVehicles, getBookings } from "@/lib/store";
import { formatDate, formatMzn } from "@/lib/format";
import { bookingStatusLabel } from "@/lib/constants";

export default function Dashboard() {
  const vehicles = getVehicles();
  const bookings = getBookings();

  const totalVehicles = vehicles.length;
  const available = vehicles.filter((v) => v.status === "AVAILABLE").length;
  const totalBookings = bookings.length;
  const pending = bookings.filter((b) => b.status === "PENDING").length;

  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <AdminShell>
      <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={<Car className="h-5 w-5" />} label="Viaturas" value={totalVehicles} />
        <Stat icon={<CalendarCheck className="h-5 w-5" />} label="Disponíveis" value={available} />
        <Stat icon={<Clock className="h-5 w-5" />} label="Reservas" value={totalBookings} />
        <Stat icon={<AlertTriangle className="h-5 w-5" />} label="Pendentes" value={pending} />
      </div>

      <div className="mt-10">
        <h2 className="font-display text-xl font-semibold">Últimas reservas</h2>
        {recentBookings.length === 0 ? (
          <p className="mt-4 text-sm text-ink-400">Nenhuma reserva ainda.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-night-600 text-xs uppercase tracking-wider text-ink-400">
                  <th className="pb-3 pr-4">Referência</th>
                  <th className="pb-3 pr-4">Cliente</th>
                  <th className="pb-3 pr-4">Data</th>
                  <th className="pb-3 pr-4">Estimativa</th>
                  <th className="pb-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-night-700">
                {recentBookings.map((b) => (
                  <tr key={b.id}>
                    <td className="py-3 pr-4 font-mono text-amber-400">{b.reference}</td>
                    <td className="py-3 pr-4">{b.customerName}</td>
                    <td className="py-3 pr-4 text-ink-400">{formatDate(b.createdAt)}</td>
                    <td className="py-3 pr-4">{formatMzn(b.totalEstimateMzn)}</td>
                    <td className="py-3">
                      <span className="chip border-amber-400/40 text-amber-400">{bookingStatusLabel(b.status)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Link to="/admin/reservas" className="btn-ghost mt-4 inline-block text-sm">Ver todas →</Link>
      </div>
    </AdminShell>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <span className="grid h-12 w-12 place-items-center rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-400">
        {icon}
      </span>
      <div>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-sm text-ink-400">{label}</p>
      </div>
    </div>
  );
}
