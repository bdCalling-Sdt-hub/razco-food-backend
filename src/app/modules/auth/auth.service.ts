import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiErrors";
import sendMail from "../../../helpers/emailHelper";
import { jwtHelper } from "../../../helpers/jwtHelper";
import { forgetPasswordTemplate } from "../../../shared/emailTemplate";
import cryptoHexToken from "../../../util/cryptoToken";
import generateOTP from "../../../util/generateOtp";
import { Token } from "../token/token.model";
import { User } from "../user/user.model";
import { IAuth, IChangePassword, IVerifyEmail } from "./auth.interface";

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
    { id: isUserExist._id, email: isUserExist.email, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );

  return { accessToken };
};

const changePasswordToDB = async (
  user: JwtPayload,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  const isUserExist = await User.isUserExist(user.email);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist");
  }

  //check password
  const isMatchPassword = await User.isMatchPassword(
    oldPassword,
    isUserExist.password
  );
  if (isUserExist.password && !isMatchPassword) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Password is incorrect");
  }

  //hash password
  const hashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const updateData = {
    password: hashPassword,
    passwordChangeAt: new Date(),
  };

  //update to db
  await User.findOneAndUpdate({ _id: user.id }, updateData, { new: true });
};

const forgetPasswordToDB = async (email: string): Promise<void> => {
  //check user
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist");
  }

  //generate otp
  const otp = generateOTP();

  //save otp to db
  await User.findOneAndUpdate(
    { _id: isUserExist._id },
    { oneTimeCode: otp },
    { new: true }
  );

  //send email
  const data = {
    email,
    otp,
  };
  const mailData = forgetPasswordTemplate(data);
  sendMail(mailData);

  //after 3minute null this code
  setTimeout(async () => {
    await User.updateOne(
      { _id: isUserExist._id },
      { $set: { oneTimeCode: null } }
    );
  }, 3 * 60 * 1000); // 3minute
};

const otpVerifyToDB = async (payload: IVerifyEmail) => {
  const { email, code } = payload;
  //check user
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist");
  }
  //check otp
  if (isUserExist.oneTimeCode !== code) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "You provided wrong otp!");
  }

  const token = cryptoHexToken();
  const createToken = await Token.create({
    token: token,
    user: isUserExist._id,
  });

  console.log(createToken);

  //delete token
  setTimeout(async () => {
    await Token.findByIdAndDelete(createToken._id);
    await User.findOneAndUpdate(
      { _id: isUserExist._id },
      { resetPasswordToken: false }
    );
  }, 10 * 60 * 1000); //10minutes

  //verified true here
  const updateData = {
    oneTimeCode: null,
    resetPasswordToken: true,
  };
  await User.findOneAndUpdate({ _id: isUserExist._id }, updateData, {
    new: true,
  });

  return createToken.token;
};

export const AuthService = {
  loginUserFromDB,
  changePasswordToDB,
  forgetPasswordToDB,
  otpVerifyToDB,
};
