import { Types } from "mongoose";

export type IScanHistory = {
  user: Types.ObjectId;
  barcode: string;
  date: Date;
};
