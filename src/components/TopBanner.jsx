"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import BSDateDisplay from "./BSDateDisplay"

export default function TopBanner() {
  return (
    <div className="relative flex h-[6.4rem] w-full items-center justify-between">
      <div className="flex justify-start">
        <Link href="/" className="mb-4">
          <Image src="/images/logo.png" width={320} height={70} alt="PIMS" />
        </Link>
      </div>
      <div className="absolute bottom-0 left-2">
      <BSDateDisplay />
      </div>
      <div className="flex justify-end">
        <Image
          src="/images/side-logo.png"
          width={120}
          height={103}
          alt="PIMS"
        />
      </div>
    </div>
  )
}
