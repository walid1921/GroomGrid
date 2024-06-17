import { z } from "zod";

export const createClientSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required." }).max(50, {
    message: "Full name must be less than or equal to 50 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .max(200, {
      message: "Email must be less than or equal to 200 characters.",
    })
    .email({ message: "Invalid email address." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters." })
    .max(15, {
      message: "Phone number must be less than or equal to 15 characters.",
    })
    .regex(/^\+?[0-9]*$/, {
      message: "Phone number must contain only digits and optional leading +.",
    }),
  observations: z
    .string()
    .max(200, {
      message: "Observation must be less than or equal to 200 characters.",
    })
    .optional(),
});
