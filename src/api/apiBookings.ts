import supabase from "./supabase";
import { endOfDay } from "date-fns";
import { PAGE_SIZE } from "@/utils/constants";
import { getToday } from "@/utils/helpers";

//! Get bookings
type BookingsTypes = {
  filter: {
    method: "eq" | "gte" | "lte" | "neq" | "gt" | "lt"; // all the possible methods
    field: string;
    value: string;
  } | null;
  sortBy: {
    field: string;
    direction: string;
  } | null;
  page: number;
};

export async function getBookings({ filter, sortBy, page }: BookingsTypes) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startTime, endTime, status, totalPrice, services(name), clients(fullName, email, phoneNumber)",
      { count: "exact" }
    );

  //! Filter
  if (filter) {
    query = query[filter.method || "eq"](
      filter.field,
      filter.value
    ) as typeof query; // Type assertion to ensure TS knows this is a valid method
  }

  //! Sort
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  //! Pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = page * PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching bookings");
  }

  return { data, count };
}

//! Get only unconfirmed bookings
export async function getUnconfirmedBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("status", "unconfirmed")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

//! Get a single booking
export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, services(*), clients(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

//! Get bookings after date
// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date should be ISOString

export async function getBookingsAfterDate(date: string) {
  const endOfToday = endOfDay(new Date()).toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .gte("startTime", date)
    .lte("startTime", endOfToday);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

//! Get stays after date
// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const endOfToday = endOfDay(new Date()).toISOString();
  const { data, error } = await supabase
    .from("bookings")
    .select("*, clients(fullName)")
    .gte("startTime", date)
    .lte("startTime", endOfToday);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

//! Get stays today

// Adjusted function to get stays activity for a specific date
export async function getStaysActivityByDate(date?: Date) {
  const todayStart = date
    ? new Date(date.setHours(0, 0, 0, 0)).toISOString()
    : getToday();
  const todayEnd = date
    ? new Date(date.setHours(23, 59, 59, 999)).toISOString()
    : getToday({ end: true });

  const { data, error } = await supabase
    .from("bookings")
    .select("*, clients(fullName)")
    .or(
      `and(status.eq.unconfirmed,startTime.gte.${todayStart},startTime.lte.${todayEnd}),and(status.eq.checked-in,endTime.gte.${todayStart},endTime.lte.${todayEnd})`
    )
    .order("created_at");

  if (error) {
    console.error("Supabase error:", error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

//! Update a booking
export async function updateBooking(id: number, obj: any) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

//! Delete a booking
export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

//! Create a booking
export async function createBooking(obj: any) {
  const { data, error } = await supabase.from("bookings").insert(obj);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  return data;
}
