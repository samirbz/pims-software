import React from "react"
import EditForm from "./EditForm"
import { getAuthUserId } from "@/app/actions/authActions"
import { getMemberByUserId } from "@/app/actions/memberActions"
import { notFound } from "next/navigation"

export default async function MemberEditPage() {
  const userId = await getAuthUserId()
  const user = await getMemberByUserId(userId)
  if (!user) return notFound()
  return (
    <>
      <h3>
        Form goes here <EditForm user={user} />
      </h3>
    </>
  )
}
