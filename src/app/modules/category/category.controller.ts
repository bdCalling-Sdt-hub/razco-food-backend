import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ICategory } from "./category.interface";
import { CategoryService } from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryName } = req.body;

  let categoryImage = "";
  if (req.files && req.files.categoryImage && req.files.categoryImage[0]) {
    categoryImage = `/images/${req.files.categoryImage[0].filename}`;
  }

  const payload = {
    categoryName,
    categoryImage,
  };

  const result = await CategoryService.createCategoryToDB(payload);

  sendResponse<ICategory>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const createSubCategory = catchAsync(async (req: Request, res: Response) => {
  const { category_id, subCategoryName } = req.body;

  let subCategoryImage = "";
  if (
    req.files &&
    req.files.subCategoryImage &&
    req.files.subCategoryImage[0]
  ) {
    subCategoryImage = `/images/${req.files.subCategoryImage[0].filename}`;
  }

  const payload = {
    category_id,
    subCategoryName,
    subCategoryImage,
  };

  const result = await CategoryService.createSubCategoryToDB(payload);

  sendResponse<ICategory>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  createSubCategory,
};
