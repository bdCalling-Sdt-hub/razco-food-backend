import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import { paginationField } from "../../../shared/constant";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { ISubcategory } from "../subcategory/subcategory.interface";
import { ICategory } from "./category.interface";
import { CategoryService } from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryName } = req.body;

  let categoryImage = "";
  if (req.files && "categoryImage" in req.files && req.files.categoryImage[0]) {
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
  const paginationOptions = pick(req.query, paginationField);
  const result = await CategoryService.getAllCategoryToDB(paginationOptions);

  sendResponse<ICategory[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Category retrieved successfully",
    pagination: result.meta,
    data: result.data,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { categoryName } = req.body;

  let categoryImage;
  if (req.files && "categoryImage" in req.files && req.files.categoryImage[0]) {
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

const getAllSubcategories = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CategoryService.getAllSubcategoriesFromDB(id);

  sendResponse<ISubcategory[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Subcategories retrieved successfully",
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
  getAllSubcategories,
};
