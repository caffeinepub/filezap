import { j as jsxRuntimeExports } from "./index-RHF5_ywm.js";
import { J as JSZip } from "./jszip.min-ltvcYAH0.js";
import { P as PDFDocument } from "./PDFButton-BE6fKQXv.js";
import { T as ToolPageLayout } from "./ToolPageLayout-Cgfl4ukd.js";
import "./DragDropZone-CN4XQVtJ.js";
import "./index-Cu3nm7nG.js";
import "./shield-BHKmkMB8.js";
async function processFiles(files, onProgress) {
  const file = files[0];
  onProgress(10);
  const buf = await file.arrayBuffer();
  onProgress(25);
  const srcDoc = await PDFDocument.load(buf);
  const count = srcDoc.getPageCount();
  onProgress(35);
  const zip = new JSZip();
  const step = 55 / count;
  for (let i = 0; i < count; i++) {
    const singleDoc = await PDFDocument.create();
    const [page] = await singleDoc.copyPages(srcDoc, [i]);
    singleDoc.addPage(page);
    const bytes = await singleDoc.save();
    zip.file(`page-${String(i + 1).padStart(3, "0")}.pdf`, bytes);
    onProgress(35 + step * (i + 1));
  }
  const zipBlob = await zip.generateAsync({ type: "blob" });
  onProgress(100);
  return { blob: zipBlob, filename: file.name.replace(".pdf", "-pages.zip") };
}
const faq = [
  {
    q: "What do I get after splitting?",
    a: "You receive a ZIP file containing one PDF per page, named page-001.pdf, page-002.pdf, etc."
  },
  {
    q: "How many pages can I split?",
    a: "Any number of pages is supported. Very large PDFs may take a moment to process depending on your device."
  },
  {
    q: "Can I split only specific page ranges?",
    a: "Currently we split all pages. Page range selection is on our roadmap!"
  },
  {
    q: "Is the quality preserved after splitting?",
    a: "Yes. Each page PDF contains the original content with no re-encoding or quality loss."
  }
];
function SplitPdf() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolPageLayout,
    {
      toolId: "split-pdf",
      toolName: "Split PDF",
      description: "Split each page of your PDF into a separate file. Download all as a convenient ZIP.",
      acceptedTypes: ".pdf",
      processFiles,
      faq
    }
  );
}
export {
  SplitPdf as default
};
