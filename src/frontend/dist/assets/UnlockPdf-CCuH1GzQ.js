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
    q: "What if I don't know the password?",
    a: "We can only remove passwords from PDFs you own and have the password for. We cannot bypass unknown passwords."
  },
  {
    q: "Does this work on all password-protected PDFs?",
    a: "It works on PDFs where you know the user password. Owner-only restrictions may still apply."
  },
  {
    q: "Is this safe?",
    a: "Yes. Your file and password stay in your browser."
  }
];
function UnlockPdf() {
  const [password, setPassword] = reactExports.useState("");
  async function processFiles(files, onProgress) {
    const file = files[0];
    onProgress(20);
    const buf = await file.arrayBuffer();
    onProgress(50);
    let pdf;
    try {
      pdf = await PDFDocument.load(buf);
    } catch {
      throw new Error("Could not open PDF. Check the password and try again.");
    }
    onProgress(80);
    const bytes = await pdf.save();
    onProgress(100);
    return {
      blob: new Blob([new Uint8Array(bytes)], { type: "application/pdf" }),
      filename: file.name.replace(".pdf", "-unlocked.pdf")
    };
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolPageLayout,
    {
      toolId: "unlock-pdf",
      toolName: "Unlock PDF",
      description: "Remove password protection from a PDF you own. Private and instant.",
      acceptedTypes: ".pdf",
      processFiles,
      faq,
      optionsPanel: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "unlock-password",
            className: "text-sm font-medium block mb-2",
            children: "PDF Password (if required)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "unlock-password",
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            placeholder: "Enter the PDF password",
            className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Leave blank if the PDF is not password-protected but has usage restrictions." })
      ] })
    }
  );
}
export {
  UnlockPdf as default
};
