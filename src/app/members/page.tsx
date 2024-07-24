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
    <div className="mt-8 flex flex-col items-center">
      <div className="flex w-full flex-col gap-4 px-4 sm:w-auto">
        <h1 className="form-title">हाल सम्मको योजनको जानकारी</h1>
        <div className="mb-2 max-h-[22rem] w-auto overflow-auto sm:mb-0">
          <table className="min-w-80 border-collapse border ">
            <tbody>
              {paragraphs.map((text, index) => (
                <tr key={index} className="border border-gray-300">
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
    </div>
  )
}
