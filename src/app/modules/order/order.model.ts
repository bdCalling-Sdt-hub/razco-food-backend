import { model, Schema } from "mongoose";
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
    totalItem: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ["online", "cash on delivery"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "packing", "processing", "shipping", "shipped"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder, OrderModel>("Order", orderSchema);
