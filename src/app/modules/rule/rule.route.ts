import express from "express";
import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { RuleController } from "./rule.controller";
import { RuleValidation } from "./rule.validation";
const router = express.Router();

//about us
router
  .route("/about")
  .get(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
    RuleController.getAbout
  )
  .post(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
    validateRequest(RuleValidation.createRuleZodSchema),
    RuleController.createAbout
  )
  .patch(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
    validateRequest(RuleValidation.updateRuleZodSchema),
    RuleController.updateAbout
  );

//terms-and-condition
router
  .route("/terms-and-conditions")
  .get(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
    RuleController.getTermsAndConditions
  )
  .post(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
    validateRequest(RuleValidation.createRuleZodSchema),
    RuleController.createTermsAndConditions
  )
  .patch(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
    validateRequest(RuleValidation.updateRuleZodSchema),
    RuleController.updateTermsAndConditions
  );

//privacy policy
router
  .route("/privacy-policy")
  .get(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
    RuleController.getPrivacyPolicy
  )
  .post(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
    validateRequest(RuleValidation.createRuleZodSchema),
    RuleController.createPrivacyPolicy
  )
  .patch(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
    validateRequest(RuleValidation.updateRuleZodSchema),
    RuleController.updatePrivacyPolicy
  );

export const RuleRoutes = router;
