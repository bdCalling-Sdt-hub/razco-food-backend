import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IFeedback } from "./feedback.interface";
import { Feedback } from "./feedback.model";

//create feedback
const createFeedbackToDB = async (payload: IFeedback): Promise<IFeedback> => {
  const createFeedback = await Feedback.create(payload);
  if (!createFeedback) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to send feedback");
  }
  return createFeedback;
};

// get all feedback
const getAllFeedbackFromDB = async (): Promise<IFeedback[]> => {
  const createFeedback = await Feedback.find();

  return createFeedback;
};

//feedback reply
const replyFeedbackToDB = async (
  id: string,
  payload: { replyMessage: string }
): Promise<void> => {
  const isExistFeedback = await Feedback.findById(id);
  if (!isExistFeedback) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Feedback doesn't exist");
  }
  isExistFeedback.replyMessage = payload.replyMessage;
  isExistFeedback.status = "replied";
  isExistFeedback.save();
};

//delete
const deleteFeedbackToDB = async (id: string): Promise<IFeedback | null> => {
  const result = await Feedback.findByIdAndDelete(id);

  return result;
};

export const FeedbackService = {
  createFeedbackToDB,
  getAllFeedbackFromDB,
  deleteFeedbackToDB,
  replyFeedbackToDB,
};
