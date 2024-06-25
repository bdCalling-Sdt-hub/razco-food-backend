import { Model, Types } from "mongoose";

export type IOrder = {
  orderId: string;
  user: Types.ObjectId;
  cart: Types.ObjectId;
  products: { product: Types.ObjectId; quantity: number }[];
  totalItem: number;
  price: number;
  deliveryDate: string;
  deliveryFee: number;
  transactionId?: string;
  points: number;
  callForPickup: boolean;
  paymentMethod: "online" | "cashOnDelivery";
  status: "pending" | "packing" | "processing" | "shipping" | "shipped";
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;
