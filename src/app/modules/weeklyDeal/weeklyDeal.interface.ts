import { Model } from "mongoose";

export type IWeeklyDeal = {
  image: string;
};

export type WeeklyDealModel = Model<IWeeklyDeal, Record<string, unknown>>;
