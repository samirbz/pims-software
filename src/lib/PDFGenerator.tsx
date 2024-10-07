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
} from "docx"

const PDFGenerator = async (yojanaKoNaam: any) => {
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
          new Paragraph({
            children: [
              new ImageRun({
                data: uint8Array,
                transformation: {
                  width: 115,
                  height: 95,
                },
                floating: {
                  horizontalPosition: {
                    offset: 900000,
                  },
                  verticalPosition: {
                    offset: 1014400,
                  },

                  margins: {
                    top: 201440,
                    bottom: 201440,
                  },
                },
              }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "शुद्धोधन गाउँपालिका",
                size: 24,
                noProof: true,
                font: "Arial Unicode MS",
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "गाउँ कार्यपालिकाको कार्यालय",
                size: 24,
                noProof: true,
                font: "Arial Unicode MS",
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "मानपकडी, रुपन्देही",
                size: 24,
                font: "Arial Unicode MS",
                noProof: true,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "लुम्बिनी प्रदेश नेपाल",
                size: 24,
                font: "Arial Unicode MS",
                noProof: true,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "मितिः  2081/6/12",
                size: 24,
                noProof: true,
                font: "Arial Unicode MS",
              }),
            ],
            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "विषयः-योजना/कार्यक्रमको सम्झौता सम्बन्धमा ।",
                size: 24,
                noProof: true,
                font: "Arial Unicode MS",
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "टिप्पणी र आदेश",
                            bold: true,
                            size: 36,
                            noProof: true,
                            font: "Arial Unicode MS",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "श्रीमान,",
                noProof: true,
                size: 24,
                font: "Arial Unicode MS",
              }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "\tचालु आ.ब. 2080/81 को लागि yojana chanot nikaya बाट स्वीकृत बार्षिक योजना तथा कार्यक्रम अन्तर्गत mukhya samiti तर्फको सि.नं. 32 मा yojana ko naam second वडा नं. 8 का लागि budget karyakram 3 रु.1000.00  रु.2000.00 गरि जम्मा रु.3000.00   विनियोजन भएको छ ।",
                noProof: true,
                size: 24,
                font: "Arial Unicode MS",
              }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "\tउक्त योजना कार्यान्वयनको लागि योजना बाट सदस्य लगायत उपभोक्ताहरुको बैठक योजना स्थलगत जनप्रतिनिधि/कर्मचारीको उपस्थितिमा मिति २०८१/६/१० मा जनताको उपभोक्ता समितिका अध्यक्ष/सचिव/कोषाध्यक्ष पदमा १ जना महिला सहित ०.०० प्रतिशत महिला सदस्यको भएको जनताको उपभोक्ता समितिको गठन भएको देखिन्छ ।",
                noProof: true,
                size: 24,
                font: "Arial Unicode MS",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "\tहाल सम्झौताको लागि 8 नं वडा कार्यालयको सिफारिस पत्र, उपभोक्ता भेलाको उपस्थिति र निर्णय, उपभोक्ता समितिको बैठकको निर्णयको प्रतिलिपिहरु र समितिका सबै सदस्यहरुको नागरीकता प्रमाण पत्रको प्रतिलिपिहरु संलग्न राखि सम्झौताको लागि उपभोक्ता समितिबाट मिति 2081/6/12 गते निवेदन प्राप्त भएको छ ।",
                noProof: true,
                size: 24,
                font: "Arial Unicode MS",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "\tसो योजनाको लागि प्राविधिक शाखाबाट कन्टेन्जेन्सी र जनश्रमदान सहित रु. 3,000.00 को लागत अनुमान संग्लन भई पेश हुन आएकोले, लागत अनुमान अनुसारको कार्य सो योजनामा स्वीकृत बजेटबाट सम्पन्न गर्ने गरी उक्त योजना कार्यान्वयनको लागि गठित उपभोक्ता समितिसँग सम्झौता गरी कार्यादेश दिन निर्णयार्थ पेश गरेको छु ।",
                noProof: true,
                size: 24,
                font: "Arial Unicode MS",
              }),
            ],
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
