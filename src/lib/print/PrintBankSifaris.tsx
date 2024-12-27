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
            <style>
              @media print {
                body {
                  margin: 0;
                  padding: 0;
                }
                header, footer {
                  display: none !important;
                }
              }
            </style>
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
  
  const printContent = async (data: any) => {
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
  <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
    <div style="text-align: center;">
      <img src="${imageDataUrl}" alt="Logo" style="width: 115px; height: 95px;" />
    </div>
    <div style="text-align: center; margin-right:40%;">
      <p style="font-size: 1rem; line-height: 0.6;">शुद्धोधन गाउँपालिका</p>
      <p style="font-size: 0.8rem; line-height: 0.6;">गाउँ कार्यपालिकाको कार्यालय</p>
      <p style="font-size: 0.8rem; line-height: 0.6;">मानपकडी, रुपन्देही</p>
      <p style="font-size: 0.8rem; line-height: 0.6;">लुम्बिनी प्रदेश नेपाल</p>
    </div>
  </div>
  
    <p style="margin: 0; text-align: right;font-size: 0.8rem;">मितिः २०८१/०६/२४</p>
    <h3 style="margin: 0; text-align: center; font-size: 1rem;">विषयः-योजना/कार्यक्रमको सम्झौता सम्बन्धमा ।</h3>
    <h3 style=" text-align:center;"><u style="text-underline-offset: 8px;">टिप्पणी र आदेश</u></h3>
     
      <div style="margin-top: 20px;">
        <p style="font-size: 0.8rem;">श्रीमान, ${data.yojanakoNaam}</p>
      
       <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 80px;">
    <div style="text-align: center;">
      <p style="margin: 0; border-top: 1px solid black; width: 120px; padding-top: 10px; font-size: 0.8rem;">तयार गर्ने</p>
    </div>
    <div style="text-align: center;">
      <p style="margin: 0; border-top: 1px solid black; width: 120px; padding-top: 10px; font-size: 0.8rem;">पेश गर्ने</p>
    </div>
    <div style="text-align: center;">
      <p style="margin: 0; border-top: 1px solid black; width: 120px; padding-top: 10px; font-size: 0.8rem;">सदर गर्ने</p>
    </div>
  </div>
  
  </div>
  
  
      </div>
    `
  
    // Open print window for the generated content
    openPrintWindow(htmlContent)
  }
  
  export default printContent
  