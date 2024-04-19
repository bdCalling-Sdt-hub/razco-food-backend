import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { ICategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryToDB = async (payload: ICategory): Promise<ICategory> => {
  const category = await Category.create(payload);

  if (!category) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to created category!");
  }

  return category;
};

const createSubCategoryToDB = async (payload: any): Promise<ICategory> => {
  const { category_id, ...othersData } = payload;
  const subCategory = await Category.findOneAndUpdate(
    { _id: category_id },
    { $push: { subCategories: othersData } },
    { new: true }
  );
  if (!subCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create category");
  }

  return subCategory;
};

export const CategoryService = {
  createCategoryToDB,
  createSubCategoryToDB,
};
