import { daysBetween } from "./format";

export function estimateTotal(dailyRateMzn: number, pickupAt: Date, returnAt: Date): number {
  const days = daysBetween(pickupAt, returnAt);
  return days * dailyRateMzn;
}
