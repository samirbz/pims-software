"use client"
import React from "react"
import { ConvertToNepaliNumerals } from "@/lib/util"

export default function ProjectCount() {
  const paragraphs = [
    "दर्ता योजना",
    "सम्झौत योजना",
    "पेस्की निकास योजना",
    "रनीङ बिल निकास",
    "चालुमा आ.व सम्पन्न योजना",
  ]

  return (
    <div className="ml-4">
      <h1 className="mb-4 font-mukta text-xl font-bold text-orange-600">
        हाल सम्मको योजनको जानकारी
      </h1>
      <div>
        <table className="min-w-80 border-collapse overflow-hidden rounded-lg border shadow-lg">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="px-3 py-2 text-left">योजना</th>
              <th className="px-3 py-2 text-left">क्रम संख्या</th>
            </tr>
          </thead>
          <tbody>
            {paragraphs.map((text, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-200" : "bg-white"
                } hover:bg-blue-200`}
              >
                <td className="border border-gray-300 px-3 py-2 font-semibold">
                  {text}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {ConvertToNepaliNumerals(index.toString())}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
