import React from "react"
import Link from "next/link"

export default function YojanaTippani() {
  return (
    <div className="mt-16 flex justify-center">
      <div className="flex flex-col gap-2">
        <Link
          href="/members/yojana-sastha/yojanaTippani/peskiVuktani"
          className="text-blue-500 hover:text-blue-700"
        >
          पेश्की भुक्तानी
        </Link>
        <Link
          href="/members/yojana-sastha/yojanaTippani/runningBilVuktani"
          className="text-blue-500 hover:text-blue-700"
        >
          रनिङ बिल भुक्तानी
        </Link>
        <Link
          href="/members/yojana-sastha/yojanaTippani/antimKistaFarFarak"
          className="text-blue-500 hover:text-blue-700"
        >
          अन्तिम किस्ता फरफारक (भुक्तानी)
        </Link>
        <Link
          href="/members/yojana-sastha/yojanaTippani/sansthagatAnudan"
          className="text-blue-500 hover:text-blue-700"
        >
          संस्थागत अनुदान टिप्पणी
        </Link>
        <Link
          href="/members/yojana-sastha/yojanaTippani/vuktaniKarobar"
          className="text-blue-500 hover:text-blue-700"
        >
          भुक्तानी करोबरको सिफारिस पत्र
        </Link>
      </div>
    </div>
  )
}
