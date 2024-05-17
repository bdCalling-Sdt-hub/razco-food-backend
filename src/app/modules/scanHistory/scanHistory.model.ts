import { model, Schema } from "mongoose";
import { IScanHistory } from "./scanHistory.interface";

const scanHistorySchema = new Schema<IScanHistory>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  barcode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const ScanHistory = model<IScanHistory>(
  "ScanHistory",
  scanHistorySchema
);
