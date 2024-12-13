import React from "react"
import { useMyContext, usePlaceContext } from "../../../context/MyContext"

export default function Title() {
  const { value } = useMyContext()
  const { place } = usePlaceContext()

  return (
    <div className="mr-14 flex items-center gap-2">
      <p className="text-xl font-semibold text-gray-500">
        {place} - {value === null ? "waiting..." : value}
      </p>
    </div>
  )
}
