import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
const router = express.Router();

router.post(
  "/create-user",
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.post(
  "/create-admin",
  auth(USER_TYPE.SUPER_ADMIN),
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createAdmin
);

router.delete(
  "/delete-admin/:id",
  auth(USER_TYPE.SUPER_ADMIN),
  UserController.deleteAdmin
);

router.post(
  "/verify-email",
  validateRequest(UserValidation.createVerifyEmailZodSchema),
  UserController.verifyEmail
);

export const UserRoutes = router;
