"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function getMembers() {
  const session = await auth()
  if (!session?.user) return null
  try {
    return prisma.user.findMany()
  } catch (error) {
    console.log(error)
  }
}
export async function getMembersExcludeOwn() {
  const session = await auth()
  if (!session?.user) return null
  try {
    const users = prisma.user.findMany()
    return (await users).filter((user) => user.id !== session?.user?.id)
  } catch (error) {
    console.log(error)
  }
}

export async function getMemberByUserId(id: string) {
  try {
    return prisma.user.findUnique({ where: { id } })
  } catch (error) {
    console.log(error)
  }
}

export async function getStaff() {
  try {
    return prisma.staff.findMany()
  } catch (error) {
    console.log(error)
  }
}

export const fetchStaffNames = async () => {
  try {
    const staff = await prisma.staff.findMany({
      where: {
        isuser: true,
      },
    })
    return staff
  } catch (error) {
    console.error("Error fetching staff names:", error)
    throw error
  }
}
