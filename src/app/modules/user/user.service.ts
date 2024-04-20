import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import sendMail from "../../../helpers/emailHelper";

import { accountActivationTemplate } from "../../../shared/emailTemplate";
import generateOTP from "../../../util/generateOtp";
import { IVerifyEmail } from "../auth/auth.interface";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserToDB = async (payload: IUser) => {
  //set role
  payload.role = "user";

  //generate otp
  const otp = generateOTP();
  payload.oneTimeCode = otp;

  const createUser = await User.create(payload);
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
    await User.updateOne(
      { _id: createUser._id },
      { $set: { oneTimeCode: null } }
    );
  }, 3 * 60 * 1000); // 3 minutes in milliseconds

  return createUser;
};

const verifyEmailToDB = async (payload: IVerifyEmail): Promise<void> => {
  const { email, code } = payload;
  const isUserExist = await User.isUserExist(email);
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
  await User.findOneAndUpdate({ _id: isUserExist._id }, updateData, {
    new: true,
  });
};

export const UserService = {
  createUserToDB,
  verifyEmailToDB,
};
