import { z } from "zod";

const createLoginZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const createVerifyEmailZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    code: z.number({ required_error: "Code is required" }),
  }),
});

export const AuthValidation = {
  createLoginZodSchema,
  createVerifyEmailZodSchema,
};
