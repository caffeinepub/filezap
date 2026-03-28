import { j as jsxRuntimeExports } from "./index-C8sWIOGs.js";
import { P as PDFDocument } from "./PDFButton-CyGT-MxZ.js";
import { T as ToolPageLayout } from "./ToolPageLayout-BM_HJUqq.js";
import "./DragDropZone-fVNtZ7PV.js";
import "./rotate-ccw-BKRtFsIR.js";
import "./circle-check-big-gr3Jto_s.js";
import "./ProgressBar-DDXECdLb.js";
import "./shield-zyNGSzxA.js";
import "./sparkles-DyT1m0fy.js";
async function processFiles(files, onProgress) {
  const file = files[0];
  onProgress(10);
  const arrayBuffer = await file.arrayBuffer();
  onProgress(30);
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  onProgress(60);
  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
  onProgress(90);
  const blob = new Blob([new Uint8Array(pdfBytes)], {
    type: "application/pdf"
  });
  onProgress(100);
  return { blob, filename: file.name.replace(".pdf", "-compressed.pdf") };
}
const faq = [
  {
    q: "How does PDF compression work?",
    a: "We use pdf-lib to reload and repack the PDF structure, removing redundant metadata, duplicate objects, and unneeded streams. This runs entirely in your browser."
  },
  {
    q: "Is my PDF safe?",
    a: "Absolutely. Your file never leaves your device. All processing happens in your browser using WebAssembly and JavaScript."
  },
  {
    q: "Will I lose quality?",
    a: "Text and vector elements are preserved losslessly. Embedded images may be resampled slightly. For heavy image-based PDFs, try splitting or converting specific pages."
  },
  {
    q: "What is the maximum file size?",
    a: "We support files up to 50MB for best performance. Larger files may be slow due to browser memory limits."
  }
];
function CompressPdf() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolPageLayout,
    {
      toolId: "compress-pdf",
      toolName: "Compress PDF",
      description: "Reduce your PDF file size quickly while keeping quality. 100% free, no signup required.",
      acceptedTypes: ".pdf",
      processFiles,
      faq
    }
  );
}
export {
  CompressPdf as default
};
