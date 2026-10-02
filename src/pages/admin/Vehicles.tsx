import { Link } from "react-router-dom";
import { Plus, Pencil } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { getVehicles } from "@/lib/store";
import { categoryLabel } from "@/lib/constants";
import { formatMzn } from "@/lib/format";

export default function AdminVehicles() {
  const vehicles = getVehicles();

  return (
    <AdminShell>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold">Viaturas</h1>
        <Link to="/admin/viaturas/novo" className="btn-primary">
          <Plus className="h-4 w-4" /> Adicionar
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-night-600 text-xs uppercase tracking-wider text-ink-400">
              <th className="pb-3 pr-4">Viatura</th>
              <th className="pb-3 pr-4">Categoria</th>
              <th className="pb-3 pr-4">Preço/dia</th>
              <th className="pb-3 pr-4">Estado</th>
              <th className="pb-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-night-700">
            {vehicles.map((v) => (
              <tr key={v.id}>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <img src={v.mainImage} alt="" className="h-10 w-14 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium">{v.brand} {v.model}</p>
                      <p className="text-xs text-ink-400">{v.year}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-4 text-ink-400">{categoryLabel(v.category)}</td>
                <td className="py-3 pr-4">{formatMzn(v.dailyRateMzn)}</td>
                <td className="py-3 pr-4">
                  <StatusChip status={v.status} />
                </td>
                <td className="py-3 text-right">
                  <Link to={`/admin/viaturas/${v.id}`} className="btn-ghost p-2">
                    <Pencil className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

function StatusChip({ status }: { status: string }) {
  const cls = status === "AVAILABLE"
    ? "border-emerald-400/40 text-emerald-400"
    : "border-red-400/40 text-red-400";
  const label = status === "AVAILABLE" ? "Disponível" : "Indisponível";
  return <span className={`chip ${cls}`}>{label}</span>;
}
