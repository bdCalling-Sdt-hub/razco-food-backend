import { Model } from "mongoose";

export type IOffer = {
  offerName: string;
  percentage: number;
  offerImage: string;
};

export type OfferModel = Model<IOffer, Record<string, unknown>>;
