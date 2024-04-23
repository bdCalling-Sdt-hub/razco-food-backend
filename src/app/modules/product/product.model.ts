import { model, Schema } from "mongoose";
import { IProduct, ProductModel } from "./product.interface";

const productSchema = new Schema<IProduct, ProductModel>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offer: {
    type: Schema.Types.ObjectId,
    ref: "Offer",
  },
  discount: { type: String },
  sealPrice: {
    type: Number,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  subCategory: {
    type: String,
    required: true,
  },
  expireDate: {
    type: Date,
    required: true,
  },
  store: {
    type: Number,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
});

export const Product = model<IProduct, ProductModel>("Product", productSchema);
