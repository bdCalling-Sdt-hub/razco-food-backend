import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CouponService } from "./coupon.service";

const createCoupon = catchAsync(async (req: Request, res: Response) => {
  const { ...couponData } = req.body;
  const result = await CouponService.createCouponToDB(couponData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Coupon code crated successfully",
    data: result,
  });
});

const getAllCoupon = catchAsync(async (req: Request, res: Response) => {
  const result = await CouponService.getAllCouponFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Coupon code retrieve successfully",
    data: result,
  });
});

const updateCoupon = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updateData } = req.body;
  const result = await CouponService.updateCouponToDB(id, updateData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Coupon code updated successfully",
    data: result,
  });
});

const deleteCoupon = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CouponService.deleteCouponToDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Coupon code delete successfully",
    data: result,
  });
});

export const CouponController = {
  createCoupon,
  getAllCoupon,
  deleteCoupon,
  updateCoupon,
};
