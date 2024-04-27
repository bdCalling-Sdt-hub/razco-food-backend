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
    message: "Add to cart",
    data: result,
  });
});

export const CartController = {
  addToCart,
};
