import { z } from "zod";

export const createServiceSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "You should have to select a service.",
    })
    .max(50),
  regularPrice: z
    .string()
    .min(1, { message: "Price must be at least 1." })
    .max(200)
    .refine((value) => !isNaN(value as unknown as number), {
      message: "Price must be a number.",
    }),
  discount: z
    .string()
    .min(0, { message: "Discount must be at least 0." })
    .max(100, {
      message: "Capacity must be maximum 2.",
    })
    .refine((value) => !isNaN(value as unknown as number), {
      message: "Discount must be a number.",
    }),
  description: z.string().max(200),
  image: z.string(),
});
