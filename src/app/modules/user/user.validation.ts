import { z } from "zod";
import { gender } from "../../../shared/constant";

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }).email(),
    phone: z.string({ required_error: "Phone number is required" }),
    password: z.string({ required_error: "Password is required" }),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    address: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

const createVerifyEmailZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    code: z.number({ required_error: "Code is required" }),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    password: z.string().optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    address: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

const deleteAccountZodSchema = z.object({
  body: z.object({
    password: z.string({ required_error: "Password is required" }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  createVerifyEmailZodSchema,
  updateUserZodSchema,
  deleteAccountZodSchema,
};
