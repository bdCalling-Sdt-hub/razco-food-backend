import { StatusCodes } from "http-status-codes";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiErrors";
import { jwtHelper } from "../../../helpers/jwtHelper";
import { User } from "../user/user.model";
import { IAuth, IVerifyEmail } from "./auth.interface";

const loginUserFromDB = async (payload: IAuth) => {
  const { email, password } = payload;
  const isUserExist = await User.isUserExist(email!);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  //password check
  if (
    isUserExist.password &&
    !(await User.isMatchPassword(password!, isUserExist.password))
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Password is incorrect");
  }

  //create access token
  const accessToken = jwtHelper.createToken(
    { _id: isUserExist._id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );

  return { accessToken };
};

const verifyEmailToDB = async (payload: IVerifyEmail) => {
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
  isUserExist.verified = true;
  isUserExist.oneTimeCode = null;
  await isUserExist.save();
};

export const AuthService = { loginUserFromDB, verifyEmailToDB };
