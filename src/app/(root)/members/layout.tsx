import UserNav from "@/components/navbar/UserNav"
import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <UserNav />
      {children}
    </main>
  )
}
