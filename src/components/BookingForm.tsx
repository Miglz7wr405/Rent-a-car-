import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Calendar, Check } from "lucide-react";
import { formatMzn, daysBetween } from "@/lib/format";
import { addBooking } from "@/lib/store";
import { getVehicles } from "@/lib/store";
import { getSettings } from "@/data/settings";
import { buildBookingWhatsAppUrl } from "@/lib/whatsapp";

type Props = {
  vehicleId: string;
  dailyRateMzn: number;
};

function todayIso(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export function BookingForm({ vehicleId, dailyRateMzn }: Props) {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState(todayIso(1));
  const [returnAt, setReturnAt] = useState(todayIso(3));
  const [pickupLocation, setPickupLocation] = useState("Avenida de Maputo, Quelimane");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const estimate = useMemo(() => {
    try {
      const d = daysBetween(new Date(pickup), new Date(returnAt));
      return { days: d, total: d * dailyRateMzn };
    } catch {
      return { days: 0, total: 0 };
    }
  }, [pickup, returnAt, dailyRateMzn]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!accepted) {
      setError("Precisas de aceitar as condições para continuar.");
      return;
    }
    setSubmitting(true);

    const booking = addBooking({
      vehicleId,
      pickupAt: new Date(pickup).toISOString(),
      returnAt: new Date(returnAt).toISOString(),
      pickupLocation,
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      totalEstimateMzn: estimate.total,
      notes
    });

    const vehicle = getVehicles().find((v) => v.id === vehicleId);
    const settings = getSettings();

    const waUrl = buildBookingWhatsAppUrl({
      whatsappNumber: settings.whatsapp,
      reference: booking.reference,
      customerName: name,
      vehicle: vehicle ?? { brand: "", model: "" },
      pickupAt: new Date(pickup),
      returnAt: new Date(returnAt),
      pickupLocation,
      totalEstimateMzn: estimate.total
    });

    window.open(waUrl, "_blank");
    navigate(`/reservas/${booking.reference}`);
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold">Pedir reserva</h3>
        <span className="chip">
          <Calendar className="h-3.5 w-3.5" /> {estimate.days} {estimate.days === 1 ? "dia" : "dias"}
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="label">Levantamento</span>
          <input
            type="date"
            className="input"
            value={pickup}
            min={todayIso()}
            onChange={(e) => setPickup(e.target.value)}
            required
          />
        </label>
        <label className="block">
          <span className="label">Devolução</span>
          <input
            type="date"
            className="input"
            value={returnAt}
            min={pickup}
            onChange={(e) => setReturnAt(e.target.value)}
            required
          />
        </label>
      </div>
      <label className="block">
        <span className="label">Local de levantamento</span>
        <input
          type="text"
          className="input"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="label">Nome completo</span>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
          />
        </label>
        <label className="block">
          <span className="label">Telefone</span>
          <input
            type="tel"
            className="input"
            placeholder="+258 84 000 0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
      </div>
      <label className="block">
        <span className="label">Email (opcional)</span>
        <input
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="block">
        <span className="label">Notas (opcional)</span>
        <textarea
          className="input min-h-[80px]"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Precisas de cadeira para criança, destino, etc."
        />
      </label>

      <div className="rounded-xl border border-amber-400/30 bg-amber-400/5 p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-bone-200">Estimativa</span>
          <span className="font-display text-2xl font-semibold text-amber-400">
            {formatMzn(estimate.total)}
          </span>
        </div>
        <p className="mt-1 text-xs text-ink-400">
          {estimate.days} {estimate.days === 1 ? "dia" : "dias"} &times; {formatMzn(dailyRateMzn)}/dia. Valor
          sujeito a confirmação pela equipa.
        </p>
      </div>

      <label className="flex items-start gap-2 text-sm text-bone-200">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-amber-500"
        />
        <span>
          Aceito que os meus dados sejam usados apenas para processar este pedido de reserva.
        </span>
      </label>

      {error ? (
        <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> A enviar&hellip;
          </>
        ) : (
          <>
            <Check className="h-4 w-4" /> Submeter pedido
          </>
        )}
      </button>
    </form>
  );
}
