import React from "react"
import Nav from "./Nav2"
import { auth } from "@/auth"

export default async function UserNav() {
  const session = await auth()
  return <Nav user={session?.user} />
}
