import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { RuleService } from "./rule.service";

const createAbout = catchAsync(async (req: Request, res: Response) => {
  const content = req.body;
  const result = await RuleService.createAboutToDB(content);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "About created successfully",
    data: result,
  });
});

export const RuleController = {
  createAbout,
};
