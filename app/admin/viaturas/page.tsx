import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatMzn } from "@/lib/format";
import { categoryLabel } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function AdminVehiclesPage() {
  const vehicles = await prisma.vehicle.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Viaturas</h1>
          <p className="text-sm text-ink-400">{vehicles.length} viaturas na frota.</p>
        </div>
        <Link href="/admin/viaturas/novo" className="btn-primary">
          <Plus className="h-4 w-4" /> Nova viatura
        </Link>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-ink-400">
              <th className="px-4 py-3">Viatura</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Tarifa</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id} className="border-t border-night-700/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-16 flex-shrink-0 overflow-hidden rounded-md bg-night-700">
                      <Image
                        src={v.mainImage}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">
                        {v.brand} {v.model}
                      </p>
                      <p className="text-xs text-ink-400">
                        {v.year} · {v.seats} lugares
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{categoryLabel(v.category)}</td>
                <td className="px-4 py-3 text-amber-400">{formatMzn(v.dailyRateMzn)}/dia</td>
                <td className="px-4 py-3">
                  <StatusChip status={v.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/viaturas/${v.id}`}
                    className="text-sm text-amber-400 hover:underline"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusChip({ status }: { status: string }) {
  const map: Record<string, string> = {
    AVAILABLE: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    UNAVAILABLE: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    ARCHIVED: "border-slate-500/40 bg-slate-500/10 text-slate-300"
  };
  const label: Record<string, string> = {
    AVAILABLE: "Disponível",
    UNAVAILABLE: "Indisponível",
    ARCHIVED: "Arquivada"
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs ${map[status] ?? ""}`}>
      {label[status] ?? status}
    </span>
  );
}
