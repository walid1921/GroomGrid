import { z } from "zod";

export const signupUserSchema = z
  .object({
    fullName: z
      .string()
      .min(1, { message: "Full name is required." })
      .max(200, {
        message: "Full name must be less than or equal to 200 characters.",
      }),
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
      }),
    passwordConfirmation: z
      .string()
      .min(8, {
        message: "Password confirmation must be at least 8 characters.",
      })
      .max(100, {
        message:
          "Password confirmation must be less than or equal to 100 characters.",
      }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords must match.",
    path: ["passwordConfirmation"],
  });
