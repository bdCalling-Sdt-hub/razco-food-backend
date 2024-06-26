import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import { paginationField } from "../../../shared/constant";
import pick from "../../../shared/pick";
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
const createSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  await UserService.createSuperAdminToDB(userData);

  sendResponse<null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Super Admin account created successfully",
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
  const paginationOptions = pick(req.query, paginationField);
  const result = await UserService.getAllAdminFromDB(paginationOptions);

  sendResponse<IUser[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All Admin data retrieved successfully",
    pagination: result.meta,
    data: result.data,
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
  const paginationOptions = pick(req.query, paginationField);
  const filters = pick(req.query, ["search"]);
  const result = await UserService.getAllUsersFromDB(
    filters,
    paginationOptions
  );

  sendResponse<IUser[] | null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All users data retrieved successfully",
    pagination: result.meta,
    data: result.data,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUserFromDB(id);

  sendResponse<IUser | null>(res, {
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

//my points and my claim coupon
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

const getMyCoupons = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.getMyCouponsFromDB(user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Coupons retrieved successfully!",
    data: result,
  });
});

//edit address
const editAddress = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...editAddressData } = req.body;
  const result = await UserService.editAddressToDB(user, editAddressData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Address updated successfully!",
    data: result,
  });
});

//resend otp
const resendOtp = catchAsync(async (req: Request, res: Response) => {
  const email = req.body.email;
  const result = await UserService.resendOtpToDB(email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Address updated successfully!",
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
  editAddress,
  resendOtp,
  getMyCoupons,
  createSuperAdmin,
};
