import { formatDistance, parseISO, differenceInDays } from "date-fns";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (
  dateStr1: string | Date,
  dateStr2: string | Date
): number =>
  differenceInDays(
    parseISO(typeof dateStr1 === "string" ? dateStr1 : dateStr1.toISOString()),
    parseISO(typeof dateStr2 === "string" ? dateStr2 : dateStr2.toISOString())
  );

export const formatDistanceFromNow = (dateStr: string): string =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options: { end?: boolean } = {}): string {
  const today = new Date();
  const timezoneOffset = today.getTimezoneOffset();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setHours(23, 59, 59, 999);
  else today.setHours(0, 0, 0, 0);

  today.setMinutes(today.getMinutes() - timezoneOffset);

  return today.toISOString();
};

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("de", { style: "currency", currency: "EUR" }).format(
    value
  );
