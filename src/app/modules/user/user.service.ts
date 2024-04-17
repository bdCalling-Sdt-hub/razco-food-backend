import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiErrors";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserToDB = async (payload: IUser) => {
  payload.role = "user";
  const createUser = await User.create(payload);

  if (!createUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create user");
  }

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
