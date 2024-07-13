import { z } from "zod"

export const loginSchema = z.object({
  username: z.string().min(3, {
    message: "username required",
  }),
  password: z.string().min(5, {
    message: "password required",
  }),
})

export type LoginSchema = z.infer<typeof loginSchema>
