import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { ICoupon } from "./coupon.interface";
import { Coupon } from "./coupon.model";

const createCouponToDB = async (payload: ICoupon): Promise<ICoupon> => {
  const createCoupon = await Coupon.create(payload);

  if (!createCoupon) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to created coupon");
  }

  return createCoupon;
};

const getAllCouponFromDB = async (): Promise<ICoupon[]> => {
  const result = await Coupon.find();
  return result;
};

const updateCouponToDB = async (
  id: string,
  payload: ICoupon
): Promise<ICoupon | null> => {
  const isExistCoupon = await Coupon.findById(id);
  if (!isExistCoupon) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Coupon doesn't exits!");
  }

  const updateCoupon = await Coupon.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updateCoupon;
};

const deleteCouponToDB = async (id: string): Promise<void> => {
  await Coupon.findByIdAndDelete(id);
};

export const CouponService = {
  createCouponToDB,
  deleteCouponToDB,
  updateCouponToDB,
  getAllCouponFromDB,
};
