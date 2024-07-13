"use client"
import React, { useState, useEffect } from "react"
import NepaliDate from "nepali-datetime"

export default function BSDateDisplay() {
  const [now, setNow] = useState("")

  useEffect(() => {
    // Function to update current time
    const updateTime = () => {
      const currentNepaliTime = new NepaliDate().toString().split(".")[0]
      setNow(currentNepaliTime)
    }

    // Update time initially
    updateTime()

    // Set interval to update time every second
    const interval = setInterval(updateTime, 1000)

    // Clean up interval on component unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
        <p className="text-sm font-semibold text-red-500 sm:text-lg">{now}</p>
    </div>
  )
}
