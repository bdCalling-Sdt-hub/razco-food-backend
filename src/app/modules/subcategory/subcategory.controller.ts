import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ISubcategory } from "./subcategory.interface";
import { SubcategoryService } from "./subcategory.service";

const createSubcategory = catchAsync(async (req: Request, res: Response) => {
  const subcategoryData = req.body;
  let subcategoryImage = "";
  if (
    req.files &&
    "subcategoryImage" in req.files &&
    req.files.subcategoryImage[0]
  ) {
    subcategoryImage = `/images/${req.files.subcategoryImage[0].filename}`;
  }

  const payload = {
    ...subcategoryData,
    subcategoryImage,
  };

  const result = await SubcategoryService.createSubcategoryToDB(payload);

  sendResponse<ISubcategory>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Subcategory created successfully",
    data: result,
  });
});

const getAllSubcategory = catchAsync(async (req: Request, res: Response) => {
  const result = await SubcategoryService.getAllSubcategoryToDB();

  sendResponse<ISubcategory[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Subcategory retrieved successfully",
    data: result,
  });
});

const updateSubcategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const subcategoryData = req.body;
  let subcategoryImage;
  if (
    req.files &&
    "subcategoryImage" in req.files &&
    req.files.subcategoryImage[0]
  ) {
    subcategoryImage = `/images/${req.files.subcategoryImage[0].filename}`;
  }

  const payload = {
    ...subcategoryData,
    subcategoryImage,
  };

  const result = await SubcategoryService.updateSubcategoryToDB(id, payload);

  sendResponse<ISubcategory>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Subcategory updated successfully",
    data: result,
  });
});

const deleteSubcategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SubcategoryService.deleteSubcategoryToDB(id);

  sendResponse<ISubcategory>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Subcategory deleted successfully",
    data: result,
  });
});

export const SubcategoryController = {
  createSubcategory,
  getAllSubcategory,
  deleteSubcategory,
  updateSubcategory,
};
