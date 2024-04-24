import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { FeedbackService } from "./feedback.service";

const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const { ...feedbackData } = req.body;
  const result = await FeedbackService.createFeedbackToDB(feedbackData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Feedback send successfully",
    data: result,
  });
});

const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackService.getAllFeedbackFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All Feedback retrieved successfully",
    data: result,
  });
});

const replyFeedback = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const replyMessage = req.body;
  const result = await FeedbackService.replyFeedbackToDB(id, replyMessage);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Reply message send successfully",
    data: result,
  });
});

const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FeedbackService.deleteFeedbackToDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Feedback deleted successfully",
    data: result,
  });
});

export const FeedbackController = {
  createFeedback,
  getAllFeedback,
  deleteFeedback,
  replyFeedback,
};
