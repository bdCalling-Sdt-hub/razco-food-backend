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

const contactZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }),
    phone: z.string({ required_error: "Phone is required" }),
    message: z.string({ required_error: "Message is required" }),
  }),
});

export const RuleValidation = {
  createRuleZodSchema,
  updateRuleZodSchema,
  contactZodSchema,
};
