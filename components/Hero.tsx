import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=2400&auto=format&fit=crop&q=80"
          alt=""
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-900/60 via-night-900/80 to-night-900" />
      </div>
      <div className="container-tight relative py-28 sm:py-36">
        <div className="max-w-2xl animate-fade-up">
          <span className="eyebrow">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
            Aluguer de viaturas · Quelimane
          </span>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] text-bone-50 sm:text-6xl md:text-7xl">
            A sua próxima viagem
            <span className="block text-amber-400">começa aqui.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-bone-200">
            Frota variada para a cidade, para o trabalho e para as estradas de Moçambique.
            Reserva simples pelo site, confirmação rápida pela nossa equipa.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/viaturas" className="btn-primary">
              Ver viaturas
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contactos" className="btn-ghost">
              Falar connosco
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-bone-200">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              Reserva sem pré-pagamento
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-400" />
              Equipa local em Quelimane
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
