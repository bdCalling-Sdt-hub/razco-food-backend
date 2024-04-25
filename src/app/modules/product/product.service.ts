import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import unlinkFile from "../../../util/unlinkFile";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductToDB = async (payload: IProduct): Promise<IProduct> => {
  const createProduct = await Product.create(payload);
  if (!createProduct) {
    throw new ApiError(StatusCodes.OK, "Failed to created product");
  }
  return createProduct;
};

const getAllProductFromDB = async (): Promise<IProduct[]> => {
  const result = await Product.find();
  return result;
};

const getSingleProductFromDB = async (id: string): Promise<IProduct> => {
  const result = await Product.isProductExist(id);
  return result;
};

const updateProductToDB = async (
  id: string,
  payload: IProduct
): Promise<IProduct | null> => {
  const isExistProduct = await Product.isProductExist(id);
  if (!isExistProduct) {
    throw new ApiError(StatusCodes.OK, "Product doesn't exist!");
  }
  //remove file
  if (payload.productImage) {
    unlinkFile(isExistProduct?.productImage);
  }

  //update product
  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteProductToDB = async (id: string): Promise<IProduct | null> => {
  const isExistProduct = await Product.isProductExist(id);
  if (!isExistProduct) {
    throw new ApiError(StatusCodes.OK, "Product doesn't exist!");
  }

  //delete product image from local files
  unlinkFile(isExistProduct.productImage);

  //delete from db
  const result = await Product.findByIdAndDelete(id);

  return result;
};

//barcode product
const getBarcodeProductFromDB = async (id: string): Promise<IProduct[]> => {
  const result = await Product.find({ barcode: id });
  if (!result) {
    throw new ApiError(StatusCodes.OK, "Product doesn't exist!");
  }

  return result;
};

export const ProductService = {
  createProductToDB,
  getAllProductFromDB,
  deleteProductToDB,
  updateProductToDB,
  getSingleProductFromDB,
  getBarcodeProductFromDB,
};
