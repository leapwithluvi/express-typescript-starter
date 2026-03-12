import { z } from "zod";

export const registerSchema = z.object({
    body: z.object({
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email format"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[0-9]/, "Password must contain at least one number"),
        firstName: z.string().min(1, "First name cannot be empty").optional(),
        lastName: z.string().min(1, "Last name cannot be empty").optional(),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email format"),
        password: z
            .string()
            .min(1, "Password is required"),
    }),
});

export const refreshSchema = z.object({
    body: z.object({
        refreshToken: z.string().min(1, "Refresh token is required"),
    }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
export type RefreshInput = z.infer<typeof refreshSchema>["body"];
