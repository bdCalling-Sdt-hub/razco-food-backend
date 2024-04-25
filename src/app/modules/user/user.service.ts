import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import sendMail from "../../../helpers/emailHelper";

import { JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import { userFiledShow } from "../../../shared/constant";
import { accountActivationTemplate } from "../../../shared/emailTemplate";
import generateOTP from "../../../util/generateOtp";
import unlinkFile from "../../../util/unlinkFile";
import { IVerifyEmail } from "../auth/auth.interface";
import { TempUser } from "../tempUser/tempUser.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";

//create user and verify
const createUserToDB = async (payload: IUser): Promise<void> => {
  //set role
  payload.role = "user";

  //generate otp
  const otp = generateOTP();
  payload.oneTimeCode = otp;

  const createUser = await TempUser.create(payload);
  if (!createUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create user");
  }

  //send mail
  const data = {
    otp,
    email: payload.email,
    name: payload.name,
  };
  const mailData = accountActivationTemplate(data);
  sendMail(mailData);

  // Schedule the task to set oneTimeCode to null after 3 minutes
  setTimeout(async () => {
    await TempUser.updateOne(
      { _id: createUser._id },
      { $set: { oneTimeCode: null } }
    );
  }, 3 * 60 * 1000); // 3 minutes in milliseconds

  //delete user
  setTimeout(async () => {
    if (!createUser.verified) {
      await TempUser.findByIdAndDelete(createUser._id);
    }
  }, 10 * 60 * 1000); // 10 minutes in milliseconds
};

const verifyEmailToDB = async (payload: IVerifyEmail): Promise<void> => {
  const { email, code } = payload;
  const isUserExist = await TempUser.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  //check otp here
  if (isUserExist.oneTimeCode !== code) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "You provided wrong otp!");
  }

  //verified true here
  const updateData = {
    verified: true,
    oneTimeCode: null,
  };
  const user = await TempUser.findOneAndUpdate(
    { _id: isUserExist._id },
    updateData,
    {
      new: true,
    }
  ).select(["-_id"]);

  // Remove _id if it's present in the data to be created
  const userForCreation = { ...user!._doc }; // Spread to ensure shallow copy

  // Create a new user to save in User collection
  await User.create(userForCreation);
};

//create admin and delete
const createAdminToDB = async (payload: IUser): Promise<void> => {
  //set role
  payload.role = "admin";
  payload.verified = true;
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );

  const createUser = await User.create(payload);
  if (!createUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create admin");
  }
};

const deleteAdminToDB = async (id: string): Promise<void> => {
  const isExistUser = await User.findById(id);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  //delete admin
  if (isExistUser.role !== "admin") {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Check properly this is not admin!"
    );
  }
  await User.findByIdAndDelete(id);
};

//get profile and update and delete
const getProfileFromDB = async (user: JwtPayload) => {
  const getUser = await User.findOne({ email: user.email }).select(
    userFiledShow
  );
  if (!getUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  return getUser;
};

const updateProfileToDB = async (
  user: JwtPayload,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isUserExist = await User.isUserExist(user.email);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  //unlink from local folder
  if (payload.profileImage) {
    unlinkFile(isUserExist?.profileImage);
  }

  //email and role
  if (payload.email || payload.role || payload.password || payload.status) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Changes to email, role, or password,status are not allowed. Please ensure these fields remain unchanged to proceed."
    );
  }

  const { name, phone, gender, address, profileImage } = payload;
  const updatedData = {
    name,
    phone,
    gender,
    address,
    profileImage,
  };

  //update here
  const result = await User.findOneAndUpdate(
    { _id: isUserExist._id },
    updatedData,
    { new: true }
  ).select(userFiledShow);

  return result;
};

const deleteAccountToDB = async (
  user: JwtPayload,
  payload: { password: string }
) => {
  const { password } = payload;
  const isExistUser = await User.isUserExist(user.email);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  //password check
  const isMatchPassword = await User.isMatchPassword(
    password,
    isExistUser.password
  );
  if (isExistUser.password && !isMatchPassword) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Password is incorrect!");
  }

  //delete local file
  unlinkFile(isExistUser.profileImage);

  //delete to DB
  await User.findByIdAndDelete(user.id);
};

export const UserService = {
  createUserToDB,
  verifyEmailToDB,
  createAdminToDB,
  deleteAdminToDB,
  getProfileFromDB,
  updateProfileToDB,
  deleteAccountToDB,
};
