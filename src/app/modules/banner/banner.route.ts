import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import fileHandler from "../../middlewares/fileHandler";
import validateRequest from "../../middlewares/validateRequest";
import { BannerController } from "./banner.controller";
import { BannerValidation } from "./banner.validation";
const router = express();

router.post(
  "/create-banner",
  fileHandler(),
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
  //validateRequest(BannerValidation.createBannerZodSchema),
  BannerController.createBanner
);
router.patch(
  "/:id",
  fileHandler(),
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
  validateRequest(BannerValidation.updateBannerZodSchema),
  BannerController.updateBanner
);

router.delete(
  "/:id",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
  BannerController.deleteBanner
);
router.get(
  "/",
  // auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
  BannerController.getAllBanner
);

export const BannerRoutes = router;
