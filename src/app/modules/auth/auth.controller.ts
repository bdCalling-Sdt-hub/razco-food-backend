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

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const email = req.body.email;
  await AuthService.forgetPasswordToDB(email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Please check your email, we send a Otp!",
  });
});

const otpVerify = catchAsync(async (req: Request, res: Response) => {
  const { ...otpData } = req.body;
  const result = await AuthService.otpVerifyToDB(otpData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message:
      "Verification Successful: Please securely store and utilize this code for password reset purposes",
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  console.log(token);
  const { ...passwordData } = req.body;
  await AuthService.resetPasswordToDB(token!, passwordData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Password changed successfully",
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...passwordData } = req.body;
  await AuthService.changePasswordToDB(user, passwordData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Password changed successfully",
  });
});

export const AuthController = {
  loginUser,
  otpVerify,
  changePassword,
  forgetPassword,
  resetPassword,
};
