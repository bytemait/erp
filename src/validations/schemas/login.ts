import { z } from "zod";

export const userLoginSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }),
    password: z.string().min(4, {
        message: "Password must be at least 6 characters.",
    }).optional(),
});