import { Model } from "mongoose";

export type ICategory = {
  categoryName: string;
  categoryImage: string;
};

export type CategoryModel = Model<ICategory, Record<string, unknown>>;
