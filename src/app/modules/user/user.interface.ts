import { Model } from "mongoose";

export type IUser = {
  name: string;
  role: string;
  email: string;
  phone: string;
  password: string;
  passwordChangeAt: Date;
  verified: boolean;
  oneTimeCode: number;
  gender?: "male" | "female";
  address?: string;
  profile?: string;
};

export type UserModel = {
  isUserExist(email: string): any;
  isMatchPassword(password: string, hashPassword: string): Promise<boolean>;
} & Model<IUser>;
