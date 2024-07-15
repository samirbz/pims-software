"use server"

import {
  memberEditSchema,
  MemberEditSchema,
} from "@/lib/schemas/memberEditSchema"
import { ActionResult } from "@/types"
import { getAuthUserId } from "./authActions"
import { prisma } from "@/lib/prisma"
import { User } from "@prisma/client"

export async function updateMemberProfile(
  data: MemberEditSchema
): Promise<ActionResult<User>> {
  try {
    const id = await getAuthUserId()

    const validated = memberEditSchema.safeParse(data)

    if (!validated.success)
      return { status: "error", error: validated.error.errors }

    const { name } = validated.data
    const member = await prisma.user.update({
      where: { id },
      data: {
        name,
      },
    })
    return { status: "success", data: member }
  } catch (error) {
    console.log(error)

    return { status: "error", error: "Something went wrong" }
  }
}

export async function deleteMember(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    })
    return { status: "success" }
  } catch (error) {
    console.error("Failed to delete member:", error)
    return { status: "error", error: "something went wrong" }
  }
}
