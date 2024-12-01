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
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="w-auto rounded-lg bg-gray-300 shadow-2xl">
        {/* Header Section */}
        <div className="rounded-t-lg bg-blue-600 py-2 text-center">
          <h1 className="text-xl font-medium text-gray-100">आर्थिक वर्ष </h1>
        </div>

        {/* Button Section */}
        <div className="flex flex-col items-center gap-2 p-4">
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
