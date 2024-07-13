import type { Metadata } from "next"
import "./globals.css"
import React from "react"
import Providers from "@/components/Provider"

export const metadata: Metadata = {
  title: "Planning Information Management System (PIMS)",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
