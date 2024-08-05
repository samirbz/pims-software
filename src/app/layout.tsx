import type { Metadata } from "next"
import "./globals.css"
import React from "react"
import Providers from "@/components/Provider"
import { Mukta } from "next/font/google"

const mukta = Mukta({
  subsets: ["devanagari"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-mukta",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Planning Information Management System (PIMS)",
  description:
    "management tools optimized for tracking and approving many different project activities.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={mukta.className}>
      <body>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
