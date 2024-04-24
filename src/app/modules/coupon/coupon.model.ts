import { model, Schema } from "mongoose";
import { CouponModel, ICoupon } from "./coupon.interface";

const couponSchema = new Schema<ICoupon, CouponModel>(
  {
    couponCode: {
      type: String,
      required: true,
      trim: true,
    },
    couponDiscount: {
      type: Number,
      required: true,
      trim: true,
    },
    expireDate: {
      type: String,
      required: true,
    },
    targetPoints: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Coupon = model<ICoupon, CouponModel>("Coupon", couponSchema);
