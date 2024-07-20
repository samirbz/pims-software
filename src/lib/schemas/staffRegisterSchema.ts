import { z } from "zod"

export const staffRegisterSchema = z.object({
  name: z.string().min(3, {
    message: "name must be at least 3 characters",
  }),

  ranking: z.number(),
  position: z.string(),
})

export type StaffRegisterSchema = z.infer<typeof staffRegisterSchema>
