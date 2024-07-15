"use server"

import {
  memberEditSchema,
  MemberEditSchema,
} from "@/lib/schemas/memberEditSchema"
import { ActionResult } from "@/types"
import { getAuthUserId } from "./authActions"
import { prisma } from "@/lib/prisma"
import { User } from "@prisma/client"
import bcrypt from "bcryptjs"
import { auth } from "@/auth"

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

export async function resetPassword(newPassword: string) {
  const session = await auth()
  const id = session?.user?.id

  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update the user's password in the database
    await prisma.user.update({
      where: { id },
      data: {
        passwordHash: hashedPassword,
      },
    })

    return { message: "Password reset successful" }
  } catch (error) {
    console.error("Error resetting password:", error)
    throw new Error("Failed to reset password")
  }
}
