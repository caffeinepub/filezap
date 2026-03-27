import { j as jsxRuntimeExports } from "./index-DldcgVMI.js";
import { T as ToolPageLayout } from "./ToolPageLayout-DN2K3gFd.js";
import "./DragDropZone-B7xhvUPm.js";
import "./file-text-BFCq7ahu.js";
import "./circle-check-big-BASSer1N.js";
import "./ProgressBar-CgZ3-sHe.js";
import "./shield-tQ45TDtW.js";
import "./sparkles-BB8QsiHW.js";
async function processFiles(files, onProgress) {
  const file = files[0];
  if (!file) throw new Error("Please select a PDF file.");
  onProgress(10);
  const pdfUrl = URL.createObjectURL(file);
  document.createElement("img");
  onProgress(40);
  const pdfjsLib = await // biome-ignore lint/suspicious/noExplicitAny: dynamic CDN load
  new Function(
    "return import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs')"
  )();
  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs";
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(buf) }).promise;
  const numPages = pdf.numPages;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const blobs = [];
  const step = 50 / numPages;
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: ctx, viewport }).promise;
    const blob = await new Promise(
      (res) => canvas.toBlob((b) => res(b), "image/jpeg", 0.92)
    );
    blobs.push(blob);
    onProgress(40 + step * i);
  }
  URL.revokeObjectURL(pdfUrl);
  onProgress(100);
  return {
    blob: blobs[0],
    filename: `${file.name.replace(/\.pdf$/i, "")}-page-1.jpg`
  };
}
const faq = [
  {
    q: "Which pages are converted?",
    a: "The first page of the PDF is converted to a JPG image."
  },
  {
    q: "Are my files uploaded?",
    a: "No. Everything runs in your browser. Your PDF never leaves your device."
  }
];
function PdfToJpg() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolPageLayout,
    {
      toolId: "pdf-to-jpg",
      toolName: "PDF to JPG",
      description: "Convert your PDF's first page to a JPG image. Free and private.",
      acceptedTypes: ".pdf",
      multiple: false,
      processFiles,
      faq
    }
  );
}
export {
  PdfToJpg as default
};
