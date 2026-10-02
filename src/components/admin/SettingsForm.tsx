import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { saveSettings, type Settings } from "@/data/settings";

export function SettingsForm({ initial }: { initial: Settings }) {
  const [data, setData] = useState(initial);
  const [saved, setSaved] = useState(false);

  function up<K extends keyof Settings>(key: K, value: Settings[K]) {
    setData((d) => ({ ...d, [key]: value }));
    setSaved(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveSettings(data);
    setSaved(true);
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <L label="Telefone público">
          <input className="input" value={data.phone} onChange={(e) => up("phone", e.target.value)} placeholder="+258 84 411 6974" required />
        </L>
        <L label="WhatsApp (só dígitos, com indicativo)">
          <input className="input" value={data.whatsapp} onChange={(e) => up("whatsapp", e.target.value.replace(/\D/g, ""))} placeholder="258844116974" required />
        </L>
        <L label="Email">
          <input type="email" className="input" value={data.email} onChange={(e) => up("email", e.target.value)} placeholder="opcional" />
        </L>
        <L label="Horário">
          <input className="input" value={data.hoursText} onChange={(e) => up("hoursText", e.target.value)} placeholder="Segunda a Domingo · 07h00 — 18h00" />
        </L>
      </div>
      <L label="Morada">
        <input className="input" value={data.address} onChange={(e) => up("address", e.target.value)} />
      </L>

      {saved ? (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-200">
          Definições guardadas.
        </div>
      ) : null}

      <button type="submit" className="btn-primary">
        <Save className="h-4 w-4" /> Guardar
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
