import { z } from "zod";

const createRuleZodSchema = z.object({
  body: z.object({
    content: z.string({ required_error: "Content is required" }),
  }),
});
const updateRuleZodSchema = z.object({
  body: z.object({
    content: z.string().optional(),
  }),
});

export const RuleValidation = {
  createRuleZodSchema,
  updateRuleZodSchema,
};
