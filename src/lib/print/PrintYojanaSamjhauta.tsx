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
    <div style="display: flex; justify-content: space-between; align-items: center; line-height: 0.6; ">
      <div style="text-align: center;">
        <img src="${imageDataUrl}" alt="Logo" style="width: 115px; height: 95px;" />
      </div>
      <div style="text-align: center;">
        <p style="font-size:0.7rem; line-height: 0.6;">अनुसुची २</p>
        <p style="font-size:1rem; line-height: 0.6;">शुद्धोधन गाउँपालिका</p>
        <p style="font-size:0.8rem;line-height: 0.6;">गाउँ कार्यपालिकाको कार्यालय</p>
        <p style="font-size:0.8rem;line-height: 0.6;">मानपकडी, रुपन्देही</p>
        <p style="font-size:0.7rem;line-height: 0.6;">(योजना शाखा)</p>
        <p style="font-size:0.7rem;line-height: 0.6;">(योजना सम्झौता फाराम)</p>
        </div>
      <div style="text-align: center;">
        <p style="font-size:0.7rem;">लुम्बिनी प्रदेश नेपाल</p>
        <p style="font-size:0.7rem;">योजना कोड न.9 2080/81</p>
      </div>
    </div>

    <p style="line-height: 0.6; font-size:0.7rem; margin-bottom:2px;">आ.व./कार्यक्रम २०८०/८१ anudan kisim lagat srot,</p>

    <table style="width: 100%; border: 1px solid black; border-collapse: collapse;">
      <tr>
        <td style="border: 1px solid black; width: 50%; font-size:0.7rem;">१.सम्झौता गर्ने पक्ष र आयोजना</td>
        <td style="border: 1px solid black; width: 50%; font-size:0.7rem;">ख.आयोजनाको विवरण</td>
      </tr>
      <tr>
        <td style="border: 1px solid black; width: 50%; font-size:0.7rem;">
          <p style="font-size:0.7rem;line-height: 0.6;">क.सम्झौता गर्ने संस्था र प्रतिनिधिको विवरण</p>
          <p style="font-size:0.7rem;line-height: 0.6;">१.संस्थाको:-  </p>
          <p style="font-size:0.7rem;line-height: 0.6;">२ नामः-  </p>
          <p style="font-size:0.7rem;line-height: 0.6;">३.पदः-  </p>
          <p style="font-size:0.7rem;line-height: 0.6;">४.ठेगानाः- </p>
        </td>
        <td style="border: 1px solid black; width: 50%; font-size:0.6rem; padding-top:8px;padding-bottom:8px;">
          <p style="line-height: 0.6;">१.नामः-</p>
          <p style="line-height: 0.6;">२.योजनाको:-</p>
          <p style="line-height: 0.6;">३.उद्धेश्य:-</p>
          <p style="line-height: 0.6;">४.आयोजना स्वीकृत गर्ने निकाय:-</p>
          <p style="line-height: 0.6;">५.आयोजनाको सुरु हुने:-</p>
          <p style="line-height: 0.6;">६.उपलब्धि:-</p>
        </td>
      </tr>
      <tr>
        <td style="border: 1px solid black; width: 50%; border-right:none; font-size:0.7rem;" >२.आयोजनाको लागत सम्बन्धी विवरण</td>
      </tr>
      <tr>
        <td style="border: 1px solid black; border-right:none; width: 50%; font-size:0.7rem; padding-top:8px;padding-bottom:8px;">
          <p style="font-size:0.7rem;line-height: 0.6;">क.लागत अनुमान रु.:-</p>
          <p style="font-size:0.7rem;line-height: 0.6;">ख.लागत व्यर्होने स्रोतहरु:-</p>
          <p style="font-size:0.7rem;line-height: 0.6;">budget karyakram 3:-</p>
          <p style="font-size:0.7rem;line-height: 0.6;">कन्टेन्जेन्सी कट्टी रकम रु:-</p>
          <p style="font-size:0.7rem;line-height: 0.6;">मर्मत सम्भार कट्टी रकम रु.:-</p>
          <p style="font-size:0.7rem;line-height: 0.6;">वातावरण कोष:-</p>
          <p style="font-size:0.7rem;line-height: 0.6;">उपभोक्ता समितिबाट जनश्रमदान रु.:-</p>
        </td>
        <td style="border: 1px solid black; width: 50%; font-size:0.7rem; border-left:none;">
          <p style="font-size:0.7rem;line-height: 0.6;">3,000.00</p>
          <p style="font-size:0.7rem;line-height: 0.6;">1000.00</p>
          <p style="font-size:0.7rem;line-height: 0.6;">0.00</p>
          <p style="font-size:0.7rem;line-height: 0.6;">90.00</p>
          <p style="font-size:0.7rem;line-height: 0.6;">90.00</p>
          <p style="font-size:0.7rem;line-height: 0.6;">90.00</p>
          <p style="font-size:0.7rem;line-height: 0.6;">180.00</p>
        </td>
      </tr>
       <tr>
        <td style="border: 1px solid black; width: 50%; border-right:none; border-right:none; font-size:0.7rem;">उपभोक्ता समितिले खुद पाउने जम्मा रु.</td>
        <td style="border: 1px solid black; width: 50%; border-right:none; border-left:none; font-size:0.7rem;">2730.00 ( दुई हजार सात सय तीस रूपैया मात्र ।)</td>
      </tr>
    </table>

<table style="width: 100%; border: 1px solid black; border-top: none; border-collapse: collapse;">
  <tr>
    <td style="border: 1px solid black; width: 40%; font-size: 0.7rem; border-top: none; ">ग) बस्तुगत अनुदानको विवरण</td>
    <td style="border: 1px solid black; width: 15%; font-size: 0.7rem; border-top: none;">सामाग्रीको नाम</td>
    <td style="border: 1px solid black; width: 15%; font-size: 0.7rem; border-top: none;">परिमाण</td>
    <td style="border: 1px solid black; width: 15%; font-size: 0.7rem; border-top: none;">एकाई</td>
    <td style="border: 1px solid black; width: 15%; font-size: 0.7rem; border-top: none;">श्रम रु.</td>
  </tr>
  <tr> 
    <td style="border: 1px solid black; font-size: 0.7rem;padding-top:8px;padding-bottom:8px;"> 
      <p style="font-size: 0.7rem;line-height: 0.6;">संघबाट</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">प्रदेशबाट</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">३.गाउँपालिकाबाट</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">उपवोक्ता समितिबाट</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">गैर सहकारी संघ सस्थाबाट</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">अन्य निकायबाट</p>
    </td>
    <td style="border: 1px solid black; font-size: 0.7rem; text-align:center;">
      <p style="font-size: 0.7rem;line-height: 0.6;">-</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">-</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">-</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">-</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">-</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">-</p>
    </td> 
    <td style="border: 1px solid black; font-size: 0.7rem; text-align:center;">
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
    </td>
    <td style="border: 1px solid black; font-size: 0.7rem; text-align:center;">
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
    </td>
    <td style="border: 1px solid black; font-size: 0.7rem; text-align:center;">
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
    </td>
  </tr>
</table>

<table style="width: 100%; border: 1px solid black; border-top: none; border-collapse: collapse;">
  <tr>
        <td style="border: 1px solid black; width: 50%; border-right:none; border-top:none; font-size:0.7rem;" >घ.आयोजनाबाट लाभान्वित हुने</td>
      </tr>
      <tr>
        <td style="border: 1px solid black; border-right:none; width: 50%; font-size:0.7rem;padding-top:8px;padding-bottom:8px;">
          <p style="font-size:0.7rem;line-height: 0.6;">१.घरपरिवार संख्या:-</p>
          <p style="font-size:0.7rem;line-height: 0.6;">२.जनसंख्या:-</p>
        </td>
        <td style="border: 1px solid black; width: 50%; font-size:0.7rem; border-left:none;">
          <p style="font-size:0.7rem;line-height: 0.6;">३.समुदाय मिश्रित</p>
          <p style="font-size:0.7rem;line-height: 0.6;">४.अन्य</p>
        </td>
      </tr>
</table>

<table style="width: 100%; border: 1px solid black; border-top: none; border-collapse: collapse;">
  <tr>
        <td style="border: 1px solid black; width: 50%; border-right:none; border-top:none; font-size:0.7rem;" >३.उपभोक्ता समितिरसमुदायमा आधारित संस्था/गैरसरकारी संस्थाको विवरण</td>
      </tr>
      <tr>
        <td style="border: 1px solid black; border-right:none; width: 50%; font-size:0.7rem; padding-top:8px;padding-bottom:8px; ">
          <p style="font-size:0.7rem;line-height: 0.6;"">क. गठन भएको मिति:-</p>
          <p style="font-size:0.7rem;line-height: 0.6;"">ख.उपभोक्ता समिति वा गैरसरकारी संस्था समुदायमा आधारित संस्थाका पदाधिकारीको नामावली:-</p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); font-size: 0.7rem; margin:-12px; margin-left:4px;">
          <div>
            <p style="font-size:0.7rem;line-height: 0.6;">१.अध्यक्ष:-</p>
            <p style="font-size:0.7rem;line-height: 0.6;">२.उपाध्यक्ष:-</p>
            <p style="font-size:0.7rem;line-height: 0.6;">३.सचिव:-</p>
            <p style="font-size:0.7rem;line-height: 0.6;">४.कोषाध्यक्ष:-</p>
          </div>
          <div>
            <p style="font-size:0.7rem;line-height: 0.6;">५.सदस्य:-</p>
            <p style="font-size:0.7rem;line-height: 0.6;">६.सदस्य:-</p>
            <p style="font-size:0.7rem;line-height: 0.6;">७.सदस्य:-</p>
            <p style="font-size:0.7rem;line-height: 0.6;">८.सदस्य:-</p>
          </div>
          <div>
            <p style="font-size:0.7rem;line-height: 0.6;">९.सदस्य:-</p>
            <p style="font-size:0.7rem;line-height: 0.6;">१०.सदस्य:-</p>
            <p style="font-size:0.7rem;line-height: 0.6;">११.सदस्य:-</p>
          </div>
        <div>
        </td>
      </tr>
</table>

<table style="width: 100%; border: 1px solid black; border-top: none; border-collapse: collapse;">
 <tr>
        <td style="border: 1px solid black; border-right:none;border-top:none; font-size:0.7rem;">
        <span style="padding-right:8px;">ग.गठन गर्दा उपस्थित लाभान्वितको:-</span>
        <span style="">0</span>
        </td>
       
        <td style="border: 1px solid black;  border-right:none; border-left:none;border-top:none; font-size:0.7rem;">
         <span style="padding-right:8px;">समितिमा जम्मा सदस्य:-</span>
         <span style="">0</span>
        </td>
        <td style="border: 1px solid black; border-right:none; border-left:none;border-top:none; font-size:0.7rem;">
        <span style="padding-right:8px;">महिला सदस्य संख्या:-</span>
        <span style="">0</span>
        </td>
      </tr>
</table>
<table style="width: 100%; border: 1px solid black; border-top: none; border-collapse: collapse;">
 <tr>
        <td style="border: 1px solid black; border-right:none;border-top:none; font-size:0.7rem;">
        <span>४.आयोजना संचालन सम्बन्धी अनुभव:-</span>
        <span></span>
        </td>
      </tr>
</table>

<table style="width: 100%; border: 1px solid black; border-top: none; border-collapse: collapse;">
  <tr>
    <td style="border-bottom: 1px solid black; width: 20%; font-size: 0.7rem; border-top: none; ">किस्ता क्रम</td>
    <td style="border-bottom: 1px solid black; width: 15%; font-size: 0.7rem; border-top: none;">किस्ता रकम</td>
    <td style="border-bottom: 1px solid black; width: 15%; font-size: 0.7rem; border-top: none;">किस्ता मिति</td>
    <td style="border-bottom: 1px solid black; width: 50%; font-size: 0.7rem; border-top: none;">कैफियत</td>
  </tr>
  <tr> 
    <td style=" font-size: 0.7rem;padding-top:8px;padding-bottom:8px;"> 
      <p style="font-size: 0.7rem;line-height: 0.6;">पहिलो किस्ता</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">दोश्रो किस्ता</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">तेश्रो किस्ता</p>
    </td>
    <td style="font-size: 0.7rem;">
      <p style="font-size: 0.7rem;line-height: 0.6;">०.००</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">०.००</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">२७३०००००००.००</p>
    
    </td> 
    <td style="font-size: 0.7rem; ">
      <p style="font-size: 0.7rem;line-height: 0.6;">२०८१/०६/२४ </p>
      <p style="font-size: 0.7rem;line-height: 0.6;">२०८१/०६/२४ </p>
      <p style="font-size: 0.7rem;line-height: 0.6;">२०८१/०६/२४ </p>
    </td>
    <td style="font-size: 0.7rem;">
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">0</p>
      <p style="font-size: 0.7rem;line-height: 0.6;">काम सम्पन्न भए पछि भु्क्तानी दिईने छ ।</p>
    </td>
  </tr>
</table>

<table style="width: 100%; border: 1px solid black; border-top: none; border-collapse: collapse;">
 <td style="font-size: 0.7rem;display:flex;">
      <p style="font-size: 0.7rem;line-height: 0.6;font-weight:bold;width:47%;">जम्मा रु </p>
      <p style="font-size: 0.7rem;line-height: 0.6;font-weight:bold;">२७३०.००</p>
    </td>
</table>

<div style="display: flex;">
<p style="width:60%;font-size: 0.7rem;">उपभोक्ता समितिको तर्फबाट:- text</p>
<p style="font-size: 0.7rem;">कार्यालयको तर्फबाटः- text</p>
</div>

<br/>
<br/>

<table style="width: 100%; border: 1px solid black; border-top: none; border-collapse: collapse;">
      <tr>
        <td style="border: 1px solid black;width:30%; border-right:none; font-size:0.7rem;" >६.आयोजना मर्मत संभार सम्बन्धी व्यवस्था</td>
        <td style="border: 1px solid black; border-left:none; font-size:0.7rem;" ></td>
      </tr>
      <tr>
        <td style="border: 1px solid black; border-right:none;font-size:0.7rem; padding-top:8px;padding-bottom:8px;">
          <p style="font-size:0.7rem;line-height: 0.6;">क.आयोजना मर्मत सम्भारको जिम्मा लिने:-</p>
          <p style="font-size:0.7rem;line-height: 0.6;">ख.मर्मत संभारको सम्भावित श्रोत:-</p>
          <p style="font-size:0.7rem;line-height: 0.6;">जनश्रमदान श्रमशक्ति संख्या:-</p>
          <p style="font-size:0.7rem;line-height: 0.6;">शुल्कबाट रु.:-</p>
          <p style="font-size:0.7rem;line-height: 0.6;">दस्तुरबाट रु.:-</p>
          <p style="font-size:0.7rem;line-height: 0.6;">अन्य रु.:-</p>
        </td>
        <td style="border: 1px solid black; font-size:0.7rem; border-left:none;">
          <p style="font-size:0.7rem;line-height: 0.6;">yojana ko naam second उपभोक्ता समिति</p>
          <p style="font-size:0.7rem;line-height: 0.6;">0.00</p>
          <p style="font-size:0.7rem;line-height: 0.6;">0.00</p>
          <p style="font-size:0.7rem;line-height: 0.6;">0.00</p>
          <p style="font-size:0.7rem;line-height: 0.6;">0.00</p>
          <p style="font-size:0.7rem;line-height: 0.6;">0.00</p>
        </td>
      </tr>
</table>
<table style="width: 100%; border: 1px solid black; border-top: none; border-collapse: collapse;">
      <tr>
        <td style="border: 1px solid black; border-right:none; font-size:0.7rem;text-align:center;" >सम्झौताका शर्तहरु</td>
      </tr>
      <tr>
        <td style="border: 1px solid black; border-right:none; font-size:0.7rem;" >उपभोक्ता समिति तथा कार्यालयको जिम्मेवारी तथा पालना गरिने शर्तहरु</td>
      </tr>
      <tr>
      <td style="border: 1px solid black; border-right:none; font-size:0.7rem;" >
      <div style="display:flex; flex-direction:column">
      <span>१.आयोजना/कार्यक्रम मिति .....देखि शुरु गरी मिति ..... सम्ममा पुरा गर्नुपर्ने छ । तोकिएको अवधिमा कार्य सम्पन्न गर्न नसकेको अवस्थामा म्याद समाप्त हुनु भन्दा अगाडी म्याद थपका लागि कार्यालयमा निवेदन दिनु पर्नेछ ।</span>
      <span>२.प्राप्त रकम तथा निर्माण सामाग्री सम्बन्धित आयोजनाको उद्धेश्यको लागि मात्र प्रयोग गर्नुपर्नेछ ।</span>
      <span>३.नगदी,जिन्सी सामानको प्राप्ती,खर्च बाँकी तथा आयोजनाको प्रगति विवरण राख्नुपर्नेछ ।</span>
      <span>३.नगदी,जिन्सी सामानको प्राप्ती,खर्च बाँकी तथा आयोजनाको प्रगति विवरण राख्नुपर्नेछ ।</span>
      <span>४.योजनाको कुल लागत भन्दा घटी लागतमा आयोजना सम्पन्न भएको अवस्थामा सो मुताविक नै अनुदान र श्रमदानको प्रतिशत निर्धारण गरी भुक्तानी गरिने छ ।</span>
      <span>५.उपभोक्ता समितिले प्राविधिकको राय,परामर्श एवम् निर्देशन बमोजिम काम गर्नुपर्नेछ ।</span>
      <span>६.उपभोक्ता समितिले आयोजनासँग सम्बन्धित विल,भर्पाइहरु,डोर हाजिरी फारामहरु,जिन्सी नगदी खाताहरु,समिति/समूहको निर्णय पुस्तिका आदी कागजातहरु कार्यालयले मागेको बखत उपलब्ध गराउनु पर्नेछ ।</span>
      <span>७.कुनै सामाग्री खरिद गर्दा आन्तरिक राजस्व कार्यालयबाट स्थायी लेखा नम्बर र मुल्य अभिवृद्धी कर दर्ता प्रमाण पत्र प्राप्त व्यक्ति, फर्म वा कम्पनीबाट खरिद गरी सोही अनुसारका विल भर्पाइ आधिकारिक व्यक्तिबाट प्रमाणि गराई पेश गर्नुपर्नेछ ।</span>
      <span>८.मुल्य अभिवृद्धी कर लाग्ने वस्तु तथा सेवा खरिद गर्दा रु.२००००/- भन्दा बढी मूल्यको सामाग्रीमा अनिवार्य रुपमा मुल्य अभिवृद्धी कर दर्ता प्रमाण पत्र व्यक्ति, फर्म वा कम्पनीबाट खरिद गर्नुपर्नेछ । साथै उक्त विलमा उल्लेखित मू.अ.कर बाहेकको रकममा १.५% अग्रिम आयकर वापत करकट्टी गरी बाँकी रकम मात्र सम्बन्धित सेवा प्रदायकलाई भुक्तानी हुनेछ । रु.२००००/- भन्दा कम मूल्यको सामाग्री खरिदमा पान नम्बर लिएको व्यक्ति वा फर्मबाट खरिद गर्नुपर्नेछ । अन्यथा खरिद गर्ने पदाधिकारी स्वयं जिम्मेवारी हुनेछ ।</span>
      <span>९.निर्माणको क्रममा हेभी इक्वीपमेन्ट प्रयोग गर्नुपर्ने भएमा नगरपालिकाको कार्यालयमा सूचीकृत हेभी इक्वीपमेन्ट प्रयोग गर्नुपर्नेछ । भुक्तानी लिन आउँदा स्वीकृत सूचीकृत भएको हेभी इक्वीपमेन्टको अनुमति पत्र पेश गर्नुपर्नेछ ।</span>
      <span>१०.निर्माण कार्यको हकमा शुरु लागत अनुमानका कुनै आइटमहरुमा परिवर्तन हुने भएमा अधिकार प्राप्त व्यक्ति-कार्यालयबाट लागत अनुमान संशोधन गरे पश्चात मात्र कार्य गराउनु पर्नेछ । यसरी लागत अनुमान संशोधन नगरी कार्य गरेमा उपभोक्ता समिति/समूह नै जिम्मेवार हुनेछ ।</span>
      <span>११.आयोजनाको आवश्यक मर्मत संभारको व्यवस्था सम्बन्धित उपभोक्ताहरुले नै गर्नु पर्नेछ ।</span>
      <span>१०.निर्माण कार्यको हकमा शुरु लागत अनुमानका कुनै आइटमहरुमा परिवर्तन हुने भएमा अधिकार प्राप्त व्यक्ति-कार्यालयबाट लागत अनुमान संशोधन गरे पश्चात मात्र कार्य गराउनु पर्नेछ । यसरी लागत अनुमान संशोधन नगरी कार्य गरेमा उपभोक्ता समिति/समूह नै जिम्मेवार हुनेछ ।</span>
      <span>१२.आयोजनाको सबै काम उपभोक्ता समिति/समुहको निर्णय अनुसार गर्नु गराउनु पर्नेछ ।</span>
      <span>१३.रु. ३ लाख वा सो भन्दा माथिको आयोजनामा आयोजना सम्बन्धी विवरण समेटिएको सूचना पाटी योजना स्थलमा राख्नु पर्नेछ ।</span>
      <span>१४.आयोजनाको प्राविधिक सुपरिवेक्षणको लागि कार्यालयको तर्फबाट प्राविधिक खटाइनेछ । उपभोक्ता समितिबाट भएका कामको नियमित सुपरिवेक्षण गर्ने जिम्मेवारी निज प्राविधिकको हुनेछ ।</span>
      <span>१५.श्रममूलक प्रविधिबाट कार्य गराउने गरी लागत अनुमान स्वीकृत गराई सोही बमोजिम सम्झौता गरी मेशीनरी उपकरणको प्रयोगबाट कार्य गरेको पाइएमा त्यस्तो उपभोक्ता समितिसँग सम्झौता रद्ध गरी उपभोक्ता समितिलाई भुक्तानी गरिएको रकम मूल्यांकन गरी बढी भएको रकम सरकारी बाँकी सरह असूलउपर गरिनेछ । साथै उपभोक्ता समिति मार्फत सम्झौता भएको आयोजना समितिले ठेक्का मार्फत गराएको बुझिएमा रकम भुक्तानी हुने छैन ।</span>
      <span>१६.सम्झौता बमोजिम आयोजना सम्पन्न भए पछि अन्तिम भुक्तानीको लागि कार्यसम्पन्न प्रतिवेदन, नापी किताब, प्रमाणित विल भरपाई, योजनाको मुख्य फोटोहरु, रु ३ लाख वा सो भन्दा माथिका आयोजनामा सुचना पाटी राखेको फोटो, सम्बन्धित उपभोक्ता समितिले आयोजना सञ्चालन गर्दा भएको आय व्ययको अनुमोदन सहित कार्य सम्पन्न भएको निर्णय प्रतिलिपी, उपभोक्ता भेलाबाट सार्वजनिक लेखा परिवेरक्षणको प्रतिलिपी अनुसूची-३, अनुसूची-४ बमोजिम खर्च सार्वजानिक गरेको समितिको निर्णय, अनुसूची ६ बमोजिमको कार्यक्रमको भौतिक तथा वित्तिय प्रतिवेदन, अनुगमन समितिको कार्य सम्पन्न भएको निर्णय प्रतिलिपी तथा सम्बन्धित वडा कार्यालयको सिफारिस सहित अन्तिम किस्ता भुक्तानीको लागि निवेदन पेश गर्नु पर्नेछ ।</span>
      <span>१७.आवश्यक कागजात संलग्न गरी भुक्तानी उपलब्ध गराउन सम्बन्धित उपभोक्ता समितिबाट अनुरोध भई आएमा उपभोक्ता समितिको बैंक खातामा भुक्तानी दिईनेछ ।</span>
      <span>१८.यसमा उल्लेख नभएका कुराहरु प्रचलित कानुन बमोजिम हुनेछ ।</span>
      <span style="font-weight:bold;">अन्य शर्तहरु </span>
      <span>१</span>
      <span>२</span>
      </div>
        </td>
      </tr>
      </table>

<div style="display:flex; font-size:0.7rem;">
<div style="display:flex;flex-direction:column;width:33.33%;">
<span>उपर्युक्त बमोजिम गर्न हामी मन्जुर छौ ।<br/>
उपभोक्ता समितिको तर्फबाट
</span>
<br/>
<span>दस्तखतः-</span>
<span>नाम:-</span>
<span>पद अध्यक्ष:-</span>
<span>फोन न.:-</span>
<br/>
<span>दस्तखतः-</span>
<span>नामः-</span>
<span>पदः-</span>
<span>मितिः-</span>
</div>
<div style="display:flex;flex-direction:column;width:33.33%;">
<br/>
<span>योजना शाखाको तर्फबाट</span>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<span>दस्तखतः-</span>
<span>नामः-</span>
<span>पदः-</span>
<span>मितिः-</span>
</div>
<div style="display:flex;flex-direction:column;">
<br/>
<span>गाउँपालिकाको तर्फबाट</span>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<span>दस्तखतः-</span>
<span>नामः-</span>
<span>पदः-</span>
<span>मितिः-२०८१/०६/२४ </span>
</div>
</div>
  `

  // Open print window for the generated content
  openPrintWindow(htmlContent)
}

export default printContent
