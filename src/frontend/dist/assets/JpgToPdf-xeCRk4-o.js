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
  if (files.length === 0)
    throw new Error("Please select at least one JPG file.");
  const pdfDoc = await PDFDocument.create();
  const step = 90 / files.length;
  onProgress(5);
  for (let i = 0; i < files.length; i++) {
    const jpgBytes = await files[i].arrayBuffer();
    const img = await pdfDoc.embedJpg(new Uint8Array(jpgBytes));
    const page = pdfDoc.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    onProgress(5 + step * (i + 1));
  }
  onProgress(98);
  const pdfBytes = await pdfDoc.save();
  onProgress(100);
  return {
    blob: new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" }),
    filename: "images-to-pdf.pdf"
  };
}
const faq = [
  {
    q: "Can I convert multiple JPG files at once?",
    a: "Yes — select multiple JPG files and each image will become a separate page in the output PDF, in the order you selected them."
  },
  {
    q: "Will image quality be preserved?",
    a: "Your JPG images are embedded into the PDF without additional re-compression. The quality you see in the JPG is what you get in the PDF."
  },
  {
    q: "Are my images uploaded to a server?",
    a: "No. The entire conversion runs inside your browser using WebAssembly. Your images never leave your device."
  },
  {
    q: "What JPG file sizes are supported?",
    a: "There is no artificial size limit. The practical limit is your browser's available RAM. Files up to several hundred MB work fine on modern devices."
  },
  {
    q: "Can I use this on mobile?",
    a: "Yes — the tool is fully mobile-optimized. Tap the upload area to open your photo library directly on iOS or Android."
  }
];
function JpgToPdf() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolPageLayout,
    {
      toolId: "jpg-to-pdf",
      toolName: "JPG to PDF",
      description: "Convert JPG images to a PDF document instantly. Private, free, no upload.",
      acceptedTypes: ".jpg,.jpeg",
      multiple: true,
      processFiles,
      faq
    }
  );
}
export {
  JpgToPdf as default
};
