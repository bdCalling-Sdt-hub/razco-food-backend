import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import { paginationField } from "../../../shared/constant";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { BannerService } from "./banner.service";

const createBanner = catchAsync(async (req: Request, res: Response) => {
  const bannerData = req.body;
  let bannerImage = "";
  if (req.files && "bannerImage" in req.files && req.files.bannerImage[0]) {
    bannerImage = `/images/${req.files.bannerImage[0].filename}`;
  }
  const data = {
    ...bannerData,
    bannerImage,
  };

  const result = await BannerService.createBannerToDB(data);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Banner crated successfully",
    data: result,
  });
});

const getAllBanner = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = await pick(req.query, paginationField);
  const result = await BannerService.getAllBannerFromDB(paginationOptions);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Banner retrieve successfully",
    pagination: result.meta,
    data: result.data,
  });
});

const updateBanner = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  let bannerImage;
  if (req.files && "bannerImage" in req.files && req.files.bannerImage[0]) {
    bannerImage = `/images/${req.files.bannerImage[0].filename}`;
  }
  const data = {
    ...updateData,
    bannerImage,
  };
  const result = await BannerService.updateBannerToDB(id, data);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Banner updated successfully",
    data: result,
  });
});

const deleteBanner = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BannerService.deleteBannerToDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Banner delete successfully",
    data: result,
  });
});

export const BannerController = {
  createBanner,
  getAllBanner,
  deleteBanner,
  updateBanner,
};
