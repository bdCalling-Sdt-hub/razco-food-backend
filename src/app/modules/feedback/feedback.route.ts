import express from "express";
import { userType } from "../../../shared/constant";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { FeedbackController } from "./feedback.controller";
import { FeedbackValidation } from "./feedback.validation";
const router = express.Router();

router
  .route("/")
  .get(
    auth(userType.SUPER_ADMIN, userType.ADMIN),
    FeedbackController.getAllFeedback
  )
  .post(
    auth(userType.SUPER_ADMIN, userType.ADMIN, userType.USER),
    validateRequest(FeedbackValidation.createFeedbackZodSchema),
    FeedbackController.createFeedback
  );

router
  .route("/:id")
  .patch(
    auth(userType.SUPER_ADMIN, userType.ADMIN),
    FeedbackController.replyFeedback
  )
  .delete(
    auth(userType.SUPER_ADMIN, userType.ADMIN),
    FeedbackController.deleteFeedback
  );
export const FeedbackRoutes = router;
