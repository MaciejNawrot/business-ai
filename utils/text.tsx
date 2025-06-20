import React from "react";

export const formatAnalysisText = (text: string) => {
  return text
    .split('\n')
    .map((line, index) => {
      // Handle markdown headers with multiple # (e.g., ###, ####)
      if (/^#{3,}\s/.test(line)) {
        const headerText = line.replace(/^#{3,}\s*/, '');
        return <h2 key={index} className="text-2xl font-bold mt-6 mb-4">{headerText}</h2>;
      }
      
      // Handle headers (lines starting with numbers and dots)
      if (/^\d+\.\s*\*\*.*\*\*/.test(line)) {
        const headerText = line.replace(/^\d+\.\s*\*\*(.*?)\*\*/, '$1');
        return <h2 key={index} className="text-2xl font-bold mt-6 mb-4">{headerText}</h2>;
      }
      
      // Handle headers with just **text**
      if (/^\*\*.*\*\*/.test(line)) {
        const headerText = line.replace(/\*\*(.*?)\*\*/g, '$1');
        return <h2 key={index} className="text-2xl font-bold mt-6 mb-4">{headerText}</h2>;
      }
      
      // Handle bullet points
      if (line.startsWith('-')) {
        const bulletText = line.replace(/^-\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1');
        return <li key={index} className="ml-4 mb-2">{bulletText}</li>;
      }
      
      // Handle numbered lists
      if (/^\d+\.\s/.test(line)) {
        const listText = line.replace(/^\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1');
        return <li key={index} className="ml-4 mb-2 list-decimal">{listText}</li>;
      }
      
      // Handle empty lines
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      // Handle regular text with bold formatting
      const formattedText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <p 
          key={index} 
          className="mb-4"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      );
    });
}; 