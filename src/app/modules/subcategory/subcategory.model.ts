import { model, Schema } from "mongoose";
import { ISubcategory, SubcategoryModel } from "./subcategory.interface";

const subcategorySchema = new Schema<ISubcategory, SubcategoryModel>(
  {
    subcategoryName: {
      type: String,
      required: true,
      unique: true,
    },
    subcategoryImage: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

export const Subcategory = model<ISubcategory, SubcategoryModel>(
  "Subcategory",
  subcategorySchema
);
