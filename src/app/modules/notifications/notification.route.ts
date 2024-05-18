import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { NotificationController } from "./notification.controller";
const router = express.Router();

router.patch(
  "/read",
  auth(USER_TYPE.USER, USER_TYPE.ADMIN, USER_TYPE.SUPER_ADMIN),
  NotificationController.readNotifications
);

router.get(
  "/",
  auth(USER_TYPE.USER, USER_TYPE.ADMIN, USER_TYPE.SUPER_ADMIN),
  NotificationController.getNotifications
);

export const NotificationRoutes = router;
