import { model, Schema } from "mongoose";
import { CategoryModel, ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory, CategoryModel>({
  categoryName: {
    type: String,
    required: true,
  },
  categoryImage: {
    type: String,
    required: true,
  },
});

export const Category = model<ICategory, CategoryModel>(
  "Category",
  categorySchema
);
