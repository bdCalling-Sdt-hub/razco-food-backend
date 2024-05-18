import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CartService } from "./cart.service";

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...productData } = req.body;
  const result = await CartService.addToCartToDB(user, productData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Successfully product store on cart",
    data: result,
  });
});

const getCartProducts = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await CartService.getCartProducts(user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Cart product retrieve successfully!",
    data: result,
  });
});

const deleteCartProduct = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const id = req.params.id;

  await CartService.deleteCartProductToDB(id, user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product deleted successfully from the cart!",
  });
});

const applyPromoCode = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const promoCode = req.body.promoCode;
  const result = await CartService.applyPromoCodeToDB(user, promoCode);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Coupon applied successfully",
    data: result,
  });
});

export const CartController = {
  addToCart,
  getCartProducts,
  deleteCartProduct,
  applyPromoCode,
};
