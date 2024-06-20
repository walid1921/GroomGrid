import { z } from "zod";

export const updateUserSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "Full Name is required." })
    .max(100, {
      message: "Full Name must be less than or equal to 100 characters.",
    }),

  email: z
    .string()
    .min(1, { message: "Email is required." })
    .max(200, {
      message: "Email must be less than or equal to 200 characters.",
    })
    .email({ message: "Invalid email address." }),

  avatar: z.any().optional(),
});
