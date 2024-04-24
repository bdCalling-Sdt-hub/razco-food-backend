import { Model } from "mongoose";

export type IFeedback = {
  name: string;
  description: string;
  status?: "pending" | "replied";
  replyMessage?: string;
};

export type FeedbackModel = Model<IFeedback, Record<string, unknown>>;
