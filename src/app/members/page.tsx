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
    <div className="mt-16 flex w-full flex-col items-center justify-center">
      <p className="p-2 font-semibold underline">हाल सम्मको योजनको जानकारी</p>
      <table>
        <tbody>
          {paragraphs.map((text, index) => (
            <tr key={index} className="border border-gray-300">
              <td className="border border-gray-300 px-3 py-2">{text}</td>
              <td className="border border-gray-300 px-3 py-2">{index}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
