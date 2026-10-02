import { AdminShell } from "@/components/admin/AdminShell";
import { VehicleForm } from "@/components/admin/VehicleForm";

export default function VehicleNew() {
  return (
    <AdminShell>
      <h1 className="font-display text-3xl font-semibold">Nova viatura</h1>
      <div className="mt-6">
        <VehicleForm />
      </div>
    </AdminShell>
  );
}
