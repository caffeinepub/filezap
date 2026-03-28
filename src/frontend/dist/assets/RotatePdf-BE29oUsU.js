import { r as reactExports, j as jsxRuntimeExports } from "./index-BvMqnfhD.js";
import { P as PDFDocument, d as degrees } from "./PDFButton-DTO3xMX5.js";
import { T as ToolPageLayout } from "./ToolPageLayout-D7eEkHs8.js";
import "./DragDropZone-pzKI25H8.js";
import "./rotate-ccw-Bmx2dr2A.js";
import "./circle-check-big-BCkoZsdf.js";
import "./ProgressBar-C2XzB2ev.js";
import "./shield-CBuBy4yV.js";
import "./sparkles-DcVQ6SrG.js";
const faq = [
  {
    q: "Can I rotate individual pages?",
    a: "Yes, choose 'All pages' or enter specific page numbers before processing."
  },
  {
    q: "Does rotation affect PDF quality?",
    a: "No. Rotation is a metadata change in pdf-lib — no re-encoding occurs."
  },
  {
    q: "Is my file uploaded anywhere?",
    a: "Never. Everything runs in your browser memory."
  }
];
function RotatePdf() {
  const [angle, setAngle] = reactExports.useState(90);
  const [pages, setPages] = reactExports.useState("");
  async function processFiles(files, onProgress) {
    const file = files[0];
    onProgress(10);
    const buf = await file.arrayBuffer();
    onProgress(30);
    const pdf = await PDFDocument.load(buf);
    const pageCount = pdf.getPageCount();
    onProgress(50);
    let targets;
    if (pages.trim() === "") {
      targets = Array.from({ length: pageCount }, (_, i) => i);
    } else {
      targets = pages.split(",").flatMap((p) => {
        const r = p.trim().split("-");
        if (r.length === 2) {
          const start = Number.parseInt(r[0]) - 1;
          const end = Number.parseInt(r[1]) - 1;
          return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        }
        return [Number.parseInt(p.trim()) - 1];
      }).filter((n) => n >= 0 && n < pageCount);
    }
    for (const idx of targets) {
      const page = pdf.getPage(idx);
      page.setRotation(degrees((page.getRotation().angle + angle) % 360));
    }
    onProgress(80);
    const bytes = await pdf.save();
    onProgress(100);
    return {
      blob: new Blob([new Uint8Array(bytes)], { type: "application/pdf" }),
      filename: file.name.replace(".pdf", "-rotated.pdf")
    };
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolPageLayout,
    {
      toolId: "rotate-pdf",
      toolName: "Rotate PDF",
      description: "Rotate pages in your PDF by 90°, 180° or 270°. Works offline, no uploads.",
      acceptedTypes: ".pdf",
      processFiles,
      faq,
      optionsPanel: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-2", children: "Rotation Angle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [90, 180, 270].map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setAngle(a),
              className: `px-4 py-2 rounded-lg border text-sm font-medium transition ${angle === a ? "bg-emerald-500 text-white border-emerald-500" : "border-border hover:bg-secondary"}`,
              children: [
                a,
                "°"
              ]
            },
            a
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "rotate-pages",
              className: "text-sm font-medium block mb-2",
              children: "Pages (leave blank for all)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "rotate-pages",
              type: "text",
              value: pages,
              onChange: (e) => setPages(e.target.value),
              placeholder: "e.g. 1,3,5-8",
              className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
            }
          )
        ] })
      ] })
    }
  );
}
export {
  RotatePdf as default
};
