import { StatusCodes } from "http-status-codes";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiErrors";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../types/common";
import { IPaginationOptions } from "../../../types/pagination";
import unlinkFile from "../../../util/unlinkFile";
import { ISubcategory } from "../subcategory/subcategory.interface";
import { Subcategory } from "../subcategory/subcategory.model";
import { ICategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryToDB = async (payload: ICategory): Promise<ICategory> => {
  const category = await Category.create(payload);
  if (!category) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to created category!");
  }

  return category;
};

const getAllCategoryToDB = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICategory[]>> => {
  const { skip, page, limit, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const result = await Category.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Category.countDocuments();
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

const updateCategoryToDB = async (
  id: string,
  payload: Partial<ICategory>
): Promise<ICategory | null> => {
  const isExistCategory = await Category.findById(id);
  if (!isExistCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Category doesn't exist");
  }
  //unlink file
  if (payload.categoryImage) {
    unlinkFile(isExistCategory?.categoryImage);
  }

  //update to DB
  const category = await Category.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return category;
};

const getAllSubcategoriesFromDB = async (
  id: string
): Promise<ISubcategory[]> => {
  const result = await Subcategory.find({ category: id });
  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Category doesn't exist");
  }

  return result;
};

const deleteCategoryToDB = async (id: string): Promise<ICategory | null> => {
  const isExistCategory = await Category.findByIdAndDelete(id);
  if (!isExistCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Category doesn't exist");
  }
  //unlink file
  unlinkFile(isExistCategory?.categoryImage);

  return isExistCategory;
};

export const CategoryService = {
  createCategoryToDB,
  getAllCategoryToDB,
  updateCategoryToDB,
  deleteCategoryToDB,
  getAllSubcategoriesFromDB,
};
