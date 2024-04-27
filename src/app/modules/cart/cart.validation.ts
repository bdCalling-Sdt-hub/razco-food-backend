import { z } from "zod";

const createCartZodSchema = z.object({
  body: z.object({
    user: z.string({ required_error: "User is required!" }),
    product: z.string({ required_error: "Product is required" }),
    quantity: z.number({ required_error: "quantity is required" }),
  }),
});

export const CartValidation = {
  createCartZodSchema,
};
