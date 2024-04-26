import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { WishlistService } from "./wishlist.service";

const addToWishlist = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const productData = req.body;

  const result = await WishlistService.addToWishlistToDB(user, productData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product successfully add on wishlist",
    data: result,
  });
});

export const WishlistController = { addToWishlist };
