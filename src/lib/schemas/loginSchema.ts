import { z } from "zod"

export const loginSchema = z.object({
  username: z.string().min(3, {
    message: "username must be at least 3 characters",
  }),
  password: z.string().min(5, {
    message: "password must be at least 5 characters",
  }),
})

export type LoginSchema = z.infer<typeof loginSchema>
