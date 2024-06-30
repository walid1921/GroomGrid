import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import { clients } from "./data-clients";
import { services } from "./data-services";
import { bookings } from "./data-bookings";
import { Button } from "@/components/ui/button";
import supabase from "@/api/supabase";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxClientsPerBooking: 10,
//   breakfastPrice: 15,
// };

//! Delete all
async function deleteClients() {
  const { error } = await supabase.from("clients").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteServices() {
  const { error } = await supabase.from("services").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

//! Create all
async function createClients() {
  const { error } = await supabase.from("clients").insert(clients);
  if (error) console.log(error.message);
}

async function createServices() {
  const { error } = await supabase.from("services").insert(services);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a clientId and a serviceId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all clientIds and serviceIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: clientsIds, error: clientsError } = await supabase
    .from("clients")
    .select("id")
    .order("id");

  if (clientsError) {
    console.log(clientsError.message);
    return;
  }

  if (!clientsIds) {
    console.log("Failed to fetch client IDs.");
    return;
  }

  const allClientIds = clientsIds.map((client) => client.id);

  const { data: servicesIds, error: servicesError } = await supabase
    .from("services")
    .select("id")
    .order("id");

  if (servicesError) {
    console.log(servicesError.message);
    return;
  }

  if (!servicesIds) {
    console.log("Failed to fetch service IDs.");
    return;
  }

  const allServiceIds = servicesIds.map((service) => service.id);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of services, as they don't have and ID yet
    const service = services[booking.serviceId - 1];
    const servicePrice = service.regularPrice;
    const extrasPrice = booking.hasProduct ? 22 : 0; // hardcoded product price
    const totalPrice = servicePrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endTime)) &&
      !isToday(new Date(booking.endTime))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.startTime)) ||
      isToday(new Date(booking.startTime))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endTime)) ||
        isToday(new Date(booking.endTime))) &&
      isPast(new Date(booking.startTime)) &&
      !isToday(new Date(booking.startTime))
    )
      status = "checked-in";

    return {
      ...booking,
      servicePrice,
      extrasPrice,
      totalPrice,
      clientId: allClientIds.at(booking.clientId - 1),
      serviceId: allServiceIds.at(booking.serviceId - 1),
      status,
    };
  });

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteClients();
    await deleteServices();

    // Bookings need to be created LAST
    await createClients();
    await createServices();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#313131",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
