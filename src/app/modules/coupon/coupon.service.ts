import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiErrors";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../types/common";
import { IPaginationOptions } from "../../../types/pagination";
import { IUserCoupon } from "../user/user.interface";
import { User } from "../user/user.model";
import { ICoupon } from "./coupon.interface";
import { Coupon } from "./coupon.model";

const createCouponToDB = async (payload: ICoupon): Promise<ICoupon> => {
  const createCoupon = await Coupon.create(payload);

  if (!createCoupon) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to created coupon");
  }

  return createCoupon;
};

const getAllCouponFromDB = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICoupon[]>> => {
  const { skip, page, limit, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const result = await Coupon.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Coupon.countDocuments();
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      totalPage,
      total,
    },
    data: result,
  };
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

//claim coupon code
const claimCouponCodeFromDB = async (
  user: JwtPayload,
  payload: IUserCoupon
) => {
  const isExistUser = await User.findOne({ _id: user.id });
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  // Check if user has enough available points
  if (isExistUser.points!.available < payload.points) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Not enough points available to claim the coupon!"
    );
  }

  isExistUser.points!.available -= payload.points;
  isExistUser.points!.used += payload.points;
  isExistUser?.coupons.push(payload);

  //save the updated user document
  await isExistUser?.save();

  return isExistUser;
};

export const CouponService = {
  createCouponToDB,
  deleteCouponToDB,
  updateCouponToDB,
  getAllCouponFromDB,
  claimCouponCodeFromDB,
};
