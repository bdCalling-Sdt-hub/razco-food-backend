import { Model } from "mongoose";

export type ICategory = {
  categoryName: string;
  categoryImage: string;
  subcategoryCreated?: number;
};

export type CategoryModel = Model<ICategory, Record<string, unknown>>;
