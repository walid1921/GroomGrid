import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "New password must be at least 8 characters." })
      .max(100, {
        message: "New password must be less than or equal to 100 characters.",
      }),
    newPasswordConfirmation: z
      .string()
      .min(8, {
        message: "New password confirmation must be at least 8 characters.",
      })
      .max(100, {
        message:
          "New password confirmation must be less than or equal to 100 characters.",
      }),
  })
  .refine((data) => data.password === data.newPasswordConfirmation, {
    message: "New passwords must match.",
    path: ["newPasswordConfirmation"],
  });
