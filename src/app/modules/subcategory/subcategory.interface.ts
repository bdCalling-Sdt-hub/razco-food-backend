import { Model, Types } from "mongoose";
import { ICategory } from "../category/category.interface";

export type ISubcategory = {
  subcategoryName: string;
  subcategoryImage: string;
  category: Types.ObjectId | ICategory;
};
export type SubcategoryModel = Model<ISubcategory, Record<string, unknown>>;
