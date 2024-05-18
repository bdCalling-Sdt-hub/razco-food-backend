import { Model } from "mongoose";

export type IUserCoupon = {
  couponCode: string;
  couponDiscount: number;
  expireDate: string;
  points: number;
  isCouponUsed?: boolean;
};

export type IUser = {
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
  coupons: IUserCoupon[];
  profileImage?: string;
};

export type UserModel = {
  isUserExist(email: string): any;
  isMatchPassword(password: string, hashPassword: string): Promise<boolean>;
} & Model<IUser>;
