import { Model } from "mongoose";

export type ITempUser = {
  name: string;
  role: "super_admin" | "admin" | "user";
  email: string;
  phone: string;
  password: string;
  passwordChangeAt: Date;
  resetPasswordToken: boolean;
  verified: boolean;
  oneTimeCode: string;
  gender?: "male" | "female";
  address?: string;
  status: "active" | "deActive";
  points?: {
    available: number;
    used: number;
  };
  profileImage?: string;
};

export type TempUserModel = {
  isUserExist(email: string): any;
  isMatchPassword(password: string, hashPassword: string): Promise<boolean>;
} & Model<ITempUser>;
