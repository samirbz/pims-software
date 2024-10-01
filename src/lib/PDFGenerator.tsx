import { saveAs } from "file-saver"
import {
  Document,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  WidthType,
  VerticalAlign,
  BorderStyle,
} from "docx"

const PDFGenerator = async () => {
  // Fetch the image from the public directory
  const imagePath = "/images/gov-logo.png"
  const blob = await fetch(imagePath).then((r) => r.blob())

  // Convert Blob to ArrayBuffer, and then to Uint8Array
  const arrayBuffer = await blob.arrayBuffer()
  const uint8Array = new Uint8Array(arrayBuffer)

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Table for left-side image and right-side text
          new Table({
            rows: [
              new TableRow({
                children: [
                  // Left side: Image
                  new TableCell({
                    borders: {
                      top: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      bottom: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      left: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      right: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                    },

                    children: [
                      new Paragraph({
                        children: [
                          new ImageRun({
                            data: uint8Array,
                            transformation: {
                              width: 110, // Adjust width and height to match the logo size
                              height: 90,
                            },
                          }),
                        ],
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                    width: { size: 15, type: WidthType.PERCENTAGE }, // Image column width
                  }),

                  // Right side: Heading and text
                  new TableCell({
                    borders: {
                      top: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      bottom: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      left: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      right: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                    },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "                          शुद्धोधन गाउँपालिका",
                            size: 32,
                          }),
                        ],
                        alignment: AlignmentType.LEFT,
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "                      गाउँ कार्यपालिकाको कार्यालय",
                            size: 32,
                          }),
                        ],
                        alignment: AlignmentType.LEFT,
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "                           मानपकडी, रुपन्देही",
                            size: 32,
                          }),
                        ],
                        alignment: AlignmentType.LEFT,
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "                         लुम्बिनी प्रदेश, नेपाल",
                            size: 32,
                          }),
                        ],
                        alignment: AlignmentType.LEFT,
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                    width: { size: 85, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
            ],
          }),

          // Spacing
          new Paragraph({
            children: [new TextRun(" ")],
          }),

          // Title Section
          new Paragraph({
            children: [
              new TextRun({
                text: "विषय: योजना/कार्यक्रमको सन्दर्भमा सम्झौता |",
                bold: true,
                size: 28,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "टिप्पणी र आदेश",
                bold: true,
                size: 40,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          // Table for Date and Reference Number
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "श्रीमान,",
                            size: 24,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "मिति: २०८१/६/१२",
                            size: 24,
                          }),
                        ],
                      }),
                    ],
                    width: {
                      size: 50,
                      type: WidthType.PERCENTAGE,
                    },
                  }),
                ],
              }),
            ],
          }),

          // Spacing
          new Paragraph({
            children: [new TextRun(" ")],
          }),

          // Main Paragraph with Bold and Regular Text
          new Paragraph({
            children: [
              new TextRun("चारू आ.व. २०८०/८१ को लागि "),
              new TextRun({
                text: "योजना छनोट निकाय",
                bold: true,
                highlight: "yellow",
              }),
              new TextRun(" बाट स्वीकृत वार्षिक योजना तथा कार्यक्रम अन्तर्गत "),
              new TextRun({
                text: "मुख्य समिति",
                bold: true,
                highlight: "yellow",
              }),
              new TextRun({
                text: " बैठकले सि.नं. २३ मा योजना को नाम second वडा नं. ६ का लागि ",
                bold: true,
                highlight: "yellow",
              }),
              new TextRun({
                text: "budget कार्यक्रम रु. १०००.०० रु. २०००.०० गरि जम्मा रु. ३०००.००",
                bold: true,
                highlight: "yellow",
              }),
              new TextRun(" विनियोजन भएको छ ।"),
            ],
          }),

          // Additional text from the image
          new Paragraph({
            children: [
              new TextRun({
                text: "उक्त योजना कार्यान्वयनको लागि योजना बाट सदस्य लगायत उपभोक्ताहरुको बैठक योजना स्थलगत जनप्रतिनिधि/कर्मचारीको उपस्थितिमा मिति २०८१/६/१० मा जनताको उपभोक्ता समितिका अध्यक्ष/सचिव/कोषाध्यक्ष पदमा १ जना महिला सहित ०.०० प्रतिशत महिला सदस्यको भएको जनताको उपभोक्ता समितिको गठन भएको देखिन्छ ।",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "सल्लाहकार २ जनाको योजनागत अनुगमन समिति समेत गठन भएको देखिन्छ। उक्त समितिको बैठकको निर्णयक प्रतिवेदन र समितिका सबै सदस्यहरुको नागरिकता प्रमाण पत्रको प्रतिलिपिहरुसंगै राजिनामा सहितको लागि उपभोक्ता समितिबाट मिति २०८१/६/१२ गते निवेदन प्राप्त भएको छ ।",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "उक्त योजनाको लागि आवश्यक शर्ताबाध्यताहरु सम्बन्धित र जिम्मेवार सहित रु. २,०००.०० को राजग सम्बन्धानुसार पेश भए बमोजिम प्रमाण सम्वन्धमा बिना निर्णय पेश गर्न रोकिएको छ ।",
              }),
            ],
          }),

          // Signature Area
          new Paragraph({
            children: [
              new TextRun("तयार गर्ने"),
              new TextRun("                पेश गर्ने"),
            ],
            alignment: AlignmentType.CENTER,
          }),

          // Footer text
          new Paragraph({
            children: [new TextRun("सदर गर्ने")],
            alignment: AlignmentType.RIGHT,
          }),
        ],
      },
    ],
  })

  // Generate the document and prompt download
  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "document.docx")
    console.log("Document created successfully")
  })
}

export default PDFGenerator
