import { JwtPayload } from "jsonwebtoken";
import { ICart } from "./cart.interface";
import { Cart } from "./cart.model";

const addToCartToDB = async (user: JwtPayload, payload: Partial<ICart>) => {
  const isExistUser = await Cart.findOne({ user: user.id });

  if (isExistUser) {
    isExistUser.products.push(payload);
    isExistUser.save();
  } else {
    const data = {
      user: user.id,
      products: payload,
    };
    await Cart.create(data);
  }
};

export const CartService = {
  addToCartToDB,
};
