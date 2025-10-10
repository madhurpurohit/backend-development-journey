import { error } from "console";
import z from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(3, { message: "Name must be at least 3 characters long." })
  .max(100, { message: "Name must be no more than 100 characters." });

export const loginUserSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid Email address." }),

  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password must be no more than 100 characters." }),
});

export const registerUserSchema = loginUserSchema.extend({
  name: nameSchema,
});

export const verifyEmailSchema = z.object({
  token: z.string().trim().length(8),
  email: z.string().trim().email(),
});

export const verifyUserSchema = z.object({
  name: nameSchema,
});

export const verifyPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),

    newPassword: z
      .string()
      .min(6, { message: "New Password must be at least 6 characters long." })
      .max(100, {
        message: "New Password must be no more than 100 characters.",
      }),

    confirmPassword: z
      .string()
      .min(6, {
        message: "Confirm Password must be at least 6 characters long.",
      })
      .max(100, {
        message: "Confirm Password must be no more than 100 characters.",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match", // Custom error message, which will be shown in the path of the error.
    path: ["confirmPassword"], // Error will be associated with `confirmPassword` field.
  });
