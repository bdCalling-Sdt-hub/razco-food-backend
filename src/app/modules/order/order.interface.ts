import { Model, Types } from "mongoose";

export type IOrder = {
  orderId: string;
  user: Types.ObjectId;
  totalItem: number;
  price: number;
  deliveryDate: string;
  transactionId?: string;
  paymentMethod: "online" | "cashOnDelivery";
  status: "pending" | "packing" | "processing" | "shipping" | "shipped";
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;
