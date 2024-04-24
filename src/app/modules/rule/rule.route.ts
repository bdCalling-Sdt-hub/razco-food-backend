import express from "express";
import { userType } from "../../../shared/constant";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { RuleController } from "./rule.controller";
import { RuleValidation } from "./rule.validation";
const router = express.Router();

//about us
router
  .route("/about")
  .get(
    auth(userType.SUPER_ADMIN, userType.ADMIN, userType.USER),
    RuleController.getAbout
  )
  .post(
    auth(userType.SUPER_ADMIN, userType.ADMIN),
    validateRequest(RuleValidation.createRuleZodSchema),
    RuleController.createAbout
  )
  .patch(
    auth(userType.SUPER_ADMIN, userType.ADMIN),
    validateRequest(RuleValidation.updateRuleZodSchema),
    RuleController.updateAbout
  );

//terms-and-condition
router
  .route("/terms-and-conditions")
  .get(
    auth(userType.SUPER_ADMIN, userType.ADMIN, userType.USER),
    RuleController.getTermsAndConditions
  )
  .post(
    auth(userType.SUPER_ADMIN, userType.ADMIN),
    validateRequest(RuleValidation.createRuleZodSchema),
    RuleController.createTermsAndConditions
  )
  .patch(
    auth(userType.SUPER_ADMIN, userType.ADMIN),
    validateRequest(RuleValidation.updateRuleZodSchema),
    RuleController.updateTermsAndConditions
  );

//privacy policy
router
  .route("/privacy-policy")
  .get(
    auth(userType.SUPER_ADMIN, userType.ADMIN, userType.USER),
    RuleController.getPrivacyPolicy
  )
  .post(
    auth(userType.SUPER_ADMIN, userType.ADMIN),
    validateRequest(RuleValidation.createRuleZodSchema),
    RuleController.createPrivacyPolicy
  )
  .patch(
    auth(userType.SUPER_ADMIN, userType.ADMIN),
    validateRequest(RuleValidation.updateRuleZodSchema),
    RuleController.updatePrivacyPolicy
  );

export const RuleRoutes = router;
