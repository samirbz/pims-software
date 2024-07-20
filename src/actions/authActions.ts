"use server"

import { auth, signIn, signOut } from "@/auth"
import { prisma } from "@/lib/prisma"
import { LoginSchema } from "@/lib/schemas/loginSchema"
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema"
import {
  StaffRegisterSchema,
  staffRegisterSchema,
} from "@/lib/schemas/staffRegisterSchema"

import { ActionResult } from "@/types"
import { Staff } from "@prisma/client"
import bcrypt from "bcryptjs"
import { AuthError, User } from "next-auth"

export async function signInUser(
  data: LoginSchema
): Promise<ActionResult<string>> {
  try {
    const result = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    })
    console.log(result)
    return { status: "success", data: "Logged in" }
  } catch (error: any) {
    console.log(error)

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Invalid credentials" }
        default:
          return { status: "error", error: "Something went wrong" }
      }
    } else {
      return { status: "error", error: "Something else went wrong" }
    }
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: "/" })
}

export async function registerUser(
  data: RegisterSchema
): Promise<ActionResult<User>> {
  try {
    const validated = registerSchema.safeParse(data)

    if (!validated.success) {
      return { status: "error", error: validated.error.errors }
    }
    const { name, username, password, email } = validated.data

    const hashedPassword = await bcrypt.hash(password, 10)

    const session = await auth()
    const createdBy = session?.user?.name

    const existingUser = await prisma.user.findUnique({
      where: { username },
    })
    if (existingUser) return { status: "error", error: "User already exists" }

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        passwordHash: hashedPassword,
        createdby: createdBy,
      },
    })
    return { status: "success", data: user }
  } catch (error) {
    console.log(error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function staffRegister(
  data: StaffRegisterSchema
): Promise<ActionResult<Staff>> {
  try {
    const validated = staffRegisterSchema.safeParse(data)

    if (!validated.success) {
      return { status: "error", error: validated.error?.errors }
    }
    const { name, ranking, position } = validated.data

    const user = await prisma.staff.create({
      data: {
        name,
        ranking,
        position,
      },
    })
    return { status: "success", data: user }
  } catch (error) {
    console.log(error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function getUserByUsername(username: string) {
  return prisma.user.findUnique({ where: { username } })
}
export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } })
}

export async function getAuthUserId() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) throw new Error("Unauthorised")

  return userId
}
