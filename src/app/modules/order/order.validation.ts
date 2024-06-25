import { z } from "zod";
import { orderStatus } from "../../../shared/constant";

const createOrderZodSchema = z.object({
  body: z.object({
    orderId: z.string({ required_error: "Order Id is required" }),
    cart: z.string({ required_error: "Cart Id is required" }),
    products: z
      .array(
        z.object(
          {
            product: z.string({ required_error: "Product is required" }),
            quantity: z.number({ required_error: "Quantity is required" }),
          },
          { required_error: "Products must be array an objects" }
        )
      )
      .nonempty({ message: "Products can't be a empty" }),
    totalItem: z.number({ required_error: "Total item is required" }),
    price: z.number({ required_error: "Price is required" }),
    deliveryDate: z.string({ required_error: "Delivery date is required" }),
    deliveryFee: z.number({ required_error: "Deliver fee is required" }),
    transactionId: z.string().optional(),
    points: z.number({ required_error: "Points is required" }),
    paymentMethod: z.enum(["online", "cashOnDelivery"], {
      required_error: "Payment method select is required",
    }),
    status: z.enum([...orderStatus] as [string, ...string[]]).optional(),
  }),
});

const createPaymentIntentZodSchema = z.object({
  body: z.object({
    price: z.number({ required_error: "Price is required" }),
  }),
});

export const OrderValidation = {
  createPaymentIntentZodSchema,
  createOrderZodSchema,
};
