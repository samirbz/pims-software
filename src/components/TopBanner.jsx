"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"

export default function TopBanner() {
  return (
    <div className="flex h-[6.4rem] w-full items-center justify-between">
      <div className="flex justify-start">
        <Link href="/">
          <Image src="/images/logo.png" width={420} height={103} alt="PIMS" />
        </Link>
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
