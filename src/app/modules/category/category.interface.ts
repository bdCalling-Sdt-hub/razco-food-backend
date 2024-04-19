import { Model } from "mongoose";

type ISubCategory = {
  subCategoryName: string;
  subCategoryImage: string;
};

export type ICategory = {
  categoryName: string;
  categoryImage: string;
  subCategories?: ISubCategory[];
};

export type CategoryModel = Model<ICategory, Record<string, unknown>>;
