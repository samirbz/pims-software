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
import { user } from "@nextui-org/react"
import { User } from "@prisma/client"
import bcrypt from "bcryptjs"
import { AuthError } from "next-auth"

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

export async function staffRegister(
  data: StaffRegisterSchema
): Promise<ActionResult<User>> {
  try {
    // Validate input data
    const validated = staffRegisterSchema.safeParse(data)

    if (!validated.success) {
      // Return validation errors
      return { status: "error", error: validated.error.errors }
    }

    const { name, position, ranking } = validated.data

    // Create staff record in the database
    const staff = await prisma.staff.create({
      data: {
        name,
        position,
        ranking,
      },
    })

    // Return success result with created staff data
    return { status: "success", data: staff }
  } catch (error) {
    // Handle and log error
    console.error("Error creating staff:", error)
    return { status: "error", error: "Something went wrong" }
  }
}
