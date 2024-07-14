import { auth } from "@/auth"
import React from "react"
import Navbar from "./Navbar"

export default async function UserNav() {
  const session = await auth()
  return (
    <div>
      {/* {session?.user?.email === "admin" ? (
        <AdminNav user={session?.user} />
      ) : (
        <MemberNav user={session?.user} />
      )} */}
      <Navbar user={session?.user} />
    </div>
  )
}
