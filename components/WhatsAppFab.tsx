import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { prisma } from "@/lib/db";

export async function WhatsAppFab() {
  const settings = await prisma.settings.findUnique({ where: { id: 1 } });
  const number = settings?.whatsapp ?? "258844116974";
  const url = `https://wa.me/${number}?text=${encodeURIComponent(
    "Olá, gostaria de informações sobre o aluguer de viaturas."
  )}`;
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar connosco no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-emerald-400"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </Link>
  );
}
