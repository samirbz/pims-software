import { z } from "zod"

export const staffRegisterSchema = z.object({
  name: z.string(),
  position: z.string(),
  ranking: z.string(),
})

export type StaffRegisterSchema = z.infer<typeof staffRegisterSchema>
