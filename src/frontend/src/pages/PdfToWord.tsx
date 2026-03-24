import type { TextItem } from "pdfjs-dist/types/src/display/api";
import ToolPageLayout, {
  type ProcessResult,
} from "../components/ToolPageLayout";

async function extractTextFromPdf(buf: ArrayBuffer): Promise<string> {
  const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
  GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";
  const pdf = await getDocument({ data: new Uint8Array(buf) }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = (content.items as TextItem[])
      .filter((item) => typeof item.str === "string")
      .map((item) => item.str)
      .join(" ");
    text += `--- Page ${i} ---\n${pageText}\n\n`;
  }
  return text;
}

async function processFiles(
  files: File[],
  onProgress: (p: number) => void,
): Promise<ProcessResult> {
  const file = files[0];
  onProgress(10);
  const buf = await file.arrayBuffer();
  onProgress(30);
  const text = await extractTextFromPdf(buf);
  onProgress(90);
  const blob = new Blob([text], { type: "text/plain" });
  onProgress(100);
  return { blob, filename: file.name.replace(".pdf", "-extracted.txt") };
}

const faq = [
  {
    q: "What format does the converted file use?",
    a: "We extract text and save it as a plain .txt file. This works best for text-heavy PDFs. Formatting like tables and columns may not be preserved.",
  },
  {
    q: "Why is my converted file empty?",
    a: "Some PDFs are scanned images with no embedded text. These require OCR technology which is beyond client-side capabilities.",
  },
  {
    q: "Is the conversion perfect?",
    a: "Text extraction is best-effort. Complex layouts with columns, tables, or right-to-left text may not convert perfectly.",
  },
  {
    q: "Can I get a real .docx file?",
    a: "True .docx generation requires server-side processing. Our browser-based tool extracts raw text to a .txt file for maximum privacy.",
  },
];

export default function PdfToWord() {
  return (
    <ToolPageLayout
      toolId="pdf-to-word"
      toolName="PDF to Word"
      description="Extract all text from your PDF and download as a text document. 100% browser-based."
      acceptedTypes=".pdf"
      processFiles={processFiles}
      faq={faq}
    />
  );
}
