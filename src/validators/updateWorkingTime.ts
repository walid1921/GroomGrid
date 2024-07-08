import { z } from "zod";

export const updateWorkingTimeSchema = z.object({
  day: z
    .string()
    .min(3, { message: "Day must be at least 3 characters long." })
    .max(9, { message: "Day must be at most 9 characters long." })
    .refine(
      (value) => ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].includes(value.toLowerCase()),
      { message: "Day must be a valid day of the week." }
    ),
  isOpen: z.boolean(),
  start: z
    .number()
    .int({ message: "Start time must be an integer." })
    .min(0, { message: "Start time must be at least 0." })
    .max(23, { message: "Start time must be at most 23." }),
  end: z
    .number()
    .int({ message: "End time must be an integer." })
    .min(0, { message: "End time must be at least 0." })
    .max(23, { message: "End time must be at most 23." }),
}).refine((data) => data.end > data.start, {
  message: "End time must be after start time.",
  path: ["end"], // specify the path to apply the error message to
});
