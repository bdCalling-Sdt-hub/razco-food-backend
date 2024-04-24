import { Model } from "mongoose";

export type IBanner = {
  bannerName: string;
  bannerImage: string;
  sliderLInk?: string;
};

export type BannerModel = Model<IBanner, Record<string, unknown>>;
