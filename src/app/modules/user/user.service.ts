import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import sendMail from "../../../helpers/emailHelper";

import config from "../../../config";
import { accountActivationTemplate } from "../../../shared/emailTemplate";
import generateOTP from "../../../util/generateOtp";
import { IVerifyEmail } from "../auth/auth.interface";
import { TempUser } from "../tempUser/tempUser.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";

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

export const UserService = {
  createUserToDB,
  verifyEmailToDB,
  createAdminToDB,
  deleteAdminToDB,
};
