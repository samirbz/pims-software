"use client"

import { useMyContext } from "../../context/MyContext"
import { fetchFyData } from "@/actions/formAction"
import { useEffect, useState } from "react"

export default function FiscalYear() {
  const [fiscalYears, setFiscalYears] = useState<any[]>([])

  const { setValue } = useMyContext() // Access context

  const handleSelectYear = (year: string) => {
    setValue(year) // Updates context and cookie
  }

  useEffect(() => {
    ;(async () => {
      try {
        const data = await fetchFyData()
        if (data.length === 0) {
          alert("fiscal year not found")
        } else {
          setFiscalYears(data)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <div className="flex h-screen items-center justify-center bg-gray-400">
      <div className="w-auto rounded-lg bg-gray-300 shadow-2xl">
        {/* Header Section */}
        <div className="rounded-t-lg bg-blue-600 py-2 text-center">
          <h1 className="text-xl font-medium text-gray-100">आर्थिक वर्ष </h1>
        </div>

        {/* Button Section */}
        <div className="flex flex-col items-center gap-2 p-4">
          {fiscalYears.map((year) => (
            <button
              key={year}
              onClick={() => handleSelectYear(year)}
              className="w-full max-w-sm rounded-md bg-gray-100 px-4 py-2 text-lg font-medium text-gray-700 transition hover:bg-blue-400 hover:text-white hover:shadow-lg"
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
