import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import config from "../../../config";
import { gender } from "../../../shared/constant";
import { IUser, UserModel } from "./user.interface";

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    resetPasswordToken: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    oneTimeCode: {
      type: Number,
      default: null,
    },
    gender: {
      type: String,
      enum: gender,
    },
    address: {
      type: String,
    },
    profile: {
      type: String,
      default: "https://i.ibb.co/sgvmVjj/icons8-customer-80.png",
    },
  },
  { timestamps: true }
);

//isExist user
userSchema.statics.isUserExist = async function (email: string): Promise<any> {
  return await User.findOne({ email });
};

//password compare
userSchema.statics.isMatchPassword = async function (
  password: string,
  hashPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashPassword);
};

//hash password
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>("User", userSchema);
