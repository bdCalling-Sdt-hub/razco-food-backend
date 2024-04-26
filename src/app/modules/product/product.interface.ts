import { Model } from "mongoose";

export type IProduct = {
  productId: string;
  productName: string;
  productImage: string;
  barcode: string;
  price: string | number;
  offer: string;
  discount?: string;
  discountPrice?: string | number;
  category: string;
  subCategory: string;
  expireDate: Date;
  store: number;
  weight: string;
  brand?: string;
  description: string;
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
  subCategory?: string;
};
