import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiErrors";
import { Cart } from "./cart.model";

const addToCartToDB = async (user: JwtPayload, payload: any) => {
  const isExistUser = await Cart.findOne({ user: user.id });

  console.log(user);
  console.log(isExistUser);

  if (isExistUser) {
    const foundProduct = isExistUser!.products.find((item) =>
      item.product.equals(payload.product)
    );
    if (foundProduct) {
      foundProduct!.quantity = foundProduct?.quantity + payload.quantity;
      await isExistUser.save();
    } else {
      isExistUser.products.push(payload);
      await isExistUser.save();
    }
  }

  if (!isExistUser) {
    const data = {
      user: user.id,
      products: payload,
    };
    await Cart.create(data);
  }
};

const getCartProducts = async (user: JwtPayload) => {
  const isUserCartExist = await Cart.findOne({ user: user.id }).populate({
    path: "products.product",
    select: "",
  });

  return isUserCartExist;
};

const deleteCartProductToDB = async (id: string, user: JwtPayload) => {
  //checking product by user
  const isUserCartExist = await Cart.findOne({ user: user.id });
  if (!isUserCartExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Product doesn't exist!");
  }

  //checking product by product id
  const isProductExist = await Cart.findOne({ "products.product": id });
  if (!isProductExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Product doesn't exist!");
  }

  //pull from the list(delete cart product)
  await Cart.updateOne(
    { _id: isUserCartExist._id },
    { $pull: { products: { product: id } } }
  );
};

export const CartService = {
  addToCartToDB,
  getCartProducts,
  deleteCartProductToDB,
};
