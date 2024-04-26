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
    req.files.subcategoryImage &&
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

export const SubcategoryController = {
  createSubcategory,
};
