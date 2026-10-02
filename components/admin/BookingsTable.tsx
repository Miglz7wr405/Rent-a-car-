"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check, X, CalendarCheck, Ban } from "lucide-react";
import { formatDate, formatDateTime, formatMzn } from "@/lib/format";
import { BOOKING_STATUSES } from "@/lib/constants";

type Row = {
  id: string;
  reference: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  vehicleLabel: string;
  pickupAt: string;
  returnAt: string;
  pickupLocation: string | null;
  totalEstimateMzn: number;
  status: string;
  notes: string | null;
  createdAt: string;
};

export function BookingsTable({
  bookings,
  currentStatus
}: {
  bookings: Row[];
  currentStatus: string;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<Row | null>(null);
  const [pending, startTransition] = useTransition();

  function filter(status: string) {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    startTransition(() => router.push(`/admin/reservas?${params.toString()}`));
  }

  async function changeStatus(id: string, status: string, notes?: string) {
    const res = await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes })
    });
    if (res.ok) {
      router.refresh();
      setSelected(null);
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <FilterChip label="Todas" active={currentStatus === ""} onClick={() => filter("")} />
        {BOOKING_STATUSES.map((s) => (
          <FilterChip
            key={s.value}
            label={s.label}
            active={currentStatus === s.value}
            onClick={() => filter(s.value)}
          />
        ))}
        {pending ? <Loader2 className="h-4 w-4 animate-spin text-ink-400" /> : null}
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-ink-400">
              <th className="px-4 py-3">Referência</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Viatura</th>
              <th className="px-4 py-3">Período</th>
              <th className="px-4 py-3">Estimativa</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-ink-400">
                  Sem reservas para mostrar.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id} className="border-t border-night-700/60">
                  <td className="px-4 py-3 font-mono text-amber-400">{b.reference}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{b.customerName}</p>
                    <p className="text-xs text-ink-400">{b.customerPhone}</p>
                  </td>
                  <td className="px-4 py-3">{b.vehicleLabel}</td>
                  <td className="px-4 py-3 text-xs text-bone-200">
                    {formatDate(b.pickupAt)} → {formatDate(b.returnAt)}
                  </td>
                  <td className="px-4 py-3">{formatMzn(b.totalEstimateMzn)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSelected(b)}
                      className="text-sm text-amber-400 hover:underline"
                    >
                      Abrir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-night-950/80 p-0 sm:items-center sm:p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-xl rounded-t-3xl border border-night-600 bg-night-900 p-6 shadow-glow sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-sm text-amber-400">{selected.reference}</p>
                <h2 className="mt-1 font-display text-2xl font-semibold">{selected.customerName}</h2>
                <p className="text-sm text-ink-400">Submetida {formatDateTime(selected.createdAt)}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full p-2 text-ink-400 hover:text-bone-50"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              <Field label="Viatura" value={selected.vehicleLabel} />
              <Field label="Telefone" value={selected.customerPhone} />
              {selected.customerEmail ? (
                <Field label="Email" value={selected.customerEmail} />
              ) : null}
              <Field label="Levantamento" value={formatDate(selected.pickupAt)} />
              <Field label="Devolução" value={formatDate(selected.returnAt)} />
              {selected.pickupLocation ? (
                <Field label="Local" value={selected.pickupLocation} />
              ) : null}
              <Field label="Estimativa" value={formatMzn(selected.totalEstimateMzn)} />
              <Field label="Estado atual" value={<StatusBadge status={selected.status} />} />
            </div>
            {selected.notes ? (
              <div className="mt-4 rounded-xl border border-night-600 bg-night-800/60 p-3 text-sm text-bone-200">
                <p className="mb-1 text-xs uppercase tracking-wider text-ink-400">Notas do cliente</p>
                {selected.notes}
              </div>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-2">
              {selected.status === "PENDING" ? (
                <>
                  <button
                    type="button"
                    onClick={() => changeStatus(selected.id, "CONFIRMED")}
                    className="btn-primary"
                  >
                    <Check className="h-4 w-4" /> Confirmar
                  </button>
                  <button
                    type="button"
                    onClick={() => changeStatus(selected.id, "REFUSED")}
                    className="btn-ghost text-rose-300 hover:border-rose-500/50"
                  >
                    <Ban className="h-4 w-4" /> Recusar
                  </button>
                </>
              ) : null}
              {selected.status === "CONFIRMED" ? (
                <button
                  type="button"
                  onClick={() => changeStatus(selected.id, "COMPLETED")}
                  className="btn-primary"
                >
                  <CalendarCheck className="h-4 w-4" /> Marcar como concluída
                </button>
              ) : null}
              {["PENDING", "CONFIRMED"].includes(selected.status) ? (
                <button
                  type="button"
                  onClick={() => changeStatus(selected.id, "CANCELLED")}
                  className="btn-ghost"
                >
                  Cancelar
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs transition ${
        active
          ? "border-amber-400/50 bg-amber-400/10 text-amber-400"
          : "border-night-600 text-bone-200 hover:border-amber-400/40"
      }`}
    >
      {label}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const def = BOOKING_STATUSES.find((s) => s.value === status);
  const tones: Record<string, string> = {
    amber: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    emerald: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    rose: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    slate: "border-slate-500/40 bg-slate-500/10 text-slate-300",
    sky: "border-sky-500/40 bg-sky-500/10 text-sky-300"
  };
  const tone = tones[def?.tone ?? "slate"];
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs ${tone}`}>
      {def?.label ?? status}
    </span>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-ink-400">{label}</p>
      <p className="mt-0.5 text-sm text-bone-50">{value}</p>
    </div>
  );
}
