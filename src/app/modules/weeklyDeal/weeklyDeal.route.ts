import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import fileHandler from "../../middlewares/fileHandler";
import { WeeklyDealController } from "./weeklyDeal.controller";
const router = express();

router.post(
  "/create-weekly-deal",
  fileHandler(),
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
  WeeklyDealController.createWeeklyDeal
);
router.patch(
  "/:id",
  fileHandler(),
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
  WeeklyDealController.updateWeeklyDeal
);
router.delete(
  "/:id",
  auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
  WeeklyDealController.deleteWeeklyDeal
);
router.get(
  "/",
  //auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
  WeeklyDealController.getAllWeeklyDeal
);

export const WeeklyRoutes = router;
