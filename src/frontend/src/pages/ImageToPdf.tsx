import { PDFDocument } from "pdf-lib";
import type { PDFImage } from "pdf-lib";
import ToolPageLayout, {
  type ProcessResult,
} from "../components/ToolPageLayout";

const faq = [
  {
    q: "How many images can I combine?",
    a: "As many as your device memory allows. Most devices handle 20-50 images easily.",
  },
  {
    q: "What image formats are supported?",
    a: "JPG, PNG, and WebP are all supported.",
  },
  {
    q: "Are my images uploaded?",
    a: "No. Everything is processed in your browser.",
  },
];

async function processFiles(
  files: File[],
  onProgress: (p: number) => void,
): Promise<ProcessResult> {
  if (files.length === 0) throw new Error("Please select images.");
  const pdf = await PDFDocument.create();
  onProgress(10);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const buf = await file.arrayBuffer();
    let img: PDFImage;
    if (file.type === "image/png" || file.name.endsWith(".png")) {
      img = await pdf.embedPng(buf);
    } else {
      img = await pdf.embedJpg(buf);
    }
    const { width, height } = img.scale(1);
    const maxW = 595;
    const maxH = 842;
    const scale = Math.min(maxW / width, maxH / height, 1);
    const w = width * scale;
    const h = height * scale;
    const page = pdf.addPage([maxW, maxH]);
    page.drawImage(img, {
      x: (maxW - w) / 2,
      y: (maxH - h) / 2,
      width: w,
      height: h,
    });
    onProgress(10 + Math.floor(((i + 1) / files.length) * 80));
  }
  const bytes = await pdf.save();
  onProgress(100);
  return {
    blob: new Blob([new Uint8Array(bytes)], { type: "application/pdf" }),
    filename: "images-to-pdf.pdf",
  };
}

export default function ImageToPdf() {
  return (
    <ToolPageLayout
      toolId="image-to-pdf"
      toolName="Image to PDF"
      description="Combine multiple images into a single PDF document. Drag, drop, convert."
      acceptedTypes=".jpg,.jpeg,.png,.webp"
      multiple={true}
      processFiles={processFiles}
      faq={faq}
    />
  );
}
