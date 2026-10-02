import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Trash2 } from "lucide-react";
import { CATEGORIES, TRANSMISSIONS, FUELS, STATUSES } from "@/lib/constants";
import { saveVehicle } from "@/lib/store";
import type { Vehicle } from "@/data/vehicles";

type VehicleInput = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  seats: number;
  transmission: string;
  fuel: string;
  dailyRateMzn: number;
  description: string;
  mainImage: string;
  extraImages: string[];
  status: string;
};

function vehicleToInput(v?: Vehicle): VehicleInput {
  if (!v)
    return {
      id: "",
      slug: "",
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      category: "SEDAN",
      seats: 5,
      transmission: "MANUAL",
      fuel: "PETROL",
      dailyRateMzn: 3000,
      description: "",
      mainImage: "",
      extraImages: [],
      status: "AVAILABLE"
    };
  return {
    id: v.id,
    slug: v.slug,
    brand: v.brand,
    model: v.model,
    year: v.year,
    category: v.category,
    seats: v.seats,
    transmission: v.transmission,
    fuel: v.fuel,
    dailyRateMzn: v.dailyRateMzn,
    description: v.description,
    mainImage: v.mainImage,
    extraImages: v.images.map((i) => i.url),
    status: v.status
  };
}

export function VehicleForm({ initial }: { initial?: Vehicle }) {
  const navigate = useNavigate();
  const [data, setData] = useState<VehicleInput>(vehicleToInput(initial));
  const [error, setError] = useState<string | null>(null);

  function up<K extends keyof VehicleInput>(key: K, value: VehicleInput[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function autoSlug() {
    if (data.slug) return;
    const slug = `${data.brand}-${data.model}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    up("slug", slug);
  }

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const id = data.id || data.slug || Date.now().toString(36);
    const vehicle: Vehicle = {
      id,
      slug: data.slug,
      brand: data.brand,
      model: data.model,
      year: data.year,
      category: data.category,
      seats: data.seats,
      transmission: data.transmission,
      fuel: data.fuel,
      dailyRateMzn: data.dailyRateMzn,
      description: data.description,
      mainImage: data.mainImage,
      status: data.status,
      images: [{ url: data.mainImage }, ...data.extraImages.map((url) => ({ url }))]
    };
    saveVehicle(vehicle);
    navigate("/admin/viaturas");
  }

  function onArchive() {
    if (!data.id) return;
    if (!confirm("Arquivar esta viatura? Deixa de aparecer no site público.")) return;
    up("status", "ARCHIVED");
    const vehicle: Vehicle = {
      id: data.id,
      slug: data.slug,
      brand: data.brand,
      model: data.model,
      year: data.year,
      category: data.category,
      seats: data.seats,
      transmission: data.transmission,
      fuel: data.fuel,
      dailyRateMzn: data.dailyRateMzn,
      description: data.description,
      mainImage: data.mainImage,
      status: "ARCHIVED",
      images: [{ url: data.mainImage }, ...data.extraImages.map((url) => ({ url }))]
    };
    saveVehicle(vehicle);
    navigate("/admin/viaturas");
  }

  return (
    <form onSubmit={onSave} className="space-y-6">
      <div className="card space-y-5 p-6">
        <h2 className="font-display text-xl font-semibold">Dados principais</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <L label="Marca">
            <input className="input" value={data.brand} onChange={(e) => up("brand", e.target.value)} onBlur={autoSlug} required />
          </L>
          <L label="Modelo">
            <input className="input" value={data.model} onChange={(e) => up("model", e.target.value)} onBlur={autoSlug} required />
          </L>
          <L label="Slug (URL)">
            <input className="input" value={data.slug} onChange={(e) => up("slug", e.target.value)} placeholder="toyota-corolla" required />
          </L>
          <L label="Ano">
            <input type="number" className="input" min={1990} max={new Date().getFullYear() + 1} value={data.year} onChange={(e) => up("year", Number(e.target.value))} />
          </L>
          <L label="Categoria">
            <select className="input" value={data.category} onChange={(e) => up("category", e.target.value)}>
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </L>
          <L label="Lugares">
            <input type="number" className="input" min={1} max={30} value={data.seats} onChange={(e) => up("seats", Number(e.target.value))} />
          </L>
          <L label="Transmissão">
            <select className="input" value={data.transmission} onChange={(e) => up("transmission", e.target.value)}>
              {TRANSMISSIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </L>
          <L label="Combustível">
            <select className="input" value={data.fuel} onChange={(e) => up("fuel", e.target.value)}>
              {FUELS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </L>
          <L label="Tarifa diária (MZN)">
            <input type="number" className="input" min={0} step={100} value={data.dailyRateMzn} onChange={(e) => up("dailyRateMzn", Number(e.target.value))} />
          </L>
          <L label="Estado">
            <select className="input" value={data.status} onChange={(e) => up("status", e.target.value)}>
              {STATUSES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </L>
        </div>
        <L label="Descrição">
          <textarea className="input min-h-[120px]" value={data.description} onChange={(e) => up("description", e.target.value)} required />
        </L>
      </div>

      <div className="card space-y-4 p-6">
        <h2 className="font-display text-xl font-semibold">Imagens</h2>
        <p className="text-xs text-ink-400">Cola URLs de imagens (JPG, PNG ou WebP). A primeira será usada como capa.</p>
        <L label="Imagem principal (URL)">
          <input className="input" value={data.mainImage} onChange={(e) => up("mainImage", e.target.value)} placeholder="https://..." required />
        </L>
        <L label="Imagens adicionais (URL por linha)">
          <textarea
            className="input min-h-[100px]"
            value={data.extraImages.join("\n")}
            onChange={(e) => up("extraImages", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
            placeholder={"https://...\nhttps://..."}
          />
        </L>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-200">{error}</div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="submit" className="btn-primary">
          {data.id ? "Guardar alterações" : "Criar viatura"}
        </button>
        {data.id ? (
          <button type="button" onClick={onArchive} className="btn-ghost text-rose-300 hover:border-rose-500/50 hover:text-rose-200">
            <Trash2 className="h-4 w-4" /> Arquivar viatura
          </button>
        ) : null}
      </div>
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
