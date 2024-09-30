// pages/pdf-generator.tsx

import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf, Font } from '@react-pdf/renderer';

// 1. Register the Nepali Font
Font.register({
  family: 'Mukta',
  src: '/fonts/Mukta-Regular.ttf', // Make sure the font is accessible from your public folder or static file server
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    fontFamily: 'Mukta', // Use the registered Nepali font
    fontSize: 12
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>समीर</Text>
      </View>
      <View style={styles.section}>
        <Text> नमस्ते, यो नेपाली फन्टमा छ।</Text>
      </View>
    </Page>
  </Document>
);

// Function to generate and download PDF
const PDFGenerator = async () => {
  const blob = await pdf(<MyDocument />).toBlob();
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'example.pdf';
  link.click();

  URL.revokeObjectURL(url);
};

const PDFGeneratorPage = () => {
  return (
    <div>
      <h1>Generate PDF with Nepali Font</h1>
      <button onClick={PDFGenerator}>Download PDF</button>
    </div>
  );
};

export default PDFGeneratorPage;

