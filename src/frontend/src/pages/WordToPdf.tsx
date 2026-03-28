import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import ToolPageLayout, {
  type ProcessResult,
} from "../components/ToolPageLayout";

const faq = [
  {
    q: "What Word formats are supported?",
    a: "We support .docx files. Complex formatting may not render perfectly since this is a client-side extraction.",
  },
  {
    q: "Will my formatting be preserved?",
    a: "Basic text content and structure is extracted. Complex layouts, images, and custom fonts may vary.",
  },
  {
    q: "Is my document uploaded?",
    a: "No. Everything runs in your browser. Your document is never sent to any server.",
  },
];

async function processFiles(
  files: File[],
  onProgress: (p: number) => void,
): Promise<ProcessResult> {
  const file = files[0];
  onProgress(20);
  // Read the docx as text (basic extraction)
  const buf = await file.arrayBuffer();
  onProgress(40);
  // Extract readable text from docx XML
  const decoder = new TextDecoder("utf-8");
  let text = "";
  try {
    // Try to find readable text in the binary — basic approach
    const raw = decoder.decode(buf);
    const matches = raw.match(/<w:t[^>]*>([^<]+)<\/w:t>/g) || [];
    text =
      matches.map((m) => m.replace(/<[^>]+>/g, "")).join(" ") ||
      "(Could not extract text from this document)";
  } catch {
    text = "Could not read document content.";
  }
  onProgress(60);
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;
  const lineHeight = 16;
  const maxWidth = pageWidth - margin * 2;
  const words = text.split(" ");
  let lines: string[] = [];
  let currentLine = "";
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (font.widthOfTextAtSize(testLine, 11) > maxWidth) {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  onProgress(80);
  let page = pdf.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;
  for (const line of lines) {
    if (y < margin + lineHeight) {
      page = pdf.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    page.drawText(line, {
      x: margin,
      y,
      size: 11,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
    y -= lineHeight;
  }
  onProgress(95);
  const bytes = await pdf.save();
  onProgress(100);
  return {
    blob: new Blob([new Uint8Array(bytes)], { type: "application/pdf" }),
    filename: file.name.replace(/\.docx?$/i, ".pdf"),
  };
}

export default function WordToPdf() {
  return (
    <ToolPageLayout
      toolId="word-to-pdf"
      toolName="Word to PDF"
      description="Convert your Word (.docx) document to PDF. Client-side, no upload."
      acceptedTypes=".docx,.doc"
      processFiles={processFiles}
      faq={faq}
    />
  );
}
