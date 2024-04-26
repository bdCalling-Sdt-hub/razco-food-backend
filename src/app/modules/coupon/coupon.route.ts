import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { CouponController } from "./coupon.controller";
import { CouponValidation } from "./coupon.validation";
const router = express.Router();

router.post(
  "/create-coupon",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
  validateRequest(CouponValidation.createCouponZodSchema),
  CouponController.createCoupon
);

router.patch(
  "/:id",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
  validateRequest(CouponValidation.updateCouponZodSchema),
  CouponController.updateCoupon
);

router.delete(
  "/:id",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
  CouponController.deleteCoupon
);

router.get(
  "/",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
  CouponController.getAllCoupon
);

export const CouponRoutes = router;
