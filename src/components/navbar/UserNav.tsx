import { auth } from "@/auth"
import React from "react"
import AdminNav from "./AdminNav"
import MemberNav from "./MemberNav"

export default async function UserNav() {
  const session = await auth()
  return (
    <div>
      {session?.user?.email === "admin" ? (
        <AdminNav user={session?.user} />
      ) : (
        <MemberNav user={session?.user} />
      )}
    </div>
  )
}
