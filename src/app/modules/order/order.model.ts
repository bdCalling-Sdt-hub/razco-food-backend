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
      type: String,
      required: true,
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
