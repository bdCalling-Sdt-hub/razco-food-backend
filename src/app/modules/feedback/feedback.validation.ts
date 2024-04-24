import { z } from "zod";

const createFeedbackZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    description: z.string({ required_error: "Description is required" }),
    status: z.enum(["pending", "replied"]).optional(),
  }),
});

export const FeedbackValidation = {
  createFeedbackZodSchema,
};
