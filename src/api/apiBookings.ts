import { PAGE_SIZE } from "@/utils/constants";
import supabase from "./supabase";
import { getToday } from "@/utils/helpers";

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
      "id, created_at, startTime, endTime, numClients, status, totalPrice, services(name), clients(fullName, email, phoneNumber)",
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

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date should be ISOString

export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date

export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, clients(fullName)")
    .gte("startTime", date)
    .lte("startTime", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const todayStart = getToday(); // Start of today
  const todayEnd = getToday({ end: true }); // End of today

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
