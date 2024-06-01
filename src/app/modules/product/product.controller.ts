import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import { paginationField } from "../../../shared/constant";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IProduct } from "./product.interface";
import { ProductService } from "./product.service";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const productData = req.body;

  let productImage = [];
  if (
    req.files &&
    "productImage" in req.files &&
    req.files.productImage.length
  ) {
    for (let image of req.files.productImage) {
      productImage.push(`/images/${image.filename}`);
    }
  }
  const payload = {
    ...productData,
    productImage,
  };

  const result = await ProductService.createProductToDB(payload);

  sendResponse<IProduct>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const tokenWithBearer = req.headers.authorization;
  const token = tokenWithBearer?.split(" ")[1];

  const filters = pick(req.query, [
    "search",
    "minPrice",
    "maxPrice",
    "category",
    "subcategory",
    "offer",
  ]);

  const paginationOptions = pick(req.query, paginationField);
  const result = await ProductService.getAllProductFromDB(
    token,
    filters,
    paginationOptions
  );

  sendResponse<IProduct[] | null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product retrieved successfully",
    pagination: result.meta,
    data: result.data,
  });
});

const getRelatedProduct = catchAsync(async (req: Request, res: Response) => {
  const tokenWithBearer = req.headers.authorization;
  const token = tokenWithBearer?.split(" ")[1];
  const id = req.params.id;
  const paginationOptions = pick(req.query, paginationField);

  const result = await ProductService.getRelatedProductFromDB(
    token,
    id,
    paginationOptions
  );

  sendResponse<IProduct[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product retrieved successfully",
    pagination: result.meta,
    data: result.data,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ProductService.getSingleProductFromDB(id);

  sendResponse<IProduct>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Single product retrieved successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const productData = req.body;
  const imagesToDelete = req.body.imagesToDelete || [];

  let productImage = [];
  if (
    req.files &&
    "productImage" in req.files &&
    req.files.productImage.length
  ) {
    for (let image of req.files.productImage) {
      productImage.push(`/images/${image.filename}`);
    }
  }
  const payload = {
    ...productData,
    productImage,
    imagesToDelete,
  };

  console.log("payload", payload);

  const result = await ProductService.updateProductToDB(id, payload);

  sendResponse<IProduct>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ProductService.deleteProductToDB(id);

  sendResponse<IProduct>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

//barcode product
const getBarcodeProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;
  const result = await ProductService.getBarcodeProductFromDB(id, user);

  sendResponse<IProduct[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Scan product retrieved successfully",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProduct,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  getBarcodeProduct,
  getRelatedProduct,
};
