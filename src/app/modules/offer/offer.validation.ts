import { z } from "zod";

const createOfferZodSchema = z.object({
  body: z.object({
    offerName: z.string({ required_error: "Offer name is required" }),
    setPercentage: z.number({ required_error: "Set percentage for the offer" }),
    offerImage: z.string({ required_error: "Offer image is required" }),
  }),
});

export const OfferValidation = {
  createOfferZodSchema,
};
