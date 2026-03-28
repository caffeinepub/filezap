import { j as jsxRuntimeExports } from "./index-C3IzVc7X.js";
import { P as PDFDocument } from "./PDFButton-Cn_sX00S.js";
import { T as ToolPageLayout } from "./ToolPageLayout-D8s2yPNi.js";
import "./DragDropZone-CNGUWUQx.js";
import "./rotate-ccw-DewqcoPc.js";
import "./circle-check-big-DY8_6VGT.js";
import "./ProgressBar-BxMG3U6M.js";
import "./shield-CEFWVC6y.js";
import "./sparkles--tk4gFEy.js";
async function processFiles(files, onProgress) {
  const file = files[0];
  if (!file) throw new Error("Please select a PDF file to split.");
  onProgress(5);
  const buf = await file.arrayBuffer();
  const doc = await PDFDocument.load(new Uint8Array(buf));
  const count = doc.numPages;
  const newDoc = await PDFDocument.create();
  const pages = await newDoc.copyPages(doc, doc.getPageIndices());
  for (const p of pages) newDoc.addPage(p);
  onProgress(90);
  const pdfBytes = await newDoc.save();
  onProgress(100);
  const baseName = file.name.replace(/\.pdf$/i, "");
  return {
    blob: new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" }),
    filename: `${baseName}-all-${count}-pages.pdf`
  };
}
const faq = [
  {
    q: "How do I split a PDF?",
    a: "Upload your PDF file and click Process. The tool will extract all pages from your document."
  },
  {
    q: "Are my files uploaded anywhere?",
    a: "No. All processing happens locally in your browser. Your files never leave your device."
  }
];
function SplitPdf() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolPageLayout,
    {
      toolId: "split-pdf",
      toolName: "Split PDF",
      description: "Extract pages from PDF documents. Free and private.",
      acceptedTypes: ".pdf",
      multiple: false,
      processFiles,
      faq
    }
  );
}
export {
  SplitPdf as default
};
