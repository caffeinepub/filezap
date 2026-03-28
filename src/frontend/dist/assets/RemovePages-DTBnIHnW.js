import { r as reactExports, j as jsxRuntimeExports } from "./index-C3IzVc7X.js";
import { P as PDFDocument } from "./PDFButton-Cn_sX00S.js";
import { T as ToolPageLayout } from "./ToolPageLayout-D8s2yPNi.js";
import "./DragDropZone-CNGUWUQx.js";
import "./rotate-ccw-DewqcoPc.js";
import "./circle-check-big-DY8_6VGT.js";
import "./ProgressBar-BxMG3U6M.js";
import "./shield-CEFWVC6y.js";
import "./sparkles--tk4gFEy.js";
const faq = [
  {
    q: "Can I remove multiple pages at once?",
    a: "Yes. Enter comma-separated page numbers like 1,3,5 or a range like 2-5."
  },
  {
    q: "Will the remaining pages reflow?",
    a: "Yes, the remaining pages are renumbered and the PDF is rebuilt cleanly."
  },
  {
    q: "Are my files safe?",
    a: "Your files never leave your device. Everything is processed in your browser."
  }
];
function RemovePages() {
  const [pagesToRemove, setPagesToRemove] = reactExports.useState("");
  async function processFiles(files, onProgress) {
    if (!pagesToRemove.trim())
      throw new Error("Please specify pages to remove.");
    const file = files[0];
    onProgress(20);
    const buf = await file.arrayBuffer();
    const srcPdf = await PDFDocument.load(buf);
    const pageCount = srcPdf.getPageCount();
    onProgress(40);
    const removeSet = new Set(
      pagesToRemove.split(",").flatMap((p) => {
        const r = p.trim().split("-");
        if (r.length === 2) {
          const s = Number.parseInt(r[0]) - 1;
          const e = Number.parseInt(r[1]) - 1;
          return Array.from({ length: e - s + 1 }, (_, i) => s + i);
        }
        return [Number.parseInt(p.trim()) - 1];
      }).filter((n) => n >= 0 && n < pageCount)
    );
    onProgress(60);
    const newPdf = await PDFDocument.create();
    const keepIndices = Array.from({ length: pageCount }, (_, i) => i).filter(
      (i) => !removeSet.has(i)
    );
    const pages = await newPdf.copyPages(srcPdf, keepIndices);
    for (const page of pages) newPdf.addPage(page);
    onProgress(90);
    const bytes = await newPdf.save();
    onProgress(100);
    return {
      blob: new Blob([new Uint8Array(bytes)], { type: "application/pdf" }),
      filename: file.name.replace(".pdf", "-pages-removed.pdf")
    };
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolPageLayout,
    {
      toolId: "remove-pages",
      toolName: "Remove PDF Pages",
      description: "Delete specific pages from your PDF. Fast, private, no signup.",
      acceptedTypes: ".pdf",
      processFiles,
      faq,
      optionsPanel: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "remove-pages-input",
            className: "text-sm font-medium block mb-2",
            children: "Pages to Remove"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "remove-pages-input",
            type: "text",
            value: pagesToRemove,
            onChange: (e) => setPagesToRemove(e.target.value),
            placeholder: "e.g. 1,3,5-8",
            className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Use commas for individual pages (1,3) or dashes for ranges (2-5)." })
      ] })
    }
  );
}
export {
  RemovePages as default
};
