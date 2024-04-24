import { Model } from "mongoose";

export type ICoupon = {
  couponCode: string;
  couponDiscount: number;
  expireDate: string;
  targetPoints: number;
};

export type CouponModel = Model<ICoupon, Record<string, unknown>>;
