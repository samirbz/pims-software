import UserCreate from "@/components/UserCreate"
import UserEdit from "@/components/UserEdit"
import React from "react"

export default function UserSetup() {
  return (
    <div>
      <UserCreate />
      <UserEdit />
    </div>
  )
}
