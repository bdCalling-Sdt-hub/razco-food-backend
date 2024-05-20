import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import { paginationField } from "../../../shared/constant";
import pick from "../../../shared/pick";
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
  const paginationOptions = pick(req.query, paginationField);
  const result = await SubcategoryService.getAllSubcategoryToDB(
    paginationOptions
  );

  sendResponse<ISubcategory[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Subcategory retrieved successfully",
    pagination: result.meta,
    data: result.data,
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

const makePopularSubcategory = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    await SubcategoryService.makePopularSubcategoryToDB(id);

    sendResponse<ISubcategory>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "The popularity of this subcategory has increased.",
    });
  }
);

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
  makePopularSubcategory,
};
