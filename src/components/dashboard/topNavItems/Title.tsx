import React from "react"
import { useMyContext, usePlaceContext } from "../../../context/MyContext"
import { ConvertToNepaliNumerals } from "@/lib/util"

export default function Title() {
  const { value } = useMyContext()
  const { place } = usePlaceContext()

  return (
    <div className="mr-14 flex items-center gap-2">
      <p className="text-lg font-semibold text-gray-500">
        {place} - {value === null ? "waiting..." : ConvertToNepaliNumerals(value)}
      </p>
    </div>
  )
}
