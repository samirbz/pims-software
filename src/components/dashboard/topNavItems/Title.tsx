import React from "react"
import { useMyContext } from "../../../context/MyContext"

export default function Title() {
  const { value } = useMyContext()

  return (
    <div className="mr-14 flex items-center gap-2">
      <p className="text-xl font-semibold text-gray-500">
        वाणगङ्गा नगरपालिका, कपिलवस्तु - {value === null ? "waiting..." : value}
      </p>
    </div>
  )
}
