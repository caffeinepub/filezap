import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { useState } from "react";
import ToolPageLayout, {
  type ProcessResult,
} from "../components/ToolPageLayout";

const faq = [
  {
    q: "Where are the page numbers placed?",
    a: "You can choose bottom center, bottom right, top center, or top right.",
  },
  {
    q: "Can I start from a number other than 1?",
    a: "Yes, set your starting number in the options.",
  },
  {
    q: "Is the original PDF modified?",
    a: "No. A new PDF is generated with page numbers added. Your original is untouched.",
  },
];

type Position = "bottom-center" | "bottom-right" | "top-center" | "top-right";

export default function AddPageNumbers() {
  const [position, setPosition] = useState<Position>("bottom-center");
  const [startNum, setStartNum] = useState(1);
  const [fontSize, setFontSize] = useState(12);

  async function processFiles(
    files: File[],
    onProgress: (p: number) => void,
  ): Promise<ProcessResult> {
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
      let x: number;
      let y: number;
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
        color: rgb(0.3, 0.3, 0.3),
      });
    });
    onProgress(90);
    const bytes = await pdf.save();
    onProgress(100);
    return {
      blob: new Blob([new Uint8Array(bytes)], { type: "application/pdf" }),
      filename: file.name.replace(".pdf", "-numbered.pdf"),
    };
  }

  return (
    <ToolPageLayout
      toolId="add-page-numbers"
      toolName="Add Page Numbers"
      description="Stamp page numbers onto every page of your PDF. Free, private, instant."
      acceptedTypes=".pdf"
      processFiles={processFiles}
      faq={faq}
      optionsPanel={
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label
              htmlFor="page-num-position"
              className="text-sm font-medium block mb-2"
            >
              Position
            </label>
            <select
              id="page-num-position"
              value={position}
              onChange={(e) => setPosition(e.target.value as Position)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
            >
              <option value="bottom-center">Bottom Center</option>
              <option value="bottom-right">Bottom Right</option>
              <option value="top-center">Top Center</option>
              <option value="top-right">Top Right</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="page-num-start"
              className="text-sm font-medium block mb-2"
            >
              Start Number
            </label>
            <input
              id="page-num-start"
              type="number"
              min={1}
              value={startNum}
              onChange={(e) => setStartNum(Number(e.target.value))}
              className="w-24 px-3 py-2 rounded-lg border border-border bg-background text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="page-num-size"
              className="text-sm font-medium block mb-2"
            >
              Font Size
            </label>
            <input
              id="page-num-size"
              type="number"
              min={8}
              max={24}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-24 px-3 py-2 rounded-lg border border-border bg-background text-sm"
            />
          </div>
        </div>
      }
    />
  );
}
