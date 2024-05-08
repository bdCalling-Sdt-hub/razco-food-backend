import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiErrors";
import { Product } from "../product/product.model";
import { IWishlist } from "./wishlist.interface";
import { Wishlist } from "./wishlist.model";

const addToWishlistToDB = async (
  user: JwtPayload,
  payload: Partial<IWishlist>
) => {
  const isExistProduct = await Product.findById(payload.product);

  if (!isExistProduct) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Product doesn't exist");
  }

  //wishlist
  let addToWish;
  const productId = await Wishlist.findOne({ product: payload.product });
  if (productId) {
    await Wishlist.findOneAndDelete({ product: payload.product });
    addToWish = false;
    isExistProduct.favorite = false;
    isExistProduct.save();
  } else {
    const data = {
      user: user.id,
      product: payload.product,
    };
    await Wishlist.create(data);
    addToWish = true;
    isExistProduct.favorite = true;
    isExistProduct.save();
  }
  return addToWish;
};

const getProductsFromWishlistDB = async (user: JwtPayload) => {
  const result = await Wishlist.find({ user: user.id });
  return result;
};

export const WishlistService = {
  addToWishlistToDB,
  getProductsFromWishlistDB,
};
