import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  await UserService.createUserToDB(userData);

  sendResponse<null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message:
      "Account created successfully. Please check your email to verify your account",
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  await UserService.createAdminToDB(userData);

  sendResponse<null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin account created successfully",
  });
});
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  await UserService.deleteAdminToDB(id);

  sendResponse<null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin account deleted successfully",
  });
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const { ...verifyData } = req.body;
  await UserService.verifyEmailToDB(verifyData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Email verified successfully",
  });
});

export const UserController = {
  createUser,
  verifyEmail,
  createAdmin,
  deleteAdmin,
};
