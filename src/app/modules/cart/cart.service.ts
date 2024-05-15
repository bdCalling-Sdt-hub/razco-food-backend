import { JwtPayload } from "jsonwebtoken";
import { Cart } from "./cart.model";

const addToCartToDB = async (user: JwtPayload, payload: any) => {
  const isExistUser = await Cart.findOne({ user: user.id });

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
  const isExistUser = await Cart.findOne({ user: user.id }).populate({
    path: "products.product",
    select: "",
  });

  return isExistUser;
};

export const CartService = {
  addToCartToDB,
  getCartProducts,
};
