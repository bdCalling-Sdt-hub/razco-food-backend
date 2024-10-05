import { model, Schema } from "mongoose";
import { IWeeklyDeal, WeeklyDealModel } from "./weeklyDeal.interface";

const weeklyDealSchema = new Schema<IWeeklyDeal, WeeklyDealModel>(
  {
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const WeeklyDeal = model<IWeeklyDeal, WeeklyDealModel>(
  "WeeklyDeal",
  weeklyDealSchema
);
