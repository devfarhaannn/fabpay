import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Current password must be at least 6 characters"),

    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters")
      .max(50, "Password cannot exceed 50 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        "Password must contain at least one letter and one number"
      ),

    confirmPassword: z
      .string()
      .min(6, "Please confirm your password"),
  })
  .refine(
    (data) => data.newPassword === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type ChangePasswordFormData = z.infer<
  typeof changePasswordSchema
>;