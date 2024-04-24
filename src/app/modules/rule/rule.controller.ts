import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { RuleService } from "./rule.service";

//about us
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

const getAbout = catchAsync(async (req: Request, res: Response) => {
  const result = await RuleService.getAboutFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "About retrieved successfully",
    data: result,
  });
});

const updateAbout = catchAsync(async (req: Request, res: Response) => {
  const content = req.body;
  const result = await RuleService.updateAboutToDB(content);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "About updated successfully",
    data: result,
  });
});

//terms-and-conditions
const createTermsAndConditions = catchAsync(
  async (req: Request, res: Response) => {
    const content = req.body;
    const result = await RuleService.createTermsAndConditionsToDB(content);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Terms and conditions created successfully",
      data: result,
    });
  }
);

const getTermsAndConditions = catchAsync(
  async (req: Request, res: Response) => {
    const result = await RuleService.getTermsAndConditionsFromDB();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Terms and conditions retrieved successfully",
      data: result,
    });
  }
);

const updateTermsAndConditions = catchAsync(
  async (req: Request, res: Response) => {
    const content = req.body;
    const result = await RuleService.updateTermsAndConditionsFromDB(content);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Terms and conditions updated successfully",
      data: result,
    });
  }
);

//privacy-policy
const createPrivacyPolicy = catchAsync(async (req: Request, res: Response) => {
  const content = req.body;
  const result = await RuleService.createPrivacyPolicyToDB(content);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Privacy policy created successfully",
    data: result,
  });
});

const getPrivacyPolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await RuleService.getPrivacyPolicyFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Privacy policy retrieved successfully",
    data: result,
  });
});

const updatePrivacyPolicy = catchAsync(async (req: Request, res: Response) => {
  const content = req.body;
  const result = await RuleService.updatePrivacyPolicyToDB(content);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Privacy policy updated successfully",
    data: result,
  });
});

export const RuleController = {
  createAbout,
  getAbout,
  updateAbout,
  createTermsAndConditions,
  getTermsAndConditions,
  updateTermsAndConditions,
  createPrivacyPolicy,
  getPrivacyPolicy,
  updatePrivacyPolicy,
};
