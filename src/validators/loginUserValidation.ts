import { z } from "zod";

export const loginUserSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .max(200, {
      message: "Email must be less than or equal to 200 characters.",
    })
    .email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(100, {
      message: "Password must be less than or equal to 100 characters.",
    })
});
