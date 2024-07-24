"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import BSDateDisplay from "./BSDateDisplay"

export default function TopBanner() {
  return (
    <div className="flex w-full items-center justify-between py-1 sm:px-10">
      <Link
        href="/"
        className="hidden text-5xl font-bold text-orange-600 sm:block"
      >
        PIMS
      </Link>
      <Link href="/" className="flex justify-start">
        <Image
          src="/images/logo.png"
          width={300}
          height={100}
          alt="PIMS"
          priority
        />
      </Link>

      <div className="flex flex-col items-center gap-2 pr-2 sm:w-40 ">
        <Image
          src="/images/flag.gif"
          unoptimized
          width={40}
          height={40}
          alt="flag"
          priority
        />
        <BSDateDisplay />
      </div>
    </div>
  )
}
