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
    <div className="flex h-[85vh] flex-col">
      <div
        className="grow bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/lumbini1.jpg")' }}
      >
        <div className="mt-16 flex justify-center ">
          <table className=" border">
            <div className=" bg-transparent  px-4 py-2 text-xl font-bold text-black  shadow-glow ">
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
      </div>
    </div>
  )
}
