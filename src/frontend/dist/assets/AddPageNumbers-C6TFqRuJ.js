import { r as reactExports, j as jsxRuntimeExports } from "./index-C3IzVc7X.js";
import { P as PDFDocument, S as StandardFonts, r as rgb } from "./PDFButton-Cn_sX00S.js";
import { T as ToolPageLayout } from "./ToolPageLayout-D8s2yPNi.js";
import "./DragDropZone-CNGUWUQx.js";
import "./rotate-ccw-DewqcoPc.js";
import "./circle-check-big-DY8_6VGT.js";
import "./ProgressBar-BxMG3U6M.js";
import "./shield-CEFWVC6y.js";
import "./sparkles--tk4gFEy.js";
const faq = [
  {
    q: "Where are the page numbers placed?",
    a: "You can choose bottom center, bottom right, top center, or top right."
  },
  {
    q: "Can I start from a number other than 1?",
    a: "Yes, set your starting number in the options."
  },
  {
    q: "Is the original PDF modified?",
    a: "No. A new PDF is generated with page numbers added. Your original is untouched."
  }
];
function AddPageNumbers() {
  const [position, setPosition] = reactExports.useState("bottom-center");
  const [startNum, setStartNum] = reactExports.useState(1);
  const [fontSize, setFontSize] = reactExports.useState(12);
  async function processFiles(files, onProgress) {
    const file = files[0];
    onProgress(20);
    const buf = await file.arrayBuffer();
    const pdf = await PDFDocument.load(buf);
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const pages = pdf.getPages();
    onProgress(50);
    pages.forEach((page, i) => {
      const { width, height } = page.getSize();
      const text = String(startNum + i);
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      let x;
      let y;
      switch (position) {
        case "bottom-center":
          x = (width - textWidth) / 2;
          y = 20;
          break;
        case "bottom-right":
          x = width - textWidth - 20;
          y = 20;
          break;
        case "top-center":
          x = (width - textWidth) / 2;
          y = height - 30;
          break;
        case "top-right":
          x = width - textWidth - 20;
          y = height - 30;
          break;
        default:
          x = (width - textWidth) / 2;
          y = 20;
      }
      page.drawText(text, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(0.3, 0.3, 0.3)
      });
    });
    onProgress(90);
    const bytes = await pdf.save();
    onProgress(100);
    return {
      blob: new Blob([new Uint8Array(bytes)], { type: "application/pdf" }),
      filename: file.name.replace(".pdf", "-numbered.pdf")
    };
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolPageLayout,
    {
      toolId: "add-page-numbers",
      toolName: "Add Page Numbers",
      description: "Stamp page numbers onto every page of your PDF. Free, private, instant.",
      acceptedTypes: ".pdf",
      processFiles,
      faq,
      optionsPanel: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "page-num-position",
              className: "text-sm font-medium block mb-2",
              children: "Position"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "page-num-position",
              value: position,
              onChange: (e) => setPosition(e.target.value),
              className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "bottom-center", children: "Bottom Center" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "bottom-right", children: "Bottom Right" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "top-center", children: "Top Center" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "top-right", children: "Top Right" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "page-num-start",
              className: "text-sm font-medium block mb-2",
              children: "Start Number"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "page-num-start",
              type: "number",
              min: 1,
              value: startNum,
              onChange: (e) => setStartNum(Number(e.target.value)),
              className: "w-24 px-3 py-2 rounded-lg border border-border bg-background text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "page-num-size",
              className: "text-sm font-medium block mb-2",
              children: "Font Size"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "page-num-size",
              type: "number",
              min: 8,
              max: 24,
              value: fontSize,
              onChange: (e) => setFontSize(Number(e.target.value)),
              className: "w-24 px-3 py-2 rounded-lg border border-border bg-background text-sm"
            }
          )
        ] })
      ] })
    }
  );
}
export {
  AddPageNumbers as default
};
