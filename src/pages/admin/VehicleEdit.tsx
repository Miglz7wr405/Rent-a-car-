import { useParams } from "react-router-dom";
import { AdminShell } from "@/components/admin/AdminShell";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { getVehicles } from "@/lib/store";
import NotFound from "../NotFound";

export default function VehicleEdit() {
  const { id } = useParams<{ id: string }>();
  const vehicle = getVehicles().find((v) => v.id === id);
  if (!vehicle) return <NotFound />;

  return (
    <AdminShell>
      <h1 className="font-display text-3xl font-semibold">Editar {vehicle.brand} {vehicle.model}</h1>
      <div className="mt-6">
        <VehicleForm initial={vehicle} />
      </div>
    </AdminShell>
  );
}
