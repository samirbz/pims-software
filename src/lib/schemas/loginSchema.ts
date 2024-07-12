import { z } from "zod"

export const loginSchema = z.object({
  username: z.union([
    z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .refine((val) => /^[a-zA-Z0-9]*$/.test(val), {
        message: "username must only include a-z and 0-9",
      }),
    z.number(),
  ]),
  password: z.string().min(5, {
    message: "password must be at least 5 characters",
  }),
})

export type LoginSchema = z.infer<typeof loginSchema>
