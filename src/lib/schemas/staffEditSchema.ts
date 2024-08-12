import { z } from "zod"

export const staffEditSchema = z.object({
  name: z.string().min(1, "Name is required"),
  ranking: z.string().min(1, "Ranking is required"),
  position: z.string().min(1, "Position is required"),
  isuser: z.boolean().optional(), // Optional field
})

export type StaffEditSchema = z.infer<typeof staffEditSchema>
