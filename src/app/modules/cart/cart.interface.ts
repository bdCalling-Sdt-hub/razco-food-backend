import { Model, Types } from "mongoose";

export type ICart = {
  user: Types.ObjectId;
  products: { product: Types.ObjectId; quantity: number }[];
};

export type CartModel = {
  isUserExistOnCart(id: string): Promise<ICart>;
} & Model<ICart>;
