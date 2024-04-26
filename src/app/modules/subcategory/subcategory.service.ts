import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { ISubcategory } from "./subcategory.interface";
import { Subcategory } from "./subcategory.model";

const createSubcategoryToDB = async (payload: any): Promise<ISubcategory> => {
  const createSubcategory = await Subcategory.create(payload);
  if (!createSubcategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create subcategory");
  }

  return createSubcategory;
};

export const SubcategoryService = {
  createSubcategoryToDB,
};
