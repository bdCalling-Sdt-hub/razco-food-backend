import { z } from "zod";

const createLoginZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const createChangePasswordZodSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: "Current password is required",
    }),
    newPassword: z.string({ required_error: "New password is required" }),
    confirmPassword: z.string({
      required_error: "Confirm password is required",
    }),
  }),
});

const createForgetPasswordZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email(),
  }),
});

const createOtpVerifyZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    code: z.string({ required_error: "Code is required" }),
  }),
});

const createResetPasswordZodSchema = z.object({
  body: z.object({
    newPassword: z.string({ required_error: "New password is required" }),
    confirmPassword: z.string({
      required_error: "Confirm password is required",
    }),
  }),
});

export const AuthValidation = {
  createLoginZodSchema,
  createChangePasswordZodSchema,
  createForgetPasswordZodSchema,
  createOtpVerifyZodSchema,
  createResetPasswordZodSchema,
};
