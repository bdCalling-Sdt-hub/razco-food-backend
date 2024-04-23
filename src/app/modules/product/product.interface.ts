import { Model, Types } from "mongoose";

export type IProduct = {
  name: string;
  image: string;
  id: string;
  price: string | number;
  offer: Types.ObjectId;
  discount?: string;
  sealPrice?: string | number;
  category: Types.ObjectId;
  subCategory: string;
  expireDate: Date;
  store: number;
  weight: string;
  brand?: string;
  description: string;
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;
