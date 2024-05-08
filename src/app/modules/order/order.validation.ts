import { z } from "zod";

const createPaymentIntentZodSchema = z.object({
  body: z.object({
    price: z.number({ required_error: "Price is required" }),
  }),
});

export const OrderValidation = { createPaymentIntentZodSchema };
