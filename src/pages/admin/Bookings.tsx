import { useSearchParams } from "react-router-dom";
import { AdminShell } from "@/components/admin/AdminShell";
import { BookingsTable } from "@/components/admin/BookingsTable";
import { getBookings } from "@/lib/store";

export default function AdminBookings() {
  const [search] = useSearchParams();
  const bookings = getBookings();
  const currentStatus = search.get("status") ?? "";

  return (
    <AdminShell>
      <h1 className="font-display text-3xl font-semibold">Reservas</h1>
      <div className="mt-6">
        <BookingsTable bookings={bookings} currentStatus={currentStatus} />
      </div>
    </AdminShell>
  );
}
