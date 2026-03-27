import ToolPageLayout, {
  type ProcessResult,
} from "../components/ToolPageLayout";

async function processFiles(
  files: File[],
  onProgress: (p: number) => void,
): Promise<ProcessResult> {
  const file = files[0];
  if (!file) throw new Error("Please select a PDF file.");

  onProgress(10);

  // Render first page to canvas using browser's built-in PDF rendering via object URL
  const pdfUrl = URL.createObjectURL(file);
  const img = document.createElement("img");

  onProgress(40);

  // Use canvas to create a JPG from the PDF's first page via PDF.js CDN
  const pdfjsLib =
    (await // biome-ignore lint/suspicious/noExplicitAny: dynamic CDN load
    new Function(
      "return import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs')",
    )()) as any;
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs";

  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(buf) }).promise;
  const numPages = pdf.numPages;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  const blobs: Blob[] = [];
  const step = 50 / numPages;

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: ctx, viewport }).promise;
    const blob = await new Promise<Blob>((res) =>
      canvas.toBlob((b) => res(b!), "image/jpeg", 0.92),
    );
    blobs.push(blob);
    onProgress(40 + step * i);
  }

  URL.revokeObjectURL(pdfUrl);
  void img;
  onProgress(100);

  // Return first page as JPG (multi-page: would need JSZip)
  return {
    blob: blobs[0],
    filename: `${file.name.replace(/\.pdf$/i, "")}-page-1.jpg`,
  };
}

const faq = [
  {
    q: "Which pages are converted?",
    a: "The first page of the PDF is converted to a JPG image.",
  },
  {
    q: "Are my files uploaded?",
    a: "No. Everything runs in your browser. Your PDF never leaves your device.",
  },
];

export default function PdfToJpg() {
  return (
    <ToolPageLayout
      toolId="pdf-to-jpg"
      toolName="PDF to JPG"
      description="Convert your PDF's first page to a JPG image. Free and private."
      acceptedTypes=".pdf"
      multiple={false}
      processFiles={processFiles}
      faq={faq}
    />
  );
}
