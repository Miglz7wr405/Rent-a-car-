"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";

type SettingsInput = {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hoursText: string;
};

export function SettingsForm({ initial }: { initial: SettingsInput }) {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function up<K extends keyof SettingsInput>(key: K, value: SettingsInput[K]) {
    setData((d) => ({ ...d, [key]: value }));
    setSaved(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    setSaving(false);
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(body?.error ?? "Erro ao guardar.");
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <L label="Telefone público">
          <input
            className="input"
            value={data.phone}
            onChange={(e) => up("phone", e.target.value)}
            placeholder="+258 84 411 6974"
            required
          />
        </L>
        <L label="WhatsApp (só dígitos, com indicativo)">
          <input
            className="input"
            value={data.whatsapp}
            onChange={(e) => up("whatsapp", e.target.value.replace(/\D/g, ""))}
            placeholder="258844116974"
            required
          />
        </L>
        <L label="Email">
          <input
            type="email"
            className="input"
            value={data.email}
            onChange={(e) => up("email", e.target.value)}
            placeholder="opcional"
          />
        </L>
        <L label="Horário">
          <input
            className="input"
            value={data.hoursText}
            onChange={(e) => up("hoursText", e.target.value)}
            placeholder="Segunda a Domingo · 07h00 — 18h00"
          />
        </L>
      </div>
      <L label="Morada">
        <input
          className="input"
          value={data.address}
          onChange={(e) => up("address", e.target.value)}
        />
      </L>

      {error ? (
        <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}
      {saved ? (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-200">
          Definições guardadas.
        </div>
      ) : null}

      <button type="submit" disabled={saving} className="btn-primary">
        {saving ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> A guardar…
          </>
        ) : (
          <>
            <Save className="h-4 w-4" /> Guardar
          </>
        )}
      </button>
    </form>
  );
}

function L({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
    </label>
  );
}
