import React from "react"
import Nav from "./Nav"
import { auth } from "@/auth"

export default async function UserNav() {
  const session = await auth()
  return <Nav user={session?.user} />
}
