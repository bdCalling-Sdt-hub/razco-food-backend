import { z } from "zod";

const createAboutZodSchema = z.object({
  body: z.object({
    content: z.string({ required_error: "Content is required" }),
  }),
});

export const RuleValidation = {
  createAboutZodSchema,
};
