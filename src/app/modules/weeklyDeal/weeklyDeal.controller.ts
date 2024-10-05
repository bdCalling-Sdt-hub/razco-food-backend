import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import { paginationField } from "../../../shared/constant";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IWeeklyDeal } from "./weeklyDeal.interface";
import { WeeklyDealService } from "./weeklyDeal.service";

const createWeeklyDeal = catchAsync(async (req: Request, res: Response) => {
  let image = "";
  if (req.files && "image" in req.files && req.files.image[0]) {
    image = `/images/${req.files.image[0].filename}`;
  }

  const data = {
    image,
  };

  const result = await WeeklyDealService.createWeeklyDealToDB(data);

  sendResponse<IWeeklyDeal>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Weekly deal created successfully",
    data: result,
  });
});

const getAllWeeklyDeal = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationField);
  const result = await WeeklyDealService.getAllWeeklyDealFromDB(
    paginationOptions
  );

  sendResponse<IWeeklyDeal[] | null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Weekly deal retrieved successfully",
    pagination: result.meta,
    data: result.data,
  });
});

const updateWeeklyDeal = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  let image;
  if (req.files && "image" in req.files && req.files.image[0]) {
    image = `/images/${req.files.image[0].filename}`;
  }

  const data = {
    image,
  };

  const result = await WeeklyDealService.updateWeeklyDealFromDB(id, data);

  sendResponse<IWeeklyDeal | null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "WeeklyDeal updated successfully",
    data: result,
  });
});

const deleteWeeklyDeal = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  await WeeklyDealService.deleteWeeklyDealFromDB(id);

  sendResponse<IWeeklyDeal>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "WeeklyDeal deleted successfully",
  });
});
export const WeeklyDealController = {
  createWeeklyDeal,
  getAllWeeklyDeal,
  deleteWeeklyDeal,
  updateWeeklyDeal,
};
