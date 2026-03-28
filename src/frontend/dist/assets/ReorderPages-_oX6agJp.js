import { r as reactExports, j as jsxRuntimeExports } from "./index-BvMqnfhD.js";
import { P as PDFDocument } from "./PDFButton-DTO3xMX5.js";
import { T as ToolPageLayout } from "./ToolPageLayout-D7eEkHs8.js";
import "./DragDropZone-pzKI25H8.js";
import "./rotate-ccw-Bmx2dr2A.js";
import "./circle-check-big-BCkoZsdf.js";
import "./ProgressBar-C2XzB2ev.js";
import "./shield-CBuBy4yV.js";
import "./sparkles-DcVQ6SrG.js";
const faq = [
  {
    q: "How do I reorder pages?",
    a: "Enter the new page order as a comma-separated list. For a 5-page PDF, to reverse it enter: 5,4,3,2,1"
  },
  {
    q: "Is there a limit to pages?",
    a: "No hard limit — it depends on your device memory. Most PDFs work fine up to hundreds of pages."
  },
  { q: "Are my files uploaded?", a: "No. Everything stays in your browser." }
];
function ReorderPages() {
  const [order, setOrder] = reactExports.useState("");
  async function processFiles(files, onProgress) {
    if (!order.trim()) throw new Error("Please enter the new page order.");
    const file = files[0];
    onProgress(20);
    const buf = await file.arrayBuffer();
    const srcPdf = await PDFDocument.load(buf);
    const pageCount = srcPdf.getPageCount();
    onProgress(40);
    const newOrder = order.split(",").map((p) => Number.parseInt(p.trim()) - 1).filter((n) => n >= 0 && n < pageCount);
    if (newOrder.length === 0) throw new Error("Invalid page order.");
    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(srcPdf, newOrder);
    for (const page of pages) newPdf.addPage(page);
    onProgress(90);
    const bytes = await newPdf.save();
    onProgress(100);
    return {
      blob: new Blob([new Uint8Array(bytes)], { type: "application/pdf" }),
      filename: file.name.replace(".pdf", "-reordered.pdf")
    };
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolPageLayout,
    {
      toolId: "reorder-pages",
      toolName: "Reorder PDF Pages",
      description: "Change the order of pages in your PDF. No upload, instant download.",
      acceptedTypes: ".pdf",
      processFiles,
      faq,
      optionsPanel: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "reorder-input",
            className: "text-sm font-medium block mb-2",
            children: "New Page Order"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "reorder-input",
            type: "text",
            value: order,
            onChange: (e) => setOrder(e.target.value),
            placeholder: "e.g. 3,1,2,4 (for a 4-page PDF)",
            className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Enter page numbers in the new order. Pages not listed will be omitted." })
      ] })
    }
  );
}
export {
  ReorderPages as default
};
