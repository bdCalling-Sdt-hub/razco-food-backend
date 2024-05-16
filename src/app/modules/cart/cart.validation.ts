import { z } from "zod";

const createCartZodSchema = z.object({
  body: z.object({
    product: z.string({ required_error: "Product is required" }),
    quantity: z
      .number({
        required_error: "Quantity is required",
      })
      .refine((quantity) => quantity >= 1, {
        message: "Quantity must be at least 1",
      }),
  }),
});

export const CartValidation = {
  createCartZodSchema,
};
