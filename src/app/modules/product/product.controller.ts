import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IProduct } from "./product.interface";
import { ProductService } from "./product.service";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const productData = req.body;
  let image;
  if (req.files && req.files.image && req.files.image[0]) {
    image = `/image/${req.files.image[0].filename}`;
  }
  const payload = {
    ...productData,
    image,
  };
  const result = await ProductService.createProductToDB(payload);

  sendResponse<IProduct>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

export const ProductController = {
  createProduct,
};
