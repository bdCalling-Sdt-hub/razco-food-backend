import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiErrors";
import { IUserCoupon } from "../user/user.interface";
import { User } from "../user/user.model";
import { Product } from "./../product/product.model";
import { Cart } from "./cart.model";

const addToCartToDB = async (user: JwtPayload, payload: any) => {
  const isExistUser = await Cart.findOne({ user: user.id });
  const isExistProduct = await Product.isProductExist(payload.product);
  if (!isExistProduct) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Product doesn't exist!");
  }

  if (isExistUser) {
    const foundProduct = isExistUser!.products.find((item) =>
      item.product.equals(payload.product)
    );
    if (foundProduct) {
      //foundProduct!.quantity = foundProduct?.quantity + payload.quantity;
      foundProduct!.quantity = payload.quantity;
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
  const isUserCartExist = await Cart.findOne({ user: user.id }).populate([
    {
      path: "user",
      select: "_id email name phone address",
    },
    {
      path: "products.product",
      select: "",
    },
  ]);

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

//apply promo code
const applyPromoCodeToDB = async (user: JwtPayload, promoCode: string) => {
  const isExistUser = await User.isUserExist(user.email);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }
  const { coupons } = isExistUser;

  const findCoupon = coupons.find(
    (coupon: IUserCoupon) => coupon.couponCode === promoCode
  );
  if (!findCoupon) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "You provided an invalid coupon code"
    );
  }
  const { couponDiscount, expireDate, isCouponUsed } = findCoupon;
  const couponExpireDate = new Date(expireDate);
  const today = new Date();

  //check coupon validity
  if (today > couponExpireDate) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "The coupon code has expired");
  }
  //check  if the coupon has already been used
  if (isCouponUsed) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "The coupon code has already been used"
    );
  }

  findCoupon.isCouponUsed = true;
  await isExistUser.save();

  return {
    discount: couponDiscount,
  };
};

export const CartService = {
  addToCartToDB,
  getCartProducts,
  deleteCartProductToDB,
  applyPromoCodeToDB,
};
