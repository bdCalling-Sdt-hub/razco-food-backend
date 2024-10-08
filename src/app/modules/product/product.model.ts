import { model, Schema } from "mongoose";
import { IProduct, ProductModel } from "./product.interface";

const productSchema = new Schema<IProduct, ProductModel>(
  {
    productName: {
      type: String,
      required: true,
    },
    productImage: {
      type: [String],
      required: true,
    },
    barcode: {
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
    discountPrice: {
      type: Number,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    expireDate: {
      type: String,
    },
    store: {
      type: Number,
    },
    weight: {
      type: String,
    },
    brand: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      required: true,
      enum: ["available", "unavailable", "short stock"],
      default: "available",
    },
  },
  { timestamps: true }
);

//isExist product
productSchema.statics.isProductExist = async function (
  id: string
): Promise<IProduct | null> {
  return await Product.findById(id);
};

export const Product = model<IProduct, ProductModel>("Product", productSchema);
