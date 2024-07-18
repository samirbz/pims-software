import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { loginSchema } from "./lib/schemas/loginSchema"
import { getUserByUsername } from "@/actions/authActions"
import { compare } from "bcryptjs"

export default {
  providers: [
    Credentials({
      name: "credentials",
      async authorize(creds) {
        const validated = loginSchema.safeParse(creds)

        if (validated.success) {
          const { username, password } = validated.data

          const user = await getUserByUsername(username)

          if (!user || !(await compare(password, user.passwordHash)))
            return null
          return user
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
