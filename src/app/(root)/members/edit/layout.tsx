import { getAuthUserId } from "@/app/actions/authActions"
import { getMemberByUserId } from "@/app/actions/memberActions"
import { notFound } from "next/navigation"
import { ReactNode } from "react"

export default async function Layout({ children }: { children: ReactNode }) {
  const userId = await getAuthUserId()

  const member = await getMemberByUserId(userId)
  if (!member) return notFound()

  return <div>{children}</div>
}
