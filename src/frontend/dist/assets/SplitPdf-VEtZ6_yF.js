import { j as jsxRuntimeExports } from "./index-BvMqnfhD.js";
import { P as PDFDocument } from "./PDFButton-DTO3xMX5.js";
import { T as ToolPageLayout } from "./ToolPageLayout-D7eEkHs8.js";
import "./DragDropZone-pzKI25H8.js";
import "./rotate-ccw-Bmx2dr2A.js";
import "./circle-check-big-BCkoZsdf.js";
import "./ProgressBar-C2XzB2ev.js";
import "./shield-CBuBy4yV.js";
import "./sparkles-DcVQ6SrG.js";
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
