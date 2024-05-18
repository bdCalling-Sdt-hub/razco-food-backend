import { Types } from "mongoose";

export type INotification = {
  recipient: Types.ObjectId;
  message: string;
  read: boolean;
  type: "order";
};
