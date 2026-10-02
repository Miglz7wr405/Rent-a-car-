import { VEHICLES, type Vehicle } from "@/data/vehicles";

export type Booking = {
  id: string;
  reference: string;
  vehicleId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupAt: string;
  returnAt: string;
  pickupLocation: string;
  totalEstimateMzn: number;
  status: string;
  notes: string;
  createdAt: string;
};

const BOOKINGS_KEY = "kakeylka_bookings";
const VEHICLES_KEY = "kakeylka_vehicles";

function generateReference(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `KK-${year}-${rand}`;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function getBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function addBooking(data: Omit<Booking, "id" | "reference" | "status" | "createdAt">): Booking {
  const bookings = getBookings();
  const booking: Booking = {
    ...data,
    id: generateId(),
    reference: generateReference(),
    status: "PENDING",
    createdAt: new Date().toISOString()
  };
  bookings.unshift(booking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  return booking;
}

export function updateBookingStatus(id: string, status: string): void {
  const bookings = getBookings();
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx >= 0) {
    bookings[idx].status = status;
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }
}

export function getBookingByReference(reference: string): Booking | undefined {
  return getBookings().find((b) => b.reference === reference);
}

export function getVehicles(): Vehicle[] {
  try {
    const raw = localStorage.getItem(VEHICLES_KEY);
    if (raw) {
      const overrides: Vehicle[] = JSON.parse(raw);
      const merged = VEHICLES.map((v) => {
        const override = overrides.find((o) => o.id === v.id);
        return override ?? v;
      });
      const added = overrides.filter((o) => !VEHICLES.find((v) => v.id === o.id));
      return [...merged, ...added];
    }
  } catch {}
  return [...VEHICLES];
}

export function saveVehicle(vehicle: Vehicle): void {
  const all = getVehicles();
  const idx = all.findIndex((v) => v.id === vehicle.id);
  if (idx >= 0) {
    all[idx] = vehicle;
  } else {
    all.push(vehicle);
  }
  localStorage.setItem(VEHICLES_KEY, JSON.stringify(all));
}

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return getVehicles().find((v) => v.slug === slug && v.status !== "ARCHIVED");
}
