import { model, Schema } from "mongoose";
import { IWishlist, WishlistModel } from "./wishlist.interface";

const wishlistSchema = new Schema<IWishlist, WishlistModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

export const Wishlist = model<IWishlist, WishlistModel>(
  "Wishlist",
  wishlistSchema
);
