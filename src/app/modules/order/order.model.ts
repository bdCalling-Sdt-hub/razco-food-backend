import { model, Schema } from "mongoose";
import { orderStatus } from "../../../shared/constant";
import { IOrder, OrderModel } from "./order.interface";

const orderSchema = new Schema<IOrder, OrderModel>(
  {
    orderId: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    products: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: {
            type: Number,
            required: true,
            default: 1,
          },
        },
      ],
      required: true,
    },
    totalItem: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    deliveryDate: {
      type: String,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
    },
    points: {
      type: Number,
      required: true,
    },
    callForPickup: {
      type: Boolean,
      default: false,
    },
    paymentMethod: {
      type: String,
      enum: ["online", "cashOnDelivery"],
      required: true,
    },
    status: {
      type: String,
      enum: orderStatus,
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder, OrderModel>("Order", orderSchema);
