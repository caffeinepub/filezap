import { j as jsxRuntimeExports, _ as __vitePreload } from "./index-ZFlIbF7j.js";
import { J as JSZip } from "./jszip.min-4gIixZxK.js";
import { T as ToolPageLayout } from "./ToolPageLayout-pYUtqMG4.js";
import "./DragDropZone-BDudkaDZ.js";
import "./index-7I5fL1gV.js";
import "./shield-DuKf4zA6.js";
async function processFiles(files, onProgress) {
  const file = files[0];
  onProgress(10);
  const { getDocument, GlobalWorkerOptions } = await __vitePreload(async () => {
    const { getDocument: getDocument2, GlobalWorkerOptions: GlobalWorkerOptions2 } = await import("./pdf-Cyahc7kw.js");
    return { getDocument: getDocument2, GlobalWorkerOptions: GlobalWorkerOptions2 };
  }, true ? [] : void 0);
  GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";
  const buf = await file.arrayBuffer();
  onProgress(20);
  const pdf = await getDocument({ data: new Uint8Array(buf) }).promise;
  const count = pdf.numPages;
  const zip = new JSZip();
  const step = 70 / count;
  for (let i = 1; i <= count; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const canvasContext = canvas.getContext("2d");
    await page.render({ canvasContext, viewport }).promise;
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    const base64 = dataUrl.split(",")[1];
    const binStr = atob(base64);
    const bytes = new Uint8Array(binStr.length);
    for (let j = 0; j < binStr.length; j++) bytes[j] = binStr.charCodeAt(j);
    zip.file(`page-${String(i).padStart(3, "0")}.jpg`, bytes);
    onProgress(20 + step * i);
  }
  const zipBlob = await zip.generateAsync({ type: "blob" });
  onProgress(100);
  return { blob: zipBlob, filename: file.name.replace(".pdf", "-images.zip") };
}
const faq = [
  {
    q: "What resolution are the JPG images?",
    a: "We render at 2x scale (144 DPI equivalent) for crisp, high-quality images suitable for printing and screen display."
  },
  {
    q: "Can I get PNG instead of JPG?",
    a: "Currently we export as JPEG at 92% quality. PNG support is on our roadmap."
  },
  {
    q: "What do I get in the download?",
    a: "A ZIP file containing one JPG per PDF page, named page-001.jpg, page-002.jpg, etc."
  },
  {
    q: "Does this work on scanned PDFs?",
    a: "Yes! Since we render the entire page visually (including scanned images), all PDF types work including scanned documents."
  }
];
function PdfToJpg() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolPageLayout,
    {
      toolId: "pdf-to-jpg",
      toolName: "PDF to JPG",
      description: "Convert every PDF page to a high-quality JPG image. Download all as a ZIP file.",
      acceptedTypes: ".pdf",
      processFiles,
      faq
    }
  );
}
export {
  PdfToJpg as default
};
