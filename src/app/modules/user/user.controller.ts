import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserService.createUserToDB(userData);

  sendResponse<IUser>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message:
      "Account created successfully. Please check your email to verify your account",
    data: result,
  });
});

export const UserController = {
  createUser,
};
