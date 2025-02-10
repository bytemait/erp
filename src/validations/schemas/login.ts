import { z } from "zod";

export const userLoginSchema = z.object({
    username: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    password: z.string().min(4, {
        message: "Password must be at least 6 characters.",
    })
});