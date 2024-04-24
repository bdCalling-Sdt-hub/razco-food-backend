import { z } from "zod";

const createBannerZodSchema = z.object({
  body: z.object({
    bannerName: z.string({ required_error: "Banner name is required" }),
    bannerImage: z.number({ required_error: "Banner Image is required" }),
    sliderLInk: z.string().optional(),
  }),
});

const updateBannerZodSchema = z.object({
  body: z.object({
    bannerName: z.string().optional(),
    bannerImage: z.number().optional(),
    sliderLInk: z.string().optional(),
  }),
});

export const BannerValidation = {
  createBannerZodSchema,
  updateBannerZodSchema,
};
