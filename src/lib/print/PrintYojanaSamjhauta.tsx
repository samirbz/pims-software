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
    <div style="display: flex; justify-content: space-between; align-items: center; line-height: 0.6;">
      <div style="text-align: center;">
        <img src="${imageDataUrl}" alt="Logo" style="width: 115px; height: 95px;" />
      </div>
      <div style="text-align: center;">
        <p style="font-size:0.8rem; line-height: 0.6;">अनुसुची २</p>
        <p style="font-size:1rem; line-height: 0.6;">शुद्धोधन गाउँपालिका</p>
        <p style="font-size:0.8rem;line-height: 0.6;">गाउँ कार्यपालिकाको कार्यालय</p>
        <p style="font-size:0.8rem;line-height: 0.6;">मानपकडी, रुपन्देही</p>
        <p style="font-size:0.8rem;line-height: 0.6;">(योजना शाखा)</p>
        <p style="font-size:0.8rem;line-height: 0.6;">(योजना सम्झौता फाराम)</p>
        </div>
      <div style="text-align: center;">
        <p style="font-size:0.8rem;">लुम्बिनी प्रदेश नेपाल</p>
        <p style="font-size:0.8rem;">योजना कोड न.9 2080/81</p>
      </div>
    </div>

    <p style="line-height: 0.6;">आ.व./कार्यक्रम २०८०/८१ anudan kisim lagat srot,</p>

    <table style="width: 100%; border: 1px solid black; border-collapse: collapse; ">
      <tr>
        <td style="border: 1px solid black; width: 50%; font-size:0.8rem;">१.सम्झौता गर्ने पक्ष र आयोजना</td>
        <td style="border: 1px solid black; width: 50%; font-size:0.8rem;">ख.आयोजनाको विवरण</td>
      </tr>
      <tr>
        <td style="border: 1px solid black; width: 50%; font-size:0.8rem;">
          <p style="font-size:0.8rem;">क.सम्झौता गर्ने संस्था र प्रतिनिधिको विवरण</p>
          <p style="font-size:0.8rem;">१.संस्थाको:-  </p>
          <p style="font-size:0.8rem;">२ नामः-  </p>
          <p style="font-size:0.8rem;">३.पदः-  </p>
          <p style="font-size:0.8rem;">४.ठेगानाः- </p>
        </td>
        <td style="border: 1px solid black; width: 50%; font-size:0.8rem;">
          <p style="font-size:0.8rem;">१.नामः-</p>
          <p style="font-size:0.8rem;">२.योजनाको:-</p>
          <p style="font-size:0.8rem;">३.उद्धेश्य:-</p>
          <p style="font-size:0.8rem;">४.आयोजना स्वीकृत गर्ने निकाय:-</p>
          <p style="font-size:0.8rem;">५.आयोजनाको सुरु हुने:-</p>
          <p style="font-size:0.8rem;">६.उपलब्धि:-</p>
        </td>
      </tr>
      <tr>
        <td style="border: 1px solid black; width: 50%; border-right:none; font-size:0.8rem;" >२.आयोजनाको लागत सम्बन्धी विवरण</td>
      </tr>
      <tr>
        <td style="border: 1px solid black; border-right:none; width: 50%; font-size:0.8rem;">
          <p style="font-size:0.8rem;">क.लागत अनुमान रु.:-</p>
          <p style="font-size:0.8rem;">ख.लागत व्यर्होने स्रोतहरु:-</p>
          <p style="font-size:0.8rem;">budget karyakram 3:-</p>
          <p style="font-size:0.8rem;">कन्टेन्जेन्सी कट्टी रकम रु:-</p>
          <p style="font-size:0.8rem;">मर्मत सम्भार कट्टी रकम रु.:-</p>
          <p style="font-size:0.8rem;">वातावरण कोष:-</p>
          <p style="font-size:0.8rem;">उपभोक्ता समितिबाट जनश्रमदान रु.:-</p>
        </td>
        <td style="border: 1px solid black; width: 50%; font-size:0.8rem; border-left:none;">
          <p style="font-size:0.8rem;">3,000.00</p>
          <p style="font-size:0.8rem;">1000.00</p>
          <p style="font-size:0.8rem;">0.00</p>
          <p style="font-size:0.8rem;">90.00</p>
          <p style="font-size:0.8rem;">90.00</p>
          <p style="font-size:0.8rem;">90.00</p>
          <p style="font-size:0.8rem;">180.00</p>
        </td>
      </tr>
       <tr>
        <td style="border: 1px solid black; width: 50%; border-right:none; border-right:none; font-size:0.8rem;">उपभोक्ता समितिले खुद पाउने जम्मा रु.</td>
        <td style="border: 1px solid black; width: 50%; border-right:none; border-left:none; font-size:0.8rem;">2730.00 ( दुई हजार सात सय तीस रूपैया मात्र ।)</td>
      </tr>
    </table>

<table style="width: 100%; border: 1px solid black; border-top: none; border-collapse: collapse;">
  <tr>
    <td style="border: 1px solid black; width: 40%; font-size: 0.8rem; border-top: none;">ग) बस्तुगत अनुदानको विवरण</td>
    <td style="border: 1px solid black; width: 15%; font-size: 0.8rem; border-top: none;">सामाग्रीको नाम</td>
    <td style="border: 1px solid black; width: 15%; font-size: 0.8rem; border-top: none;">परिमाण</td>
    <td style="border: 1px solid black; width: 15%; font-size: 0.8rem; border-top: none;">एकाई</td>
    <td style="border: 1px solid black; width: 15%; font-size: 0.8rem; border-top: none;">श्रम रु.</td>
  </tr>
  <tr> <!-- This row is added -->
    <td style="border: 1px solid black; font-size: 0.8rem;"> 
      <p style="font-size: 0.8rem;">1.</p>
      <p style="font-size: 0.8rem;">2.</p>
      <p style="font-size: 0.8rem;">३. गाउँपालिकाबाट</p>
      <p style="font-size: 0.8rem;">4.</p>
      <p style="font-size: 0.8rem;">5.</p>
      <p style="font-size: 0.8rem;">6.</p>
    </td>
    <td style="border: 1px solid black; font-size: 0.8rem; text-align:center;">
      <p style="font-size: 0.8rem;">-</p>
      <p style="font-size: 0.8rem;">-</p>
      <p style="font-size: 0.8rem;">-</p>
      <p style="font-size: 0.8rem;">-</p>
      <p style="font-size: 0.8rem;">-</p>
      <p style="font-size: 0.8rem;">-</p>
    </td> 
    <td style="border: 1px solid black; font-size: 0.8rem; text-align:center;">
      <p style="font-size: 0.8rem;">0</p>
      <p style="font-size: 0.8rem;">0</p>
      <p style="font-size: 0.8rem;">0</p>
      <p style="font-size: 0.8rem;">0</p>
      <p style="font-size: 0.8rem;">0</p>
      <p style="font-size: 0.8rem;">0</p>
    </td>
    <td style="border: 1px solid black; font-size: 0.8rem; text-align:center;">
      <p style="font-size: 0.8rem;">0</p>
      <p style="font-size: 0.8rem;">0</p>
      <p style="font-size: 0.8rem;">0</p>
      <p style="font-size: 0.8rem;">0</p>
      <p style="font-size: 0.8rem;">0</p>
      <p style="font-size: 0.8rem;">0</p>
    </td>
    <td style="border: 1px solid black; font-size: 0.8rem; text-align:center;">
      <p style="font-size: 0.8rem;">0</p>
      <p style="font-size: 0.8rem;">0</p>
      <p style="font-size: 0.8rem;">0</p>
      <p style="font-size: 0.8rem;">0</p>
      <p style="font-size: 0.8rem;">0</p>
      <p style="font-size: 0.8rem;">0</p>
    </td>
  </tr>
</table>

  `

  // Open print window for the generated content
  openPrintWindow(htmlContent)
}

export default printContent
