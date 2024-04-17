import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
const router = express.Router();

router.post(
  "/sign-up",
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.post(
  "/login",
  validateRequest(UserValidation.loginUserZodSchema),
  UserController.loginUser
);

export const UserRoutes = router;
