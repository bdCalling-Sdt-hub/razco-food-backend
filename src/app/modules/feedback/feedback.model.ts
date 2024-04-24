import { model, Schema } from "mongoose";
import { FeedbackModel, IFeedback } from "./feedback.interface";

const feedbackSchema = new Schema<IFeedback, FeedbackModel>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "replied"],
      default: "pending",
    },
    replyMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Feedback = model<IFeedback, FeedbackModel>(
  "Feedback",
  feedbackSchema
);
