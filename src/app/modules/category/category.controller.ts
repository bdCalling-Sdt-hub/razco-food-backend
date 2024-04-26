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

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategoryToDB();

  sendResponse<ICategory[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Category retrieved successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { categoryName } = req.body;

  let categoryImage;
  if (req.files && req.files.categoryImage && req.files.categoryImage[0]) {
    categoryImage = `/images/${req.files.categoryImage[0].filename}`;
  }

  const payload = {
    categoryName,
    categoryImage,
  };

  const result = await CategoryService.updateCategoryToDB(id, payload);

  sendResponse<ICategory>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Category updated successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CategoryService.deleteCategoryToDB(id);

  sendResponse<ICategory>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Category deleted successfully",
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
