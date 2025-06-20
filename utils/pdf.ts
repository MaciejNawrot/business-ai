import jsPDF from "jspdf";

export type BusinessProfile = {
  businessName: string;
  industry: string;
  targetAudience: string;
  uniqueValue: string;
  competitors: string;
  goals: string;
  challenges: string;
  budget: string;
  timeline: string;
};

export const generateBusinessAnalysisPDF = (
  analysis: string,
  businessProfile: BusinessProfile
): void => {
  const doc = new jsPDF();
  const margin = 20;
  const lineHeight = 7;
  let y = margin;
  const maxWidth = doc.internal.pageSize.width - (margin * 2);

  // Helper function to clean markdown formatting
  const cleanMarkdown = (text: string) => {
    return text
      .replace(/^#{3,}\s*/, '') // Remove markdown headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers
      .replace(/^-\s*/, '') // Remove bullet markers
      .replace(/^\d+\.\s*/, ''); // Remove numbered list markers
  };

  // Add title
  doc.setFontSize(20);
  doc.text("Business Analysis Report", margin, y);
  y += lineHeight * 2;

  // Add business info
  doc.setFontSize(12);
  doc.text(`Business Name: ${businessProfile.businessName}`, margin, y);
  y += lineHeight;
  doc.text(`Industry: ${businessProfile.industry}`, margin, y);
  y += lineHeight * 2;

  // Add analysis content
  doc.setFontSize(12);
  const lines = analysis.split('\n');
  
  lines.forEach((line) => {
    // Handle markdown headers with multiple #
    if (/^#{3,}\s/.test(line)) {
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      const headerText = cleanMarkdown(line);
      const splitHeader = doc.splitTextToSize(headerText, maxWidth);
      doc.text(splitHeader, margin, y);
      y += lineHeight * (splitHeader.length + 0.5);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
    }
    // Handle numbered headers (e.g., "1. **Key Business Strengths**")
    else if (/^\d+\.\s*\*\*.*\*\*/.test(line)) {
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      const headerText = line.replace(/^\d+\.\s*\*\*(.*?)\*\*/, '$1');
      const splitHeader = doc.splitTextToSize(headerText, maxWidth);
      doc.text(splitHeader, margin, y);
      y += lineHeight * (splitHeader.length + 0.5);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
    }
    // Handle headers with just **text**
    else if (/^\*\*.*\*\*/.test(line)) {
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      const headerText = line.replace(/\*\*(.*?)\*\*/g, '$1');
      const splitHeader = doc.splitTextToSize(headerText, maxWidth);
      doc.text(splitHeader, margin, y);
      y += lineHeight * (splitHeader.length + 0.5);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
    }
    // Handle bullet points
    else if (line.startsWith('-')) {
      const bulletText = cleanMarkdown(line);
      const bulletPoint = `• ${bulletText}`;
      const splitBullet = doc.splitTextToSize(bulletPoint, maxWidth - 10);
      doc.text(splitBullet, margin + 5, y);
      y += lineHeight * splitBullet.length;
    }
    // Handle numbered lists
    else if (/^\d+\.\s/.test(line)) {
      const listText = cleanMarkdown(line);
      const splitText = doc.splitTextToSize(listText, maxWidth - 10);
      doc.text(splitText, margin + 5, y);
      y += lineHeight * splitText.length;
    }
    // Handle empty lines
    else if (line.trim() === '') {
      y += lineHeight;
    }
    // Handle regular text
    else {
      const cleanText = cleanMarkdown(line);
      const splitText = doc.splitTextToSize(cleanText, maxWidth);
      doc.text(splitText, margin, y);
      y += lineHeight * splitText.length;
    }

    // Add new page if needed
    if (y > doc.internal.pageSize.height - margin) {
      doc.addPage();
      y = margin;
    }
  });

  // Save the PDF
  doc.save(`${businessProfile.businessName}-business-analysis.pdf`);
}; 