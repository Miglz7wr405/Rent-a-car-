import { MessageCircle } from "lucide-react";
import { getSettings } from "@/data/settings";

export function WhatsAppFab() {
  const settings = getSettings();
  const url = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    "Olá, gostaria de informações sobre o aluguer de viaturas."
  )}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar connosco no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-emerald-400"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
