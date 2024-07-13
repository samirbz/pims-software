import { auth } from "@/auth"
import React from "react"
import MemberNav from "./MemberNav"

export default async function UserNav() {
  const session = await auth()
  return (
    <div>
      <MemberNav user={session?.user} />
    </div>
  )
}
