import { Button } from "@/components/ui/button";
import { Download, RotateCcw, Share2, Shield, Sparkles } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import DragDropZone from "./DragDropZone";
import FilePreview from "./FilePreview";
import ProgressBar from "./ProgressBar";
import RelatedTools from "./RelatedTools";
import SharePopup from "./SharePopup";
import SmartSuggestions from "./SmartSuggestions";

export interface ProcessResult {
  blob: Blob;
  filename: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

interface ToolPageLayoutProps {
  toolId: string;
  toolName: string;
  description: string;
  acceptedTypes: string;
  multiple?: boolean;
  processFiles: (
    files: File[],
    onProgress: (p: number) => void,
  ) => Promise<ProcessResult>;
  faq: FaqItem[];
  optionsPanel?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function ToolPageLayout({
  toolId,
  toolName,
  description,
  acceptedTypes,
  multiple,
  processFiles,
  faq,
  optionsPanel,
  icon,
}: ToolPageLayoutProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showShare, setShowShare] = useState(false);
  const downloadAnchorRef = useRef<HTMLAnchorElement | null>(null);
  const { actor } = useActor();
  const isPdf = acceptedTypes.includes(".pdf");

  const saveLastTool = useCallback(() => {
    localStorage.setItem("filezap_last_tool", toolId);
    localStorage.setItem("filezap_last_tool_name", toolName);
    localStorage.setItem("filezap_last_tool_path", `/${toolId}`);
  }, [toolId, toolName]);

  const handleFilesSelected = (selected: File[]) => {
    setFiles(selected);
    setResult(null);
    setError(null);
    setOriginalSize(selected.reduce((acc, f) => acc + f.size, 0));
    saveLastTool();
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setProgress(0);
    setError(null);
    try {
      const res = await processFiles(files, setProgress);
      setResult(res);
      setProgress(100);
      toast.success("File processed successfully!");
      actor?.recordToolUsage(toolId).catch(() => {});
      // Use recordFileTyped if available, fall back to recordFile
      const a = actor as any;
      if (typeof a?.recordFileTyped === "function") {
        a.recordFileTyped(isPdf ? "pdf" : "image").catch(() => {});
      } else {
        actor?.recordFile().catch(() => {});
      }
      if (typeof a?.recordMagicButtonClick === "function") {
        a.recordMagicButtonClick().catch(() => {});
      }
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Processing failed. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    setShowShare(true);
    toast.info("📌 Bookmark BoltTools.app to use it again instantly!", {
      duration: 4000,
    });
    const ac = actor as any;
    if (typeof ac?.recordSharePopup === "function") {
      ac.recordSharePopup().catch(() => {});
    }
    downloadAnchorRef.current = null;
  };

  const handleReset = () => {
    setFiles([]);
    setResult(null);
    setError(null);
    setProgress(0);
  };

  const handleShareOpen = () => {
    setShowShare(true);
    const ac = actor as any;
    if (typeof ac?.recordSharePopup === "function") {
      ac.recordSharePopup().catch(() => {});
    }
  };

  document.title = `${toolName} — Free Online Tool | BoltTools.app`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-8">
        {icon && <div className="flex justify-center mb-4">{icon}</div>}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">{toolName}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="flex items-center justify-center gap-2 mb-8 text-xs text-muted-foreground bg-secondary/50 rounded-full px-4 py-2 w-fit mx-auto border border-border">
        <Shield className="w-3.5 h-3.5 text-accent" />
        <span>
          Your files are processed entirely in your browser — we never see,
          store, or upload your files. 🔒
        </span>
      </div>

      {optionsPanel && !isProcessing && !result && (
        <div className="mb-6">{optionsPanel}</div>
      )}

      {!isProcessing && !result && (
        <DragDropZone
          acceptedTypes={acceptedTypes}
          multiple={multiple}
          onFilesSelected={handleFilesSelected}
          selectedFiles={files}
        />
      )}

      {files.length > 0 && !isProcessing && !result && (
        <div className="mt-4">
          <SmartSuggestions files={files} currentToolId={toolId} />
        </div>
      )}

      {files.length > 0 && !isProcessing && !result && (
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleProcess}
            className="flex-1 h-12 text-base font-semibold brand-gradient border-0 text-white hover:opacity-90"
            data-ocid="tool.primary_button"
          >
            <Sparkles className="w-5 h-5 mr-2" />✨ Make this file perfect
          </Button>
          <Button
            variant="outline"
            onClick={handleProcess}
            className="flex-1 h-12"
            data-ocid="tool.submit_button"
          >
            Process File{files.length > 1 ? "s" : ""}
          </Button>
        </div>
      )}

      {isProcessing && (
        <div className="mt-6">
          <Button
            className="w-full h-12 text-base font-semibold brand-gradient border-0 text-white magic-glow-animate cursor-not-allowed"
            disabled
            data-ocid="tool.loading_state"
          >
            <Sparkles className="w-5 h-5 mr-2 animate-spin" /> Processing...
          </Button>
          <ProgressBar progress={progress} isActive={isProcessing} />
        </div>
      )}

      {error && (
        <div
          className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-xl text-sm text-destructive"
          data-ocid="tool.error_state"
        >
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 flex flex-col gap-4">
          <FilePreview
            fileName={result.filename}
            originalSize={originalSize}
            processedSize={result.blob.size}
            isPdf={isPdf}
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleDownload}
              className="flex-1 h-12 text-base font-semibold brand-gradient border-0 text-white hover:opacity-90"
              data-ocid="tool.primary_button"
            >
              <Download className="w-5 h-5 mr-2" />
              Download File
            </Button>
            <Button
              variant="outline"
              onClick={handleShareOpen}
              className="h-12"
              data-ocid="tool.button"
            >
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Button
              variant="ghost"
              onClick={handleReset}
              className="h-12"
              data-ocid="tool.secondary_button"
            >
              <RotateCcw className="w-4 h-4 mr-2" /> New File
            </Button>
          </div>
        </div>
      )}

      <SharePopup
        open={showShare}
        onClose={() => setShowShare(false)}
        toolName={toolName}
      />

      <RelatedTools currentToolId={toolId} />

      <div className="adsense-placeholder mt-10">Advertisement</div>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4">
          {faq.map((item, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: stable FAQ items
              key={i}
              className="bg-card border border-border rounded-xl p-5"
              data-ocid={`tool.item.${i + 1}`}
            >
              <h3 className="font-semibold mb-1">{item.q}</h3>
              <p className="text-sm text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="adsense-placeholder mt-8">Advertisement</div>
    </div>
  );
}
