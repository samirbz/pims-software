import { z } from "zod"

export const staffRegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  ranking: z.string().min(1, "Ranking is required"),
  isuser: z.boolean(), // Boolean fields are required by default
})

export type StaffRegisterSchema = z.infer<typeof staffRegisterSchema>
