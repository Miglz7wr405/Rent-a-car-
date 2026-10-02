"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useTransition } from "react";
import { CATEGORIES, TRANSMISSIONS } from "@/lib/constants";
import { X } from "lucide-react";

export function CatalogFilters() {
  return (
    <Suspense fallback={<div className="rounded-2xl border border-night-600 bg-night-800/60 p-4 text-sm text-ink-400">A carregar filtros…</div>}>
      <CatalogFiltersInner />
    </Suspense>
  );
}

function CatalogFiltersInner() {
  const router = useRouter();
  const search = useSearchParams();
  const [pending, startTransition] = useTransition();

  function update(key: string, value: string) {
    const params = new URLSearchParams(search?.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    startTransition(() => {
      router.push(`/viaturas?${params.toString()}`);
    });
  }

  const current = {
    category: search?.get("category") ?? "",
    transmission: search?.get("transmission") ?? "",
    seats: search?.get("seats") ?? "",
    sort: search?.get("sort") ?? "price-asc"
  };
  const hasAny = !!(current.category || current.transmission || current.seats);

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-night-600 bg-night-800/60 p-4">
      <Field label="Categoria">
        <select
          className="input appearance-none pr-8"
          value={current.category}
          onChange={(e) => update("category", e.target.value)}
        >
          <option value="">Todas</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Transmissão">
        <select
          className="input appearance-none pr-8"
          value={current.transmission}
          onChange={(e) => update("transmission", e.target.value)}
        >
          <option value="">Todas</option>
          {TRANSMISSIONS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Mínimo de lugares">
        <select
          className="input appearance-none pr-8"
          value={current.seats}
          onChange={(e) => update("seats", e.target.value)}
        >
          <option value="">Qualquer</option>
          {[2, 4, 5, 7, 9].map((n) => (
            <option key={n} value={n}>
              {n}+ lugares
            </option>
          ))}
        </select>
      </Field>
      <Field label="Ordenar">
        <select
          className="input appearance-none pr-8"
          value={current.sort}
          onChange={(e) => update("sort", e.target.value)}
        >
          <option value="price-asc">Preço: mais barato</option>
          <option value="price-desc">Preço: mais caro</option>
          <option value="newest">Mais recentes</option>
        </select>
      </Field>
      {hasAny ? (
        <button
          type="button"
          onClick={() => {
            startTransition(() => router.push("/viaturas"));
          }}
          className="btn-ghost ml-auto"
        >
          <X className="h-4 w-4" /> Limpar filtros
        </button>
      ) : null}
      {pending ? (
        <span className="text-xs text-ink-400">A atualizar…</span>
      ) : null}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex min-w-[150px] flex-1 flex-col sm:flex-none">
      <span className="label">{label}</span>
      {children}
    </label>
  );
}
