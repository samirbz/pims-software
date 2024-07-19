import UserNav from "@/components/navbar/UserNav"
import TopBanner from "@/components/TopBanner"
import React from "react"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <TopBanner />
      <UserNav />
      {children}
    </main>
  )
}
