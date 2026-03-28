import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import ToolPageLayout, {
  type ProcessResult,
} from "../components/ToolPageLayout";

const faq = [
  {
    q: "How do I reorder pages?",
    a: "Enter the new page order as a comma-separated list. For a 5-page PDF, to reverse it enter: 5,4,3,2,1",
  },
  {
    q: "Is there a limit to pages?",
    a: "No hard limit — it depends on your device memory. Most PDFs work fine up to hundreds of pages.",
  },
  { q: "Are my files uploaded?", a: "No. Everything stays in your browser." },
];

export default function ReorderPages() {
  const [order, setOrder] = useState("");

  async function processFiles(
    files: File[],
    onProgress: (p: number) => void,
  ): Promise<ProcessResult> {
    if (!order.trim()) throw new Error("Please enter the new page order.");
    const file = files[0];
    onProgress(20);
    const buf = await file.arrayBuffer();
    const srcPdf = await PDFDocument.load(buf);
    const pageCount = srcPdf.getPageCount();
    onProgress(40);
    const newOrder = order
      .split(",")
      .map((p) => Number.parseInt(p.trim()) - 1)
      .filter((n) => n >= 0 && n < pageCount);
    if (newOrder.length === 0) throw new Error("Invalid page order.");
    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(srcPdf, newOrder);
    for (const page of pages) newPdf.addPage(page);
    onProgress(90);
    const bytes = await newPdf.save();
    onProgress(100);
    return {
      blob: new Blob([new Uint8Array(bytes)], { type: "application/pdf" }),
      filename: file.name.replace(".pdf", "-reordered.pdf"),
    };
  }

  return (
    <ToolPageLayout
      toolId="reorder-pages"
      toolName="Reorder PDF Pages"
      description="Change the order of pages in your PDF. No upload, instant download."
      acceptedTypes=".pdf"
      processFiles={processFiles}
      faq={faq}
      optionsPanel={
        <div className="bg-card border border-border rounded-xl p-5">
          <label
            htmlFor="reorder-input"
            className="text-sm font-medium block mb-2"
          >
            New Page Order
          </label>
          <input
            id="reorder-input"
            type="text"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            placeholder="e.g. 3,1,2,4 (for a 4-page PDF)"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Enter page numbers in the new order. Pages not listed will be
            omitted.
          </p>
        </div>
      }
    />
  );
}
