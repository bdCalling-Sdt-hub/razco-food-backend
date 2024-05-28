import { Model, Types } from "mongoose";

export type IProduct = {
  productId: string;
  productName: string;
  productImage: string[];
  barcode: string;
  price: string | number;
  offer: Types.ObjectId;
  discount?: string;
  discountPrice?: string | number;
  category: string;
  subcategory: string;
  expireDate: string;
  store: number;
  weight: string;
  brand?: string;
  description: string;
  favorite: boolean;
  status: "available" | "unavailable" | "short stock";
};

export type ProductModel = {
  isProductExist(id: string): Promise<IProduct>;
} & Model<IProduct>;

export type IProductFilters = {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  subcategory?: string;
  offer?: string;
};
