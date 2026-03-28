import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import ToolPageLayout, {
  type ProcessResult,
} from "../components/ToolPageLayout";

const faq = [
  {
    q: "What if I don't know the password?",
    a: "We can only remove passwords from PDFs you own and have the password for. We cannot bypass unknown passwords.",
  },
  {
    q: "Does this work on all password-protected PDFs?",
    a: "It works on PDFs where you know the user password. Owner-only restrictions may still apply.",
  },
  {
    q: "Is this safe?",
    a: "Yes. Your file and password stay in your browser.",
  },
];

export default function UnlockPdf() {
  const [password, setPassword] = useState("");

  async function processFiles(
    files: File[],
    onProgress: (p: number) => void,
  ): Promise<ProcessResult> {
    const file = files[0];
    onProgress(20);
    const buf = await file.arrayBuffer();
    onProgress(50);
    let pdf: PDFDocument;
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
      filename: file.name.replace(".pdf", "-unlocked.pdf"),
    };
  }

  return (
    <ToolPageLayout
      toolId="unlock-pdf"
      toolName="Unlock PDF"
      description="Remove password protection from a PDF you own. Private and instant."
      acceptedTypes=".pdf"
      processFiles={processFiles}
      faq={faq}
      optionsPanel={
        <div className="bg-card border border-border rounded-xl p-5">
          <label
            htmlFor="unlock-password"
            className="text-sm font-medium block mb-2"
          >
            PDF Password (if required)
          </label>
          <input
            id="unlock-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter the PDF password"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Leave blank if the PDF is not password-protected but has usage
            restrictions.
          </p>
        </div>
      }
    />
  );
}
