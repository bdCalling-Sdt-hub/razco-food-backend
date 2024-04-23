import express from "express";
import { userType } from "../../../shared/constant";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { RuleController } from "./rule.controller";
import { RuleValidation } from "./rule.validation";
const router = express.Router();

router.post(
  "/create-about",
  auth(userType.SUPER_ADMIN, userType.ADMIN),
  validateRequest(RuleValidation.createAboutZodSchema),
  RuleController.createAbout
);

export const RuleRoutes = router;
