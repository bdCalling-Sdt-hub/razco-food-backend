import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ApplicationService } from "./application.service";

const createApplication = catchAsync(async (req: Request, res: Response) => {
  const content = req.body;
  await ApplicationService.createApplicationToDB(content);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message:
      "Your application has been received. We will review it and get back to you shortly.",
  });
});

export const ApplicationController = { createApplication };
