import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useServices from "../services/useServices";
import { formatCurrency } from "../../utils/helpers";
import useAllClients from "../clients/useAllClients";
import Spinner from "@/components/ui/spinner";
import useCreateBooking from "./useCreateBooking";
import { useWorkingTime } from "../workingTime/useWorkingTime";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  clientId: z.string().nonempty("Client is required."),
  serviceId: z.string().nonempty("Service is required."),
  startTime: z.date({
    required_error: "Date and time are required.",
  }),
  hasProduct: z.boolean(),
  isPaid: z.boolean(),
  observations: z.string().optional(),
});

function generateTimeSlots(
  workingTime: any,
  day: string,
  serviceDuration: number
) {
  const workingDay = workingTime?.find(
    (time: any) => time.day.toLowerCase() === day.toLowerCase()
  );

  if (!workingDay || !workingDay.isOpen) {
    return [];
  }

  const { start, end } = workingDay;
  const slots = [];
  const startTime = new Date();
  startTime.setHours(start, 0, 0, 0);
  const endTime = new Date();
  endTime.setHours(end, 0, 0, 0);

  while (startTime < endTime) {
    slots.push(new Date(startTime));
    startTime.setMinutes(startTime.getMinutes() + serviceDuration);
  }

  return slots;
}

function filterAvailableSlots(
  slots: Date[],
  bookedSlots: { start: Date; end: Date }[]
) {
  return slots.filter(
    (slot) =>
      !bookedSlots.some(
        (booked) =>
          slot.getTime() >= booked.start.getTime() &&
          slot.getTime() < booked.end.getTime()
      )
  );
}

export function CreateBookingForm() {
  const { createBooking, isCreating } = useCreateBooking();
  const {
    clients,
    isPending: clientsLoading,
    error: clientsError,
  } = useAllClients();
  const {
    services,
    isPending: servicesLoading,
    error: servicesError,
  } = useServices();
  const {
    workingTime,
    isPending: workingTimeLoading,
    error: workingTimeError,
  } = useWorkingTime();

  const [date, setDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<Date[]>([]);
  const [bookedSlots] = useState([
    {
      start: new Date("2024-07-11T15:00:00"),
      end: new Date("2024-07-11T15:30:00"),
    },
    {
      start: new Date("2024-07-11T17:00:00"),
      end: new Date("2024-07-11T18:00:00"),
    },
  ]);

  const [serviceTime, setServiceTime] = useState(30); // Default service time in minutes

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      clientId: "",
      serviceId: "",
      startTime: undefined,
      hasProduct: false,
      isPaid: false,
      observations: "",
    },
  });

  useEffect(() => {
    if (services?.length && form.getValues("serviceId")) {
      const selectedService = services.find(
        (service) => service.id.toString() === form.getValues("serviceId")
      );
      if (selectedService) {
        setServiceTime(selectedService.serviceTime || 30); // Set service time from selected service
      }
    }
  }, [services, form]);

  useEffect(() => {
    if (date && workingTime) {
      const dayOfWeek = date
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();
      const slots = generateTimeSlots(workingTime, dayOfWeek, serviceTime);
      const available = filterAvailableSlots(slots, bookedSlots);
      setAvailableSlots(available);
    }
  }, [date, serviceTime, bookedSlots, workingTime]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const {
        serviceId,
        clientId,
        startTime,
        hasProduct,
        observations,
        isPaid,
      } = data;

      // Convert local time to UTC
      const utcStartTime = new Date(startTime.toISOString());

      const service = services?.find((s) => s.id === parseInt(serviceId));
      if (!service) {
        throw new Error("Selected service not found.");
      }

      const servicePrice = service.regularPrice || 0;
      const extrasPrice = hasProduct ? 22 : 0;
      const totalPrice = servicePrice + extrasPrice;

      const endTime = new Date(
        utcStartTime.getTime() + service.serviceTime * 60000
      );

      const bookingData = {
        serviceId: parseInt(serviceId),
        clientId: parseInt(clientId),
        startTime: utcStartTime.toISOString(),
        endTime: endTime.toISOString(),
        hasProduct,
        observations: observations || "",
        isPaid,
        status: "unconfirmed",
        servicePrice,
        extrasPrice,
        totalPrice,
      };

      console.log("Booking data:", bookingData);

      await createBooking(bookingData);
      form.reset();
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  if (clientsLoading || servicesLoading || workingTimeLoading)
    return <Spinner />;
  if (clientsError || servicesError || workingTimeError)
    return (
      <p className="text-red-500 flex justify-center items-center my-[4.8rem] h-full mx-auto">
        Error loading data. Please try again later.
      </p>
    );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col justify-center w-[50%]"
      >
        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Client</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue>
                      {clients?.find(
                        (client) => client.id === parseInt(field.value)
                      )?.fullName || clients?.[0]?.fullName}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {clients?.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Choose an existing client.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Service</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    {services?.find(
                      (service) => service.id === parseInt(field.value)
                    )?.name || "Select a service"}
                  </SelectTrigger>
                  <SelectContent>
                    {services?.map((service) => (
                      <SelectItem key={service.id} value={service?.id}>
                        {service?.name} :{" "}
                        <span className="text-muted-foreground text-sm">
                          {formatCurrency(service?.regularPrice)} -{" "}
                          {service?.serviceTime} min
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startTime"
          render={() => (
            <FormItem className="flex flex-col">
              <FormLabel>Pick a date and time</FormLabel>
              <FormControl>
                <ReactDatePicker
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
                   "
                  placeholderText="Select a date and time"
                  selected={date}
                  onChange={(selectedDate) => {
                    setDate(selectedDate);
                    if (selectedDate) {
                      form.setValue("startTime", selectedDate);
                    }
                  }}
                  showTimeSelect
                  dateFormat="Pp"
                  includeTimes={availableSlots}
                  minDate={new Date()} // Prevent selecting past dates
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hasProduct"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Has Product</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value === "true")}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPaid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Is Paid</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value === "true")}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="observations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observations</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Add any observations here..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isCreating}>
          Add
        </Button>
      </form>
    </Form>
  );
}
