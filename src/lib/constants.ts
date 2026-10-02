export const COMPANY_NAME = "Kakeylka Rent a Car";
export const COMPANY_TAGLINE = "Aluguer de viaturas em Quelimane";
export const DEFAULT_WHATSAPP = "258844116974";
export const DEFAULT_PHONE = "+258 84 411 6974";
export const DEFAULT_ADDRESS = "Avenida de Maputo, Quelimane, Moçambique";

export const CATEGORIES = [
  { value: "SEDAN", label: "Sedan" },
  { value: "SUV", label: "SUV" },
  { value: "SUV_4X4", label: "SUV 4x4" },
  { value: "PICKUP", label: "Pickup" },
  { value: "HATCHBACK", label: "Hatchback" },
  { value: "VAN", label: "Van" }
] as const;

export const TRANSMISSIONS = [
  { value: "MANUAL", label: "Manual" },
  { value: "AUTO", label: "Automática" }
] as const;

export const FUELS = [
  { value: "PETROL", label: "Gasolina" },
  { value: "DIESEL", label: "Gasóleo" }
] as const;

export const STATUSES = [
  { value: "AVAILABLE", label: "Disponível" },
  { value: "UNAVAILABLE", label: "Indisponível" },
  { value: "ARCHIVED", label: "Arquivada" }
] as const;

export const BOOKING_STATUSES = [
  { value: "PENDING", label: "Pendente", tone: "amber" },
  { value: "CONFIRMED", label: "Confirmada", tone: "emerald" },
  { value: "REFUSED", label: "Recusada", tone: "rose" },
  { value: "CANCELLED", label: "Cancelada", tone: "slate" },
  { value: "COMPLETED", label: "Concluída", tone: "sky" }
] as const;

export function categoryLabel(value: string) {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value;
}
export function transmissionLabel(value: string) {
  return TRANSMISSIONS.find((c) => c.value === value)?.label ?? value;
}
export function fuelLabel(value: string) {
  return FUELS.find((c) => c.value === value)?.label ?? value;
}
export function bookingStatusLabel(value: string) {
  return BOOKING_STATUSES.find((c) => c.value === value)?.label ?? value;
}
