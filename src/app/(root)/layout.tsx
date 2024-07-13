import TopBanner from "@/components/TopBanner"
import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <TopBanner />
      {children}
    </main>
  )
}
