"use client"

import { useRouter } from "next/navigation" // Import useRouter for navigation
import { useMyContext } from "../../context/MyContext"

export default function FiscalYear() {
  const { setValue } = useMyContext() // Access context
  const router = useRouter() // For navigation

  const handleSelectYear = (year: string) => {
    setValue(year) // Updates context and cookie
    router.push("/members") // Navigate to /members
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900/50">
      {/* Popup Section */}
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        {/* Title */}
        <div className="rounded-t-lg bg-blue-600 py-3 text-center">
          <h1 className="text-xl font-bold text-white">Select Fiscal Year</h1>
        </div>

        {/* Button Section */}
        <div className="flex flex-col items-center gap-4 p-6">
          {[
            "आ. व. 2081/82",
            "आ. व. 2080/81",
            "आ. व. 2079/80",
            "आ. व. 2078/79",
            "आ. व. 2077/78",
          ].map((year) => (
            <button
              key={year}
              onClick={() => handleSelectYear(year)}
              className="w-full text-lg font-medium text-gray-700 transition hover:text-blue-600 hover:underline"
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
