import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiErrors";
import { emailHelper } from "../../../helpers/emailHelper";
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
    { oneTimeCode: otp.toString() },
    { new: true }
  );

  //send email
  const data = {
    email,
    otp,
  };
  const mailData = forgetPasswordTemplate(data);
  emailHelper.sendMail(mailData);

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

  //delete token
  setTimeout(async () => {
    await User.findOneAndUpdate(
      { _id: isUserExist._id },
      { resetPasswordToken: false }
    );
    await Token.findByIdAndDelete(createToken._id);
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

const resetPasswordToDB = async (
  token: string,
  payload: IChangePassword
): Promise<void> => {
  const { newPassword, confirmPassword } = payload;

  //check token
  const isExistToken = await Token.findOne({ token }, { token: 0 }).populate(
    "user"
  );
  if (!isExistToken) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
  }

  //check user
  const isUserExist = await User.isUserExist(isExistToken.user.email);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  if (isUserExist.resetPasswordToken) {
    //check given password
    if (newPassword !== confirmPassword) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "The passwords you entered do not match. Please ensure both fields contain the same password."
      );
    }

    //hash password
    const hashPassword = await bcrypt.hash(
      newPassword,
      Number(config.bcrypt_salt_rounds)
    );

    isUserExist.password = hashPassword;
    isUserExist.resetPasswordToken = false;
    isUserExist.save();
  }
};

const changePasswordToDB = async (
  user: JwtPayload,
  payload: IChangePassword
): Promise<void> => {
  const { currentPassword, newPassword, confirmPassword } = payload;
  const isUserExist = await User.isUserExist(user.email);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist");
  }

  //check password
  const isMatchPassword = await User.isMatchPassword(
    currentPassword,
    isUserExist.password
  );
  if (isUserExist.password && !isMatchPassword) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "Current password is incorrect"
    );
  }

  //check given password
  if (newPassword !== confirmPassword) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "The passwords you entered do not match. Please ensure both fields contain the same password."
    );
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

export const AuthService = {
  loginUserFromDB,
  changePasswordToDB,
  forgetPasswordToDB,
  otpVerifyToDB,
  resetPasswordToDB,
};
