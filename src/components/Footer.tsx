import { Link } from "react-router-dom";
import { MapPin, Phone, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { getSettings } from "@/data/settings";

export function Footer() {
  const settings = getSettings();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-night-700/60 bg-night-950">
      <div className="container-tight grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-400">
            Aluguer de viaturas em Quelimane. Reserva pelo site, confirmação pela nossa equipa
            e levantamento rápido na Avenida de Maputo.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-amber-400">
            Contactos
          </h3>
          <ul className="space-y-3 text-sm text-bone-100">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-ink-400" />
              <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="hover:text-amber-400">
                {settings.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-ink-400" />
              <span>{settings.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 text-ink-400" />
              <span>{settings.hoursText}</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-amber-400">
            Navegação
          </h3>
          <ul className="space-y-2 text-sm text-bone-100">
            <li><Link to="/" className="hover:text-amber-400">Início</Link></li>
            <li><Link to="/viaturas" className="hover:text-amber-400">Viaturas</Link></li>
            <li><Link to="/contactos" className="hover:text-amber-400">Contactos</Link></li>
            <li><Link to="/admin/login" className="hover:text-amber-400">Área administrativa</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-night-700/60">
        <div className="container-tight flex flex-col gap-2 py-5 text-xs text-ink-400 md:flex-row md:items-center md:justify-between">
          <span>&copy; {year} Kakeylka Rent a Car. Todos os direitos reservados.</span>
          <span>Quelimane &middot; Moçambique</span>
        </div>
      </div>
    </footer>
  );
}
