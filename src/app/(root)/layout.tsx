import React from "react"
import TopBanner from "@/components/TopBanner"
import HomeNavbar from "@/components/navbar/HomeNavbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <TopBanner />
      <HomeNavbar />
      {children}
    </main>
  )
}
