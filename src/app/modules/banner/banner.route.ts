import express from "express";
import { userType } from "../../../shared/constant";
import auth from "../../middlewares/auth";
import fileHandler from "../../middlewares/fileHandler";
import validateRequest from "../../middlewares/validateRequest";
import { BannerController } from "./banner.controller";
import { BannerValidation } from "./banner.validation";
const router = express();

router.post(
  "/create-banner",
  fileHandler(),
  auth(userType.SUPER_ADMIN, userType.ADMIN),
  //validateRequest(BannerValidation.createBannerZodSchema),
  BannerController.createBanner
);
router.patch(
  "/:id",
  fileHandler(),
  auth(userType.SUPER_ADMIN, userType.ADMIN),
  validateRequest(BannerValidation.updateBannerZodSchema),
  BannerController.updateBanner
);

router.delete(
  "/:id",
  auth(userType.SUPER_ADMIN, userType.ADMIN),
  BannerController.deleteBanner
);
router.get(
  "/",
  auth(userType.SUPER_ADMIN, userType.ADMIN),
  BannerController.getAllBanner
);

export const BannerRoutes = router;
