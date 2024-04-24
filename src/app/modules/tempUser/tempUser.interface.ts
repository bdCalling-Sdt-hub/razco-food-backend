import { Model } from "mongoose";

export type ITempUser = {
  name: string;
  role: string;
  email: string;
  phone: string;
  password: string;
  passwordChangeAt: Date;
  resetPasswordToken: boolean;
  verified: boolean;
  oneTimeCode: number;
  gender?: "male" | "female";
  address?: string;
  profileImage?: string;
};

export type TempUserModel = {
  isUserExist(email: string): any;
  isMatchPassword(password: string, hashPassword: string): Promise<boolean>;
} & Model<ITempUser>;
