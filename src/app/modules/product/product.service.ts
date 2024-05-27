import { StatusCodes } from "http-status-codes";
import { JwtPayload, Secret } from "jsonwebtoken";
import { SortOrder } from "mongoose";
import config from "../../../config";
import ApiError from "../../../errors/ApiErrors";
import { jwtHelper } from "../../../helpers/jwtHelper";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../types/common";
import { IPaginationOptions } from "../../../types/pagination";
import unlinkFile from "../../../util/unlinkFile";
import { ScanHistory } from "../scanHistory/scanHistory.model";
import { Wishlist } from "../wishlist/wishlist.model";
import { IProduct, IProductFilters } from "./product.interface";
import { Product } from "./product.model";

const createProductToDB = async (payload: IProduct): Promise<IProduct> => {
  if (payload.productImage.length <= 0) {
    throw new ApiError(StatusCodes.OK, "Please must be upload image");
  }
  const createProduct = await Product.create(payload);
  if (!createProduct) {
    throw new ApiError(StatusCodes.OK, "Failed to created product");
  }
  return createProduct;
};

const getAllProductFromDB = async (
  token: string,
  filters: IProductFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IProduct[]>> => {
  const { skip, limit, page, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const { search, minPrice, maxPrice, ...filterData } = filters;
  const anyConditions = [];
  //product search here
  if (search) {
    anyConditions.push({
      $or: ["productName", "category", "brand"].map((field) => ({
        [field]: {
          $regex: search,
          $options: "i",
        },
      })),
    });
  }

  //product filter here
  if (Object.keys(filterData).length) {
    anyConditions.push({
      $and: Object.entries(filterData).map(([filed, value]) => ({
        [filed]: value,
      })),
    });
  }

  //product filter with price range
  if (minPrice && maxPrice) {
    anyConditions.push({
      price: {
        $gte: minPrice,
        $lte: maxPrice,
      },
    });
  }

  //product sort here
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereConditions =
    anyConditions.length > 0 ? { $and: anyConditions } : {};

  let result = await Product.find(whereConditions)
    .populate([{ path: "offer", select: "_id percentage offerName" }])
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  //if user have
  if (token) {
    const verifyUser = jwtHelper.verifyToken(
      token,
      config.jwt.secret as Secret
    );
    const { id, email } = verifyUser;
    const useWishList = await Wishlist.find({ user: id });
    const productIds: any = useWishList.map((item) => item.product.toString());

    // Add favorite property to each product if it matches a product in the wishlist
    result = result.map((product) => {
      const isFavorite = productIds.includes(product._id.toString());
      return { ...product.toObject(), favorite: isFavorite };
    });
  }

  const total = await Product.countDocuments(whereConditions);
  const totalPage = Math.ceil(total / page);
  return {
    meta: {
      page,
      limit,
      totalPage,
      total,
    },
    data: result,
  };
};

const getRelatedProductFromDB = async (
  id: string,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IProduct[]>> => {
  const { skip, limit, page, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);

  //product sort here
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const isExistProduct = await Product.isProductExist(id);

  const result = await Product.find({
    _id: { $ne: id },
    subcategory: isExistProduct.subcategory,
  })
    .populate([{ path: "offer", select: "_id percentage offerName" }])
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments({
    _id: { $ne: id },
    subcategory: isExistProduct.subcategory,
  });
  const totalPage = Math.ceil(total / limit);
  return {
    meta: {
      page,
      limit,
      totalPage,
      total,
    },
    data: result,
  };
};

const getSingleProductFromDB = async (id: string): Promise<IProduct> => {
  const result = await Product.isProductExist(id);
  return result;
};

const updateProductToDB = async (
  id: string,
  payload: any
): Promise<IProduct | null> => {
  const isExistProduct = await Product.isProductExist(id);
  if (!isExistProduct) {
    throw new ApiError(StatusCodes.OK, "Product doesn't exist!");
  }

  //filter file
  const updatedImages = isExistProduct.productImage.filter(
    (image) => !payload.imagesToDelete.includes(image)
  );

  //remove file
  for (let image of payload.imagesToDelete) {
    unlinkFile(image);
  }

  if (payload.productImage.length > 0) {
    updatedImages.push(...payload.productImage);
  }
  const updateData = {
    ...payload,
    productImage: updatedImages,
  };

  //update product
  const result = await Product.findOneAndUpdate({ _id: id }, updateData, {
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
  for (let image of isExistProduct?.productImage) {
    unlinkFile(image);
  }

  //delete from db
  const result = await Product.findByIdAndDelete(id);

  return result;
};

//barcode product
const getBarcodeProductFromDB = async (
  id: string,
  user: JwtPayload
): Promise<IProduct[]> => {
  //save scan history
  const scanHistory = new ScanHistory({ user: user.id, barcode: id });
  await scanHistory.save();

  //find product by id
  const result = await Product.find({ barcode: id });
  if (!result || result.length === 0) {
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
  getRelatedProductFromDB,
};
