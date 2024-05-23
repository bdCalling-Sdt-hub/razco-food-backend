import { Types } from "mongoose";

export type INotification = {
  recipient: Types.ObjectId;
  message: string;
  read: boolean;
  role: "user" | "admin" | "super_admin";
  type: "order";
};
