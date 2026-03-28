import { r as reactExports, j as jsxRuntimeExports } from "./index-C3IzVc7X.js";
import { I as Input } from "./input-HyNPk72K.js";
import { L as Label } from "./label-NBTYVn2E.js";
import { S as Slider } from "./slider-C1yWi8Em.js";
import { P as PDFDocument, S as StandardFonts, d as degrees, r as rgb } from "./PDFButton-Cn_sX00S.js";
import { T as ToolPageLayout } from "./ToolPageLayout-D8s2yPNi.js";
import "./index-IXOTxK3N.js";
import "./index-DuY3Dh2d.js";
import "./index-BGVnHF8k.js";
import "./DragDropZone-CNGUWUQx.js";
import "./rotate-ccw-DewqcoPc.js";
import "./circle-check-big-DY8_6VGT.js";
import "./ProgressBar-BxMG3U6M.js";
import "./shield-CEFWVC6y.js";
import "./sparkles--tk4gFEy.js";
function WatermarkOptions({
  textRef,
  opacityRef
}) {
  const [text, setText] = reactExports.useState("CONFIDENTIAL");
  const [opacity, setOpacity] = reactExports.useState(30);
  textRef.current = text;
  opacityRef.current = opacity;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "wm-text", className: "mb-1.5 block text-sm", children: "Watermark Text" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "wm-text",
          value: text,
          onChange: (e) => setText(e.target.value),
          placeholder: "CONFIDENTIAL",
          "data-ocid": "tool.input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "mb-1.5 block text-sm", children: [
        "Opacity: ",
        opacity,
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          min: 5,
          max: 80,
          step: 5,
          value: [opacity],
          onValueChange: ([v]) => setOpacity(v),
          className: "w-full",
          "data-ocid": "tool.select"
        }
      )
    ] })
  ] });
}
function AddWatermark() {
  const textRef = reactExports.useRef("CONFIDENTIAL");
  const opacityRef = reactExports.useRef(30);
  const processFiles = async (files, onProgress) => {
    const file = files[0];
    const wmText = textRef.current || "CONFIDENTIAL";
    const opacity = opacityRef.current / 100;
    onProgress(10);
    const buf = await file.arrayBuffer();
    onProgress(30);
    const pdfDoc = await PDFDocument.load(buf);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const pages = pdfDoc.getPages();
    onProgress(50);
    const step = 40 / pages.length;
    pages.forEach((page, i) => {
      const { width, height } = page.getSize();
      const fontSize = Math.min(width, height) * 0.1;
      const textWidth = font.widthOfTextAtSize(wmText, fontSize);
      const textHeight = font.heightAtSize(fontSize);
      page.drawText(wmText, {
        x: width / 2 - textWidth / 2,
        y: height / 2 - textHeight / 2,
        size: fontSize,
        font,
        color: rgb(0.5, 0.5, 0.5),
        opacity,
        rotate: degrees(45)
      });
      onProgress(50 + step * (i + 1));
    });
    const pdfBytes = await pdfDoc.save();
    onProgress(100);
    const blob = new Blob([new Uint8Array(pdfBytes)], {
      type: "application/pdf"
    });
    return { blob, filename: file.name.replace(".pdf", "-watermarked.pdf") };
  };
  const faq = [
    {
      q: "Where is the watermark placed?",
      a: "The watermark text is stamped diagonally across the center of every page at 45 degrees."
    },
    {
      q: "Can I customize the watermark?",
      a: "Yes — enter any text and adjust the opacity slider. Positioning and font size are auto-calculated based on page size."
    },
    {
      q: "Does the watermark affect the original file?",
      a: "No. We create a new copy of your PDF with the watermark added. Your original file is unchanged."
    },
    {
      q: "Can I add an image as a watermark?",
      a: "Currently only text watermarks are supported. Image watermark support is on our roadmap."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolPageLayout,
    {
      toolId: "add-watermark",
      toolName: "Add Watermark to PDF",
      description: "Stamp custom text on every page of your PDF. Diagonal, semi-transparent, professional.",
      acceptedTypes: ".pdf",
      processFiles,
      faq,
      optionsPanel: /* @__PURE__ */ jsxRuntimeExports.jsx(WatermarkOptions, { textRef, opacityRef })
    }
  );
}
export {
  AddWatermark as default
};
