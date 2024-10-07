const openPrintWindow = (htmlContent: string) => {
  const printWindow = window.open(
    "",
    "PRINT",
    "height=650,width=900,top=100,left=150"
  )

  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `)

    printWindow.document.close()

    // Wait for the image to load before printing
    const image = printWindow.document.querySelector("img")

    if (image) {
      image.onload = () => {
        printWindow.focus()
        printWindow.print()
        printWindow.close()
      }
    } else {
      // Fallback if no image is present
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    }
  }
}

const printContent = async (yojanaKoNaam: any) => {
  const imagePath = "/images/gov-logo.png"
  const blob = await fetch(imagePath).then((r) => r.blob())

  // Convert Blob to ArrayBuffer, and then to Uint8Array
  const arrayBuffer = await blob.arrayBuffer()
  const uint8Array = new Uint8Array(arrayBuffer)

  // Convert Uint8Array to Base64 string
  const base64String = btoa(
    uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), "")
  )

  // Construct a Data URL for the image
  const imageDataUrl = `data:image/png;base64,${base64String}`

  // Sample HTML content to print
  const htmlContent = `
    <div style="text-align: center;">
      <img src="${imageDataUrl}" alt="Logo" style="width: 115px; height: 95px;" />
      <p style="font-size:1.5rem;">शुद्धोधन गाउँपालिका</p>
      <p style="font-size:1.5rem;">गाउँ कार्यपालिकाको कार्यालय</p>
      <p style="font-size:1.3rem;">मानपकडी, रुपन्देही</p>
      <p style="font-size:1.3rem;">लुम्बिनी प्रदेश नेपाल</p>
      <p style="margin: 0; text-align: right;">मितिः 2081/6/12</p>
      <p style="margin: 0; text-align: center; flex: 1;">विषयः-योजना/कार्यक्रमको सम्झौता सम्बन्धमा ।</p>
      <h2><u style="text-underline-offset: 8px;">टिप्पणी र आदेश</u></h2>
    </div>
    <div style="margin-top: 20px;">
      <p>श्रीमान,</p>
      <p>&nbsp; &nbsp;&nbsp; &nbsp;  चालु आ.ब. 2080/81 को लागि yojana chanot nikaya बाट स्वीकृत बार्षिक योजना तथा कार्यक्रम अन्तर्गत mukhya samiti तर्फको सि.नं. 32 मा ${yojanaKoNaam} वडा नं. 8 का लागि budget karyakram 3 रु.1000.00  रु.2000.00 गरि जम्मा रु.3000.00   विनियोजन भएको छ ।</p>
      <p>&nbsp; &nbsp;&nbsp; &nbsp;  उक्त योजना कार्यान्वयनको लागि योजना बाट सदस्य लगायत उपभोक्ताहरुको बैठक योजना स्थलगत जनप्रतिनिधि/कर्मचारीको उपस्थितिमा मिति २०८१/६/१० मा जनताको उपभोक्ता समितिका अध्यक्ष/सचिव/कोषाध्यक्ष पदमा १ जना महिला सहित ०.०० प्रतिशत महिला सदस्यको भएको जनताको उपभोक्ता समितिको गठन भएको देखिन्छ ।
      <p>&nbsp; &nbsp;&nbsp; &nbsp;  हाल सम्झौताको लागि 8 नं वडा कार्यालयको सिफारिस पत्र, उपभोक्ता भेलाको उपस्थिति र निर्णय, उपभोक्ता समितिको बैठकको निर्णयको प्रतिलिपिहरु र समितिका सबै सदस्यहरुको नागरीकता प्रमाण पत्रको प्रतिलिपिहरु संलग्न राखि सम्झौताको लागि उपभोक्ता समितिबाट मिति 2081/6/12 गते निवेदन प्राप्त भएको छ ।</p>
      <p>&nbsp; &nbsp;&nbsp; &nbsp;  सो योजनाको लागि प्राविधिक शाखाबाट कन्टेन्जेन्सी र जनश्रमदान सहित रु. 3,000.00 को लागत अनुमान संग्लन भई पेश हुन आएकोले, लागत अनुमान अनुसारको कार्य सो योजनामा स्वीकृत बजेटबाट सम्पन्न गर्ने गरी उक्त योजना कार्यान्वयनको लागि गठित उपभोक्ता समितिसँग सम्झौता गरी कार्यादेश दिन निर्णयार्थ पेश गरेको छु ।</p>
     <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 80px;">
  <div style="text-align: center;">
    <p style="margin: 0; border-top: 1px solid black; width: 120px; padding-top: 10px;">तयार गर्ने</p>
  </div>
  <div style="text-align: center;">
    <p style="margin: 0; border-top: 1px solid black; width: 120px; padding-top: 10px;">पेश गर्ने</p>
  </div>
  <div style="text-align: center;">
    <p style="margin: 0; border-top: 1px solid black; width: 120px; padding-top: 10px;">सदर गर्ने</p>
  </div>
</div>

</div>


    </div>
  `

  // Open print window for the generated content
  openPrintWindow(htmlContent)
}

export default printContent
