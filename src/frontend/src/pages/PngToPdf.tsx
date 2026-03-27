import { PDFDocument } from "pdf-lib";
import ToolPageLayout, {
  type ProcessResult,
} from "../components/ToolPageLayout";

async function processFiles(
  files: File[],
  onProgress: (p: number) => void,
): Promise<ProcessResult> {
  if (files.length === 0)
    throw new Error("Please select at least one PNG file.");
  const pdfDoc = await PDFDocument.create();
  const step = 90 / files.length;
  onProgress(5);
  for (let i = 0; i < files.length; i++) {
    const pngBytes = await files[i].arrayBuffer();
    const img = await pdfDoc.embedPng(new Uint8Array(pngBytes));
    const page = pdfDoc.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    onProgress(5 + step * (i + 1));
  }
  onProgress(98);
  const pdfBytes = await pdfDoc.save();
  onProgress(100);
  return {
    blob: new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" }),
    filename: "images-to-pdf.pdf",
  };
}

const faq = [
  {
    q: "Can I convert multiple PNG files at once?",
    a: "Yes — select multiple PNG files and each image will become a separate page in the output PDF.",
  },
  {
    q: "Does PNG transparency carry over to PDF?",
    a: "PNG transparency is embedded, but PDF viewers render it on a white background by default. The transparency data is preserved in the PDF itself.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "No. Conversion runs entirely in your browser. Your PNG files never leave your device.",
  },
  {
    q: "What PNG file sizes are supported?",
    a: "There is no artificial size limit. The practical limit is your browser's available RAM. Files up to several hundred MB work fine on most devices.",
  },
  {
    q: "Can I use this on mobile?",
    a: "Yes — the tool is fully mobile-optimized. Tap the upload area to open your photo library on iOS or Android.",
  },
];

export default function PngToPdf() {
  return (
    <ToolPageLayout
      toolId="png-to-pdf"
      toolName="PNG to PDF"
      description="Convert PNG images to a PDF document instantly. Private, free, no upload."
      acceptedTypes=".png"
      multiple
      processFiles={processFiles}
      faq={faq}
    />
  );
}
