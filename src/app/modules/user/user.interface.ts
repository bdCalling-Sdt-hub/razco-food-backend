import { Model } from "mongoose";

export type IUser = {
  name: string;
  role: string;
  email: string;
  phone: string;
  password: string;
  verified: boolean;
  oneTimeCode: number;
  gender?: "male" | "female";
  address?: string;
  profile?: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
