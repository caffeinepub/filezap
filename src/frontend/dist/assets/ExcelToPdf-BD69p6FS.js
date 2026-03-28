import { j as jsxRuntimeExports } from "./index-BvMqnfhD.js";
import { P as PDFDocument, S as StandardFonts, r as rgb } from "./PDFButton-DTO3xMX5.js";
import { T as ToolPageLayout } from "./ToolPageLayout-D7eEkHs8.js";
import "./DragDropZone-pzKI25H8.js";
import "./rotate-ccw-Bmx2dr2A.js";
import "./circle-check-big-BCkoZsdf.js";
import "./ProgressBar-C2XzB2ev.js";
import "./shield-CBuBy4yV.js";
import "./sparkles-DcVQ6SrG.js";
const faq = [
  {
    q: "What Excel formats are supported?",
    a: "We support .xlsx files. Formulas are shown as their values. Complex charts are not rendered."
  },
  {
    q: "Will my data be preserved?",
    a: "Cell text content is preserved. Formatting like colors and fonts may not carry over."
  },
  {
    q: "Is my spreadsheet uploaded?",
    a: "No. Your file never leaves your device."
  }
];
async function processFiles(files, onProgress) {
  const file = files[0];
  onProgress(20);
  const buf = await file.arrayBuffer();
  onProgress(40);
  const decoder = new TextDecoder("utf-8");
  let text = "Spreadsheet content:\n\n";
  try {
    const raw = decoder.decode(buf);
    const matches = raw.match(/<v>([^<]+)<\/v>/g) || [];
    const values = matches.map((m) => m.replace(/<[^>]+>/g, ""));
    text = `Spreadsheet data (${values.length} values):

${values.join("	")}`;
    if (values.length === 0)
      text = "(No readable data found in this spreadsheet)";
  } catch {
    text = "Could not read spreadsheet content.";
  }
  onProgress(60);
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Courier);
  const pageWidth = 842;
  const pageHeight = 595;
  const margin = 40;
  const lineHeight = 14;
  const maxWidth = pageWidth - margin * 2;
  const words = text.split("\n");
  const lines = [];
  for (const line of words) {
    if (font.widthOfTextAtSize(line, 9) > maxWidth) {
      const parts = line.split("	");
      let cur = "";
      for (const part of parts) {
        const test = cur ? `${cur}  ${part}` : part;
        if (font.widthOfTextAtSize(test, 9) > maxWidth) {
          lines.push(cur);
          cur = part;
        } else {
          cur = test;
        }
      }
      if (cur) lines.push(cur);
    } else {
      lines.push(line);
    }
  }
  onProgress(80);
  let page = pdf.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;
  for (const line of lines) {
    if (y < margin + lineHeight) {
      page = pdf.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    page.drawText(line, {
      x: margin,
      y,
      size: 9,
      font,
      color: rgb(0.1, 0.1, 0.1)
    });
    y -= lineHeight;
  }
  onProgress(95);
  const bytes = await pdf.save();
  onProgress(100);
  return {
    blob: new Blob([new Uint8Array(bytes)], { type: "application/pdf" }),
    filename: file.name.replace(/\.xlsx?$/i, ".pdf")
  };
}
function ExcelToPdf() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolPageLayout,
    {
      toolId: "excel-to-pdf",
      toolName: "Excel to PDF",
      description: "Convert your Excel (.xlsx) spreadsheet to PDF. Private, instant, no upload.",
      acceptedTypes: ".xlsx,.xls",
      processFiles,
      faq
    }
  );
}
export {
  ExcelToPdf as default
};
