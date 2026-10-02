import { Link } from "react-router-dom";
import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react";
import { getSettings } from "@/data/settings";

export default function Contact() {
  const settings = getSettings();
  const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    "Olá, gostaria de informações sobre o aluguer de viaturas."
  )}`;

  return (
    <section className="section">
      <div className="container-tight">
        <div className="max-w-2xl">
          <span className="eyebrow">Fala connosco</span>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
            Estamos em Quelimane, prontos a atender.
          </h1>
          <p className="mt-3 text-ink-400">
            Para informações sobre a frota, confirmação de reservas ou dúvidas sobre as
            condições, usa um dos canais abaixo.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <ContactCard
            icon={<Phone className="h-5 w-5" />}
            title="Telefone"
            lines={[settings.phone]}
            cta={{ label: "Ligar agora", href: `tel:${settings.phone.replace(/\s+/g, "")}` }}
          />
          <ContactCard
            icon={<MessageCircle className="h-5 w-5" />}
            title="WhatsApp"
            lines={["Resposta rápida durante o horário de atendimento"]}
            cta={{ label: "Abrir WhatsApp", href: whatsappUrl, external: true }}
          />
          <ContactCard icon={<MapPin className="h-5 w-5" />} title="Morada" lines={[settings.address]} />
          <ContactCard icon={<Clock className="h-5 w-5" />} title="Horário" lines={[settings.hoursText || "A confirmar com a equipa"]} />
          {settings.email ? (
            <ContactCard
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              lines={[settings.email]}
              cta={{ label: "Enviar email", href: `mailto:${settings.email}` }}
            />
          ) : null}
        </div>

        <div className="mt-12 rounded-2xl border border-night-600 bg-night-800/60 p-8">
          <h2 className="font-display text-2xl font-semibold">
            Preferes submeter um pedido pela nossa frota?
          </h2>
          <p className="mt-2 text-ink-400">Vê todas as viaturas disponíveis e escolhe a que precisas.</p>
          <Link to="/viaturas" className="btn-primary mt-5">Ver viaturas</Link>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon, title, lines, cta
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
  cta?: { label: string; href: string; external?: boolean };
}) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-400">{icon}</span>
        <h3 className="font-display text-xl font-semibold">{title}</h3>
      </div>
      <div className="mt-4 space-y-1 text-sm text-bone-200">
        {lines.map((l, i) => <p key={i}>{l}</p>)}
      </div>
      {cta ? (
        <a
          href={cta.href}
          target={cta.external ? "_blank" : undefined}
          rel={cta.external ? "noopener noreferrer" : undefined}
          className="btn-outline mt-5"
        >
          {cta.label}
        </a>
      ) : null}
    </div>
  );
}
