import { r as reactExports, j as jsxRuntimeExports } from "./index-C8sWIOGs.js";
import { P as PDFDocument } from "./PDFButton-CyGT-MxZ.js";
import { T as ToolPageLayout } from "./ToolPageLayout-BM_HJUqq.js";
import "./DragDropZone-fVNtZ7PV.js";
import "./rotate-ccw-BKRtFsIR.js";
import "./circle-check-big-gr3Jto_s.js";
import "./ProgressBar-DDXECdLb.js";
import "./shield-zyNGSzxA.js";
import "./sparkles-DyT1m0fy.js";
const faq = [
  {
    q: "How do I sign the PDF?",
    a: "Draw your signature on the pad, or type it. The signature is placed on the last page by default."
  },
  {
    q: "Is this a legally binding signature?",
    a: "This creates a visual signature. For legal e-signatures, consult a legal professional or use a certified e-signature service."
  },
  {
    q: "Is my signature stored?",
    a: "No. Your signature only exists in your browser memory and is embedded directly into the PDF locally."
  }
];
function SignPdf() {
  const canvasRef = reactExports.useRef(null);
  const [isDrawing, setIsDrawing] = reactExports.useState(false);
  const [signatureType, setSignatureType] = reactExports.useState("draw");
  const [typedSig, setTypedSig] = reactExports.useState("");
  const [signaturePng, setSignaturePng] = reactExports.useState(null);
  const startDraw = (e) => {
    var _a;
    setIsDrawing(true);
    const ctx = (_a = canvasRef.current) == null ? void 0 : _a.getContext("2d");
    if (!ctx || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  const draw = (e) => {
    var _a;
    if (!isDrawing) return;
    const ctx = (_a = canvasRef.current) == null ? void 0 : _a.getContext("2d");
    if (!ctx || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 2;
    ctx.stroke();
  };
  const endDraw = () => {
    var _a;
    setIsDrawing(false);
    setSignaturePng(((_a = canvasRef.current) == null ? void 0 : _a.toDataURL("image/png")) || null);
  };
  const clearCanvas = () => {
    var _a;
    const ctx = (_a = canvasRef.current) == null ? void 0 : _a.getContext("2d");
    if (ctx && canvasRef.current)
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setSignaturePng(null);
  };
  async function getSignatureDataUrl() {
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
  async function processFiles(files, onProgress) {
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
      filename: file.name.replace(".pdf", "-signed.pdf")
    };
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolPageLayout,
    {
      toolId: "sign-pdf",
      toolName: "Sign PDF",
      description: "Add your signature to any PDF document. Draw or type it — all in your browser.",
      acceptedTypes: ".pdf",
      processFiles,
      faq,
      optionsPanel: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSignatureType("draw"),
              className: `px-4 py-2 rounded-lg border text-sm font-medium transition ${signatureType === "draw" ? "bg-emerald-500 text-white border-emerald-500" : "border-border"}`,
              children: "Draw"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSignatureType("type"),
              className: `px-4 py-2 rounded-lg border text-sm font-medium transition ${signatureType === "type" ? "bg-emerald-500 text-white border-emerald-500" : "border-border"}`,
              children: "Type"
            }
          )
        ] }),
        signatureType === "draw" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "canvas",
            {
              ref: canvasRef,
              width: 400,
              height: 120,
              className: "w-full border border-border rounded-lg bg-background cursor-crosshair touch-none",
              onMouseDown: startDraw,
              onMouseMove: draw,
              onMouseUp: endDraw,
              onMouseLeave: endDraw,
              onTouchStart: startDraw,
              onTouchMove: draw,
              onTouchEnd: endDraw
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: clearCanvas,
              className: "mt-2 text-xs text-muted-foreground hover:text-foreground underline",
              children: "Clear"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: typedSig,
            onChange: (e) => setTypedSig(e.target.value),
            placeholder: "Type your name",
            className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm italic text-emerald-400",
            style: { fontFamily: "Georgia, serif", fontSize: "1.2rem" }
          }
        )
      ] })
    }
  );
}
export {
  SignPdf as default
};
