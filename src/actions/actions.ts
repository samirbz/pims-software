// server actions

"use server"

import { prisma } from "@/lib/prisma"

export async function createStaff(formData: FormData) {
  const name = formData.get("name")
  const position = formData.get("position")
  const rankingValue = formData.get("ranking")

  if (
    typeof name !== "string" ||
    typeof position !== "string" ||
    typeof rankingValue !== "string"
  ) {
    throw new Error("Invalid form data")
  }

  const ranking = parseInt(rankingValue, 10)

  if (isNaN(ranking)) {
    throw new Error("Ranking must be a number")
  }

  await prisma.staff.create({
    data: {
      name,
      position,
      ranking,
    },
  })
}
