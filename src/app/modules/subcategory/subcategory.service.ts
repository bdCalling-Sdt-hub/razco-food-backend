import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import unlinkFile from "../../../util/unlinkFile";
import { Category } from "./../category/category.model";
import { ISubcategory } from "./subcategory.interface";
import { Subcategory } from "./subcategory.model";

const createSubcategoryToDB = async (payload: any): Promise<ISubcategory> => {
  console.log(payload);
  const isExistCategory = await Category.findById(payload.category);
  if (!isExistCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Category doesn't exist!");
  }
  //save subcategory created by category
  isExistCategory.subcategoryCreated = isExistCategory.subcategoryCreated! + 1;
  isExistCategory.save();

  const createSubcategory = await Subcategory.create(payload);
  if (!createSubcategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create subcategory");
  }

  return createSubcategory;
};

const getAllSubcategoryToDB = async (): Promise<ISubcategory[]> => {
  const result = await Subcategory.find();
  return result;
};

const updateSubcategoryToDB = async (
  id: string,
  payload: Partial<ISubcategory>
): Promise<ISubcategory | null> => {
  const isExistCategory = await Subcategory.findById(id);
  if (!isExistCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Subcategory doesn't exist");
  }
  //unlink file
  if (payload.subcategoryImage) {
    unlinkFile(isExistCategory?.subcategoryImage);
  }

  //update to DB
  const category = await Subcategory.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return category;
};

const deleteSubcategoryToDB = async (
  id: string
): Promise<ISubcategory | null> => {
  const isExistCategory = await Subcategory.findByIdAndDelete(id);
  if (!isExistCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Subcategory doesn't exist");
  }
  //unlink file
  unlinkFile(isExistCategory?.subcategoryImage);

  return isExistCategory;
};

//make popular
const makePopularSubcategoryToDB = async (id: string) => {
  const isExistCategory = await Subcategory.findById(id);
  if (!isExistCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Subcategory doesn't exist");
  }

  isExistCategory.clickedCount = isExistCategory.clickedCount + 1;
  isExistCategory.save();
};

export const SubcategoryService = {
  createSubcategoryToDB,
  deleteSubcategoryToDB,
  getAllSubcategoryToDB,
  updateSubcategoryToDB,
  makePopularSubcategoryToDB,
};
