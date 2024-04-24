import express from "express";
import { userType } from "../../../shared/constant";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { CouponController } from "./coupon.controller";
import { CouponValidation } from "./coupon.validation";
const router = express.Router();

router.post(
  "/create-coupon",
  auth(userType.SUPER_ADMIN, userType.ADMIN),
  validateRequest(CouponValidation.createCouponZodSchema),
  CouponController.createCoupon
);

router.patch(
  "/:id",
  auth(userType.SUPER_ADMIN, userType.ADMIN),
  validateRequest(CouponValidation.updateCouponZodSchema),
  CouponController.updateCoupon
);
router.delete(
  "/:id",
  auth(userType.SUPER_ADMIN, userType.ADMIN),
  CouponController.deleteCoupon
);

router.get(
  "/",
  auth(userType.SUPER_ADMIN, userType.ADMIN, userType.USER),
  CouponController.getAllCoupon
);

export const CouponRoutes = router;
