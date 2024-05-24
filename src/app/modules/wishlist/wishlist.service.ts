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
  let message;
  const productId = await Wishlist.findOne({
    user: user.id,
    product: payload.product,
  });
  if (productId) {
    await Wishlist.findOneAndDelete({
      user: user.id,
      product: payload.product,
    });
    message = "Remove from wishlist";
    isExistProduct.save();
  } else {
    const data = {
      user: user.id,
      product: payload.product,
    };
    await Wishlist.create(data);
    message = "Add to wishlist";
    isExistProduct.save();
  }
  return message;
};

const getProductsFromWishlistDB = async (user: JwtPayload) => {
  const result = await Wishlist.find({ user: user.id }).populate("product");
  return result;
};

export const WishlistService = {
  addToWishlistToDB,
  getProductsFromWishlistDB,
};
