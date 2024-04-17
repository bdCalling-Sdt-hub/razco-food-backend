import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserService.createUserToDB(userData);

  res.json({
    statusCode: StatusCodes.OK,
    success: true,
    message:
      "Account created successfully. Please check your email to verify your account",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserService.loginUserFromDB(userData);
  const { accessToken } = result;
  res.json({
    statusCode: StatusCodes.OK,
    success: true,
    message: "User login successfully",
    accessToken: accessToken,
  });
});

export const UserController = {
  createUser,
  loginUser,
};
