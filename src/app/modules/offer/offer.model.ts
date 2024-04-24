import { model, Schema } from "mongoose";
import { IOffer, OfferModel } from "./offer.interface";

const offerSchema = new Schema<IOffer, OfferModel>(
  {
    offerName: {
      type: String,
      required: true,
      unique: true,
    },
    setPercentage: {
      type: Number,
      required: true,
    },
    offerImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Offer = model<IOffer, OfferModel>("Offer", offerSchema);
