import { auth } from "@/auth"
import React from "react"
import UserMenu from "./UserMenu"

export default async function UserNav() {
  const session = await auth()
  return (
    <div>
      <UserMenu user={session?.user} />
    </div>
  )
}
