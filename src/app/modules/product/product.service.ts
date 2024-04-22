import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductToDB = async (payload: IProduct): Promise<IProduct> => {
  const createProduct = await Product.create(payload);
  if (!createProduct) {
    throw new ApiError(StatusCodes.OK, "Failed to created product");
  }
  return createProduct;
};

export const ProductService = {
  createProductToDB,
};
