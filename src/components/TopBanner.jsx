import React from "react"
import { Image } from "@nextui-org/react"

export default function TopBanner() {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex justify-start">
        <Image
          src="/assets/images/logo.png"
          className="w-full "
          width={420}
          alt="PIMS"
        />
      </div>
      <div className="flex justify-end">
        <Image
          src="/assets/images/side-logo.png"
          className="h-auto max-w-full"
          width={120}
          alt="PIMS"
        />
      </div>
    </div>
  )
}
