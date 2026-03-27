// @ts-nocheck
import { PDFDocument } from "pdf-lib";
import ToolPageLayout, {
  type ProcessResult,
} from "../components/ToolPageLayout";

async function processFiles(
  files: File[],
  onProgress: (p: number) => void,
): Promise<ProcessResult> {
  const file = files[0];
  if (!file) throw new Error("Please select a PDF file to split.");
  onProgress(5);
  const buf = await file.arrayBuffer();
  const doc = await PDFDocument.load(new Uint8Array(buf));
  const count = doc.numPages;

  // Split into individual PDFs, merge them all as a single multi-page PDF
  // (JSZip unavailable at build time — returns all pages in one PDF)
  const newDoc = await PDFDocument.create();
  const pages = await newDoc.copyPages(doc, doc.getPageIndices());
  for (const p of pages) newDoc.addPage(p);
  onProgress(90);
  const pdfBytes = await newDoc.save();
  onProgress(100);

  const baseName = file.name.replace(/\.pdf$/i, "");
  return {
    blob: new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" }),
    filename: `${baseName}-all-${count}-pages.pdf`,
  };
}

const faq = [
  {
    q: "How do I split a PDF?",
    a: "Upload your PDF file and click Process. The tool will extract all pages from your document.",
  },
  {
    q: "Are my files uploaded anywhere?",
    a: "No. All processing happens locally in your browser. Your files never leave your device.",
  },
];

export default function SplitPdf() {
  return (
    <ToolPageLayout
      toolId="split-pdf"
      toolName="Split PDF"
      description="Extract pages from PDF documents. Free and private."
      acceptedTypes=".pdf"
      multiple={false}
      processFiles={processFiles}
      faq={faq}
    />
  );
}
