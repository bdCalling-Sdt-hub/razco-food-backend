import { z } from "zod";

const createCouponZodSchema = z.object({
  body: z.object({
    couponCode: z.string({ required_error: "Coupon code is required" }),
    couponDiscount: z.number({ required_error: "Coupon code is required" }),
    expireDate: z.string({ required_error: "Coupon expire date is required" }),
    targetPoints: z.number({ required_error: "Target points is required" }),
  }),
});

const updateCouponZodSchema = z.object({
  body: z.object({
    couponCode: z.string().optional(),
    couponDiscount: z.number().optional(),
    expireDate: z.string().optional(),
    targetPoints: z.number().optional(),
  }),
});

const claimCouponZodSchema = z.object({
  body: z.object({
    couponCode: z.string({ required_error: "Coupon code is required" }),
    couponDiscount: z.number({ required_error: "Coupon code is required" }),
    expireDate: z.string({ required_error: "Coupon expire date is required" }),
    points: z.number({ required_error: "Points is required" }),
  }),
});

export const CouponValidation = {
  createCouponZodSchema,
  updateCouponZodSchema,
  claimCouponZodSchema,
};
