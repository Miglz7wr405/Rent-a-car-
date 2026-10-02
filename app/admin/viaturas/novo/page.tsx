import { VehicleForm } from "@/components/admin/VehicleForm";

export default function NewVehiclePage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold">Nova viatura</h1>
      <VehicleForm />
    </div>
  );
}
