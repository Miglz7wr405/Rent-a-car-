import { AdminShell } from "@/components/admin/AdminShell";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSettings } from "@/data/settings";

export default function AdminSettings() {
  const settings = getSettings();

  return (
    <AdminShell>
      <h1 className="font-display text-3xl font-semibold">Definições</h1>
      <div className="mt-6">
        <SettingsForm initial={settings} />
      </div>
    </AdminShell>
  );
}
