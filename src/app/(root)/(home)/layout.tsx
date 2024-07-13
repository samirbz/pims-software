import React from "react"
import HomeNavbar from "@/components/navbar/HomeNav"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <HomeNavbar />
      {children}
    </main>
  )
}
