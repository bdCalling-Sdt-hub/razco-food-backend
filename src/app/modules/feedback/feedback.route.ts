import express from "express";

import { USER_TYPE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { FeedbackController } from "./feedback.controller";
import { FeedbackValidation } from "./feedback.validation";
const router = express.Router();

router
  .route("/")
  .get(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
    FeedbackController.getAllFeedback
  )
  .post(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN, USER_TYPE.USER),
    validateRequest(FeedbackValidation.createFeedbackZodSchema),
    FeedbackController.createFeedback
  );

router
  .route("/:id")
  .patch(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
    FeedbackController.replyFeedback
  )
  .delete(
    auth(USER_TYPE.SUPER_ADMIN, USER_TYPE.ADMIN),
    FeedbackController.deleteFeedback
  );
export const FeedbackRoutes = router;
