import Link from "next/link";
import { ArrowRight, CalendarCheck, Car, MessageCircle, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/db";
import { Hero } from "@/components/Hero";
import { VehicleCard } from "@/components/VehicleCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await prisma.vehicle.findMany({
    where: { status: "AVAILABLE" },
    orderBy: { dailyRateMzn: "asc" },
    take: 6
  });

  return (
    <>
      <Hero />

      <section className="section">
        <div className="container-tight">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <span className="eyebrow">Frota em destaque</span>
              <h2 className="mt-3 font-display text-4xl font-semibold">
                Viaturas prontas a sair.
              </h2>
              <p className="mt-3 text-ink-400">
                Uma seleção da frota disponível para alugar hoje. Preços em meticais, por dia.
              </p>
            </div>
            <Link href="/viaturas" className="btn-outline">
              Ver todas as viaturas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((v) => (
              <VehicleCard key={v.id} {...v} />
            ))}
          </div>
        </div>
      </section>

      <section className="section gradient-fade">
        <div className="container-tight">
          <div className="max-w-2xl">
            <span className="eyebrow">Como funciona</span>
            <h2 className="mt-3 font-display text-4xl font-semibold">
              Três passos até à chave na mão.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Step
              icon={<Car className="h-5 w-5" />}
              step="01"
              title="Escolhe a viatura"
              text="Explora a frota, filtra por categoria, lugares ou preço e abre os detalhes."
            />
            <Step
              icon={<CalendarCheck className="h-5 w-5" />}
              step="02"
              title="Define as datas"
              text="Indica o período do aluguer e vê a estimativa de preço em meticais."
            />
            <Step
              icon={<MessageCircle className="h-5 w-5" />}
              step="03"
              title="Pedido confirmado"
              text="Enviamos a confirmação por telefone ou WhatsApp e combinamos o levantamento."
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-tight grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="eyebrow">Porquê a Kakeylka</span>
            <h2 className="mt-3 font-display text-4xl font-semibold">
              Experiência local, atendimento próximo.
            </h2>
            <p className="mt-4 text-ink-400">
              Operamos a partir de Quelimane com uma frota pensada para a realidade das estradas
              moçambicanas. Falamos a sua língua e tratamos cada reserva com atenção, sem
              burocracia desnecessária.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-bone-100">
              <Benefit text="Frota variada: do citadino económico ao 4x4 para viagens longas." />
              <Benefit text="Reserva online com confirmação por pessoa real." />
              <Benefit text="Suporte via WhatsApp antes, durante e após o aluguer." />
              <Benefit text="Levantamento na Avenida de Maputo, Quelimane." />
            </ul>
            <div className="mt-8">
              <Link href="/contactos" className="btn-primary">
                Fale connosco
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-night-600 shadow-card">
            <img
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&auto=format&fit=crop&q=80"
              alt="Viatura em Quelimane"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-900/80 via-transparent to-transparent" />
          </div>
        </div>
      </section>
    </>
  );
}

function Step({
  icon,
  step,
  title,
  text
}: {
  icon: React.ReactNode;
  step: string;
  title: string;
  text: string;
}) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 text-amber-400">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-amber-400/40 bg-amber-400/10">
          {icon}
        </span>
        <span className="font-display text-sm uppercase tracking-widest">{step}</span>
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-ink-400">{text}</p>
    </div>
  );
}

function Benefit({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
      <span>{text}</span>
    </li>
  );
}
