"use client"
import React, { useState, useEffect } from "react"
import NepaliDate from "nepali-datetime"

export default function BSDateDisplay() {
  const [now, setNow] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const currentNepaliTime = new NepaliDate().toString().split(".")[0]
      setNow(currentNepaliTime)
    }

    updateTime()

    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <p className="text-[0.6rem] font-semibold text-red-500 sm:text-[1rem]">
        {now}
      </p>
    </div>
  )
}
