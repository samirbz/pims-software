import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(3, {
    message: "name must be at least 3 characters",
  }),
  username: z.string().min(3, {
    message: "username must be at least 3 characters",
  }),
  email: z.string().min(3),
  password: z.string().min(5, {
    message: "password must be at least 5 characters",
  }),
})

export type RegisterSchema = z.infer<typeof registerSchema>
