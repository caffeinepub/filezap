import { PDFDocument } from "pdf-lib";
import ToolPageLayout, {
  type ProcessResult,
} from "../components/ToolPageLayout";

async function processFiles(
  files: File[],
  onProgress: (p: number) => void,
): Promise<ProcessResult> {
  if (files.length < 2)
    throw new Error("Please select at least 2 PDF files to merge.");
  const merged = await PDFDocument.create();
  const step = 80 / files.length;
  onProgress(5);
  for (let i = 0; i < files.length; i++) {
    const buf = await files[i].arrayBuffer();
    const doc = await PDFDocument.load(buf);
    const pageIndices = doc.getPageIndices();
    const pages = await merged.copyPages(doc, pageIndices);
    for (const page of pages) merged.addPage(page);
    onProgress(10 + step * (i + 1));
  }
  const pdfBytes = await merged.save();
  onProgress(100);
  const blob = new Blob([new Uint8Array(pdfBytes)], {
    type: "application/pdf",
  });
  return { blob, filename: "merged.pdf" };
}

const faq = [
  {
    q: "How many PDFs can I merge at once?",
    a: "You can merge as many PDFs as you like, limited only by your browser's available memory. For best results, keep total size under 100MB.",
  },
  {
    q: "Will the page order be preserved?",
    a: "Yes — pages are merged in the exact order you add the files. You can reorder by removing and re-adding files.",
  },
  {
    q: "Does merging affect PDF quality?",
    a: "No. We copy pages byte-for-byte without re-encoding, so text, images and formatting are perfectly preserved.",
  },
  {
    q: "Are bookmarks and metadata preserved?",
    a: "Basic page content is preserved. Complex bookmarks and form fields may not transfer, as we extract pages only.",
  },
];

export default function MergePdf() {
  return (
    <ToolPageLayout
      toolId="merge-pdf"
      toolName="Merge PDF"
      description="Combine multiple PDF files into one document in seconds. Free and private."
      acceptedTypes=".pdf"
      multiple
      processFiles={processFiles}
      faq={faq}
    />
  );
}
