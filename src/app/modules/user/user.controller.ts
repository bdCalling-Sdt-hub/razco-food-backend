import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import { UserService } from "./user.service";

//create user and verify
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

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const { ...verifyData } = req.body;
  await UserService.verifyEmailToDB(verifyData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Email verified successfully",
  });
});

//create admin and delete
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  await UserService.createAdminToDB(userData);

  sendResponse<null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin account created successfully",
  });
});

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllAdminFromDB();

  sendResponse<IUser[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All Admin data retrieved successfully",
    data: result,
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

//retrieved user and active, deActive action
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsersFromDB();

  sendResponse<IUser[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All users data retrieved successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUserFromDB(id);

  sendResponse<IUser>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Single user data retrieved successfully",
    data: result,
  });
});

const activeDeactiveUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body.status;
  const result = await UserService.activeDeactiveUserToDB(id, data);

  console.log("result", result);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Successfully active user",
    data: result,
  });
});

//get profile, update and delete
const getProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.getProfileFromDB(user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Profile data retrieved successfully!",
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const updateData = req.body;
  let profileImage;
  if (req.files && "profileImage" in req.files && req.files.profileImage[0]) {
    profileImage = `/images/${req.files.profileImage[0].filename}`;
  }
  const data = {
    ...updateData,
    profileImage,
  };
  const result = await UserService.updateProfileToDB(user, data);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Profile data updated successfully!",
    data: result,
  });
});

const deleteAccount = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const data = req.body;
  await UserService.deleteAccountToDB(user, data);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Account deleted successfully!",
  });
});

//my points
const getMyPoints = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.getMyPointsFromDB(user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Points retrieved successfully!",
    data: result,
  });
});

export const UserController = {
  createUser,
  verifyEmail,
  createAdmin,
  deleteAdmin,
  getProfile,
  updateProfile,
  deleteAccount,
  getMyPoints,
  activeDeactiveUser,
  getAllAdmin,
  getAllUsers,
  getSingleUser,
};
