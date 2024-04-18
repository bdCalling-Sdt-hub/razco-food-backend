import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUserFromDB(loginData);
  const { accessToken, ...others } = result;

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User login successfully",
    data: accessToken,
  });
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const { ...verifyData } = req.body;
  await AuthService.verifyEmailToDB(verifyData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Email verified successfully",
  });
});

export const AuthController = {
  loginUser,
  verifyEmail,
};
