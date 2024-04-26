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

const getCategoriesToDB = async (): Promise<ICategory[]> => {
  const result = await Category.find();

  return result;
};

export const CategoryService = {
  createCategoryToDB,
  getCategoriesToDB,
};
