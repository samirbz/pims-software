import React from "react"

export default function Home() {
  const paragraphs = [
    "दर्ता योजना",
    "सम्झौत योजना",
    "पेस्की निकास योजना",
    "रनीङ बिल निकास",
    "चालुमा आ.व सम्पन्न योजना",
  ]

  return (
    <div className="mt-8 flex w-full justify-center">
      <div className="px-4">
        <h1 className="form-title mb-4 text-xl font-bold ">
          हाल सम्मको योजनको जानकारी
        </h1>
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
                <td className="border border-gray-300 px-3 py-2">{index}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
