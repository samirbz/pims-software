"use client"
import React, { useState, useEffect } from "react"
import NepaliDate from "nepali-datetime"
import { ConvertToNepaliNumerals } from "@/lib/util"

export default function BSDateDisplay() {
  const [now, setNow] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const currentNepaliDate = new NepaliDate().format("YYYY-MM-DD")
      setNow(currentNepaliDate)
    }

    updateTime()

    const interval = setInterval(updateTime, 86400000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <p className="text-[0.6rem] sm:w-40 sm:text-[1rem]">
        <span className="text-[1rem]">मिति:</span>{" "}
        <span className="text-[1rem] text-red-500">
          {ConvertToNepaliNumerals(now)}
        </span>
      </p>
    </div>
  )
}
