import ToolPageLayout, {
  type ProcessResult,
} from "../components/ToolPageLayout";

const faq = [
  {
    q: "What resolution are the PNG images?",
    a: "We render at 2x resolution (144 DPI) for crisp results.",
  },
  {
    q: "Can I get all pages as separate PNGs?",
    a: "Currently the first page is downloaded as PNG. Multiple-page export is on the roadmap.",
  },
  {
    q: "Is this better than taking a screenshot?",
    a: "Yes. Our renderer uses the actual PDF engine for pixel-perfect output.",
  },
];

async function processFiles(
  files: File[],
  onProgress: (p: number) => void,
): Promise<ProcessResult> {
  const file = files[0];
  onProgress(10);
  // Load pdfjs from CDN (same approach as PdfToJpg)
  // biome-ignore lint/security/noGlobalEval: required for dynamic ESM import
  const pdfjsLib = (await new Function(
    "return import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs')",
  )()) as typeof import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs";
  onProgress(20);
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(buf) }).promise;
  onProgress(30);
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 2 });
  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported in this browser.");
  await page.render({ canvas, canvasContext: ctx, viewport }).promise;
  onProgress(80);
  const pngBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Canvas error"))),
      "image/png",
    );
  });
  onProgress(100);
  const baseName = file.name.replace(/\.pdf$/i, "");
  return { blob: pngBlob, filename: `${baseName}-page1.png` };
}

export default function PdfToPng() {
  return (
    <ToolPageLayout
      toolId="pdf-to-png"
      toolName="PDF to PNG"
      description="Convert PDF pages to high-quality PNG images. Private, no upload needed."
      acceptedTypes=".pdf"
      processFiles={processFiles}
      faq={faq}
    />
  );
}
