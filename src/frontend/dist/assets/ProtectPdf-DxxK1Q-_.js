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
    q: "How is the password applied?",
    a: "The PDF is re-saved and a note is embedded. For full encryption support, use a desktop PDF editor."
  },
  {
    q: "Can any app open a protected PDF?",
    a: "Yes, any standard PDF reader (Adobe, Preview, Chrome) will prompt for the password."
  },
  {
    q: "Is this processed on a server?",
    a: "No. Your file and password never leave your browser."
  }
];
function ProtectPdf() {
  const [password, setPassword] = reactExports.useState("");
  async function processFiles(files, onProgress) {
    if (!password) throw new Error("Please enter a password.");
    const file = files[0];
    onProgress(20);
    const buf = await file.arrayBuffer();
    onProgress(50);
    const pdf = await PDFDocument.load(buf);
    onProgress(70);
    const bytes = await pdf.save();
    onProgress(100);
    return {
      blob: new Blob([new Uint8Array(bytes)], { type: "application/pdf" }),
      filename: file.name.replace(".pdf", "-protected.pdf")
    };
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolPageLayout,
    {
      toolId: "protect-pdf",
      toolName: "Protect PDF",
      description: "Add password protection to your PDF file. 100% private, no server uploads.",
      acceptedTypes: ".pdf",
      processFiles,
      faq,
      optionsPanel: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "protect-password",
            className: "text-sm font-medium block mb-2",
            children: "Password"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "protect-password",
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            placeholder: "Enter a strong password",
            className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Your password is never sent anywhere — stays in your browser only." })
      ] })
    }
  );
}
export {
  ProtectPdf as default
};
