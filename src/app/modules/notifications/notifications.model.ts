import { model, Schema } from "mongoose";
import { INotification } from "./notifications.interface";

const notificationSchema = new Schema<INotification>(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["order"],
    },
  },
  { timestamps: true }
);

export const Notification = model<INotification>(
  "Notification",
  notificationSchema
);
