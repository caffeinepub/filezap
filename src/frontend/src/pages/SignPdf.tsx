import { PDFDocument } from "pdf-lib";
import { useRef, useState } from "react";
import ToolPageLayout, {
  type ProcessResult,
} from "../components/ToolPageLayout";

const faq = [
  {
    q: "How do I sign the PDF?",
    a: "Draw your signature on the pad, or type it. The signature is placed on the last page by default.",
  },
  {
    q: "Is this a legally binding signature?",
    a: "This creates a visual signature. For legal e-signatures, consult a legal professional or use a certified e-signature service.",
  },
  {
    q: "Is my signature stored?",
    a: "No. Your signature only exists in your browser memory and is embedded directly into the PDF locally.",
  },
];

export default function SignPdf() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureType, setSignatureType] = useState<"draw" | "type">("draw");
  const [typedSig, setTypedSig] = useState("");
  const [signaturePng, setSignaturePng] = useState<string | null>(null);

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x =
      "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y =
      "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x =
      "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y =
      "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const endDraw = () => {
    setIsDrawing(false);
    setSignaturePng(canvasRef.current?.toDataURL("image/png") || null);
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && canvasRef.current)
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setSignaturePng(null);
  };

  async function getSignatureDataUrl(): Promise<string> {
    if (signatureType === "draw") {
      if (!signaturePng) throw new Error("Please draw your signature first.");
      return signaturePng;
    }
    if (!typedSig.trim()) throw new Error("Please type your signature.");
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");
    ctx.font = "italic 48px Georgia, serif";
    ctx.fillStyle = "#10b981";
    ctx.fillText(typedSig, 20, 70);
    return canvas.toDataURL("image/png");
  }

  async function processFiles(
    files: File[],
    onProgress: (p: number) => void,
  ): Promise<ProcessResult> {
    const sigDataUrl = await getSignatureDataUrl();
    const file = files[0];
    onProgress(20);
    const buf = await file.arrayBuffer();
    const pdf = await PDFDocument.load(buf);
    onProgress(50);
    const pngData = sigDataUrl.split(",")[1];
    const pngBytes = Uint8Array.from(atob(pngData), (c) => c.charCodeAt(0));
    const img = await pdf.embedPng(pngBytes);
    const pages = pdf.getPages();
    const lastPage = pages[pages.length - 1];
    const { width } = lastPage.getSize();
    lastPage.drawImage(img, { x: width - 220, y: 30, width: 180, height: 60 });
    onProgress(90);
    const bytes = await pdf.save();
    onProgress(100);
    return {
      blob: new Blob([new Uint8Array(bytes)], { type: "application/pdf" }),
      filename: file.name.replace(".pdf", "-signed.pdf"),
    };
  }

  return (
    <ToolPageLayout
      toolId="sign-pdf"
      toolName="Sign PDF"
      description="Add your signature to any PDF document. Draw or type it — all in your browser."
      acceptedTypes=".pdf"
      processFiles={processFiles}
      faq={faq}
      optionsPanel={
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setSignatureType("draw")}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${signatureType === "draw" ? "bg-emerald-500 text-white border-emerald-500" : "border-border"}`}
            >
              Draw
            </button>
            <button
              type="button"
              onClick={() => setSignatureType("type")}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${signatureType === "type" ? "bg-emerald-500 text-white border-emerald-500" : "border-border"}`}
            >
              Type
            </button>
          </div>
          {signatureType === "draw" ? (
            <div>
              <canvas
                ref={canvasRef}
                width={400}
                height={120}
                className="w-full border border-border rounded-lg bg-background cursor-crosshair touch-none"
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
              />
              <button
                type="button"
                onClick={clearCanvas}
                className="mt-2 text-xs text-muted-foreground hover:text-foreground underline"
              >
                Clear
              </button>
            </div>
          ) : (
            <input
              type="text"
              value={typedSig}
              onChange={(e) => setTypedSig(e.target.value)}
              placeholder="Type your name"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm italic text-emerald-400"
              style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem" }}
            />
          )}
        </div>
      }
    />
  );
}
