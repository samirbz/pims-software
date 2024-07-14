"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import BSDateDisplay from "./BSDateDisplay"

export default function TopBanner() {
  return (
    <div className="flex h-[6.4rem] w-full items-center justify-between">
      <div className="flex justify-start">
        <Link href="/" className="">
          <Image src="/images/logo.png" width={300} height={80} alt="PIMS" />
        </Link>
      </div>

      <div className="flex flex-col items-center gap-2 pr-2">
        <Image
          src="/images/flag.gif"
          unoptimized
          width={40}
          height={40}
          alt="PIMS"
        />
        <BSDateDisplay />
      </div>
    </div>
  )
}
