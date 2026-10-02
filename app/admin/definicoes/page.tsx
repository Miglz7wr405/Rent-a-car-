import { prisma } from "@/lib/db";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = (await prisma.settings.findUnique({ where: { id: 1 } }))!;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Definições</h1>
        <p className="text-sm text-ink-400">
          Contactos e informação pública que aparece no site e nas mensagens de WhatsApp.
        </p>
      </div>
      <SettingsForm
        initial={{
          phone: settings.phone,
          whatsapp: settings.whatsapp,
          email: settings.email,
          address: settings.address,
          hoursText: settings.hoursText
        }}
      />
    </div>
  );
}
