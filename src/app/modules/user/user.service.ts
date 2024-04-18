import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiErrors";
import sendMail from "../../../helpers/emailHelper";

import { accountActivationTemplate } from "../../../shared/emailTemplate";
import generateOTP from "../../../util/generateOtp";
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

const loginUserFromDB = async (payload: any) => {
  const { email, password } = payload;

  //check user
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  //password match
  const isMatchPass = await bcrypt.compare(password, isUserExist.password);
  if (!isMatchPass) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Password is incorrect!");
  }

  //access token
  const accessToken = jwt.sign(
    { role: isUserExist.role, email: isUserExist.email },
    config.jwt.secret as Secret,
    {
      expiresIn: config.jwt.expire_in,
    }
  );

  return { accessToken };
};

export const UserService = {
  createUserToDB,
  loginUserFromDB,
};
