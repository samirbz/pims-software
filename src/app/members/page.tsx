import React from "react"

export default function Home() {
  const paragraphs = [
    "दर्ता योजना:-",
    "सम्झौत योजना:-",
    "पेस्की निकास योजना:-",
    "रनीङ बिल निकास:-",
    "चालुमा आ.व सम्पन्न योजना:-",
  ]

  const getRandomNumber = () => Math.floor(Math.random() * 10) + 1

  return (
    <div className="mt-16 flex w-full justify-center">
      <table className="border">
        <div className="bg-gray-100 px-4 py-2">
          <p className="p-2 font-semibold underline">
            हाल सम्मको योजनको जानकारी
          </p>
          {paragraphs.map((text, index) => (
            <tr key={index}>
              <td className=" ">{text}</td>
              <td className="p-2">{getRandomNumber()}</td>
            </tr>
          ))}
        </div>
      </table>
    </div>
  )
}
