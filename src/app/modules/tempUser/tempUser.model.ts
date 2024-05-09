import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import config from "../../../config";
import { gender } from "../../../shared/constant";
import { ITempUser, TempUserModel } from "./tempUser.interface";

const tempUserSchema = new Schema<ITempUser, TempUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["super_admin", "admin", "user"],
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
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: gender,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "deActive"],
      required: true,
      default: "active",
    },
    points: {
      available: {
        type: Number,
        default: 0,
      },
      used: {
        type: Number,
        default: 0,
      },
    },
    profileImage: {
      type: String,
      default: "https://i.ibb.co/sgvmVjj/icons8-customer-80.png",
    },
  },
  { timestamps: true }
);

//isExist user
tempUserSchema.statics.isUserExist = async function (
  email: string
): Promise<any> {
  return await TempUser.findOne({ email });
};

//password compare
tempUserSchema.statics.isMatchPassword = async function (
  password: string,
  hashPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashPassword);
};

//hash password
tempUserSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const TempUser = model<ITempUser, TempUserModel>(
  "TempUser",
  tempUserSchema
);
