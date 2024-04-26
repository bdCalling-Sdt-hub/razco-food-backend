import { JwtPayload } from "jsonwebtoken";
import { IWishlist } from "./wishlist.interface";
import { Wishlist } from "./wishlist.model";

const addToWishlistToDB = async (
  user: JwtPayload,
  payload: Partial<IWishlist>
) => {
  const data = {
    user: user.id,
    product: payload.product,
  };
  const result = await Wishlist.create(data);
  return result;
};

export const WishlistService = {
  addToWishlistToDB,
};
