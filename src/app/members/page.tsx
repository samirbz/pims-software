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
      <div className=" px-4 text-center">
        <h1 className="form-title mb-4">हाल सम्मको योजनको जानकारी</h1>
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
  )
}
