import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";
import { CheckCircle, Clock, Download, RotateCcw, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import type { MergeResult } from "../store/useMergeStore";

interface HistoryItem {
  name: string;
  size: number;
  date: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function MergeResultScreen({
  result,
  onReset,
}: {
  result: MergeResult;
  onReset: () => void;
}) {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const item: HistoryItem = {
      name: result.filename,
      size: result.resultSize,
      date: new Date().toISOString(),
    };
    const raw = localStorage.getItem("bolttools_merge_history");
    const prev: HistoryItem[] = raw ? JSON.parse(raw) : [];
    const updated = [item, ...prev].slice(0, 5);
    localStorage.setItem("bolttools_merge_history", JSON.stringify(updated));
    setHistory(updated);
  }, [result]);

  const savedPct =
    result.originalSize > 0
      ? Math.round((1 - result.resultSize / result.originalSize) * 100)
      : 0;

  const handleDownload = () => {
    saveAs(result.blob, result.filename);
  };

  return (
    <div className="flex flex-col gap-6" data-ocid="merge.success_state">
      {/* Success header */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-9 h-9 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold">Your PDF is ready!</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Processed entirely on your device. Ready to download.
        </p>
      </div>

      {/* Size comparison */}
      <div className="bg-card border border-border rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="text-muted-foreground text-sm">
            Before:{" "}
            <span className="text-foreground font-semibold">
              {formatSize(result.originalSize)}
            </span>
          </span>
          <span className="text-muted-foreground">→</span>
          <span className="text-muted-foreground text-sm">
            After:{" "}
            <span className="text-emerald-400 font-semibold">
              {formatSize(result.resultSize)}
            </span>
          </span>
          {savedPct > 0 && (
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-2.5 py-0.5 text-xs font-semibold">
              Saved {savedPct}%
            </span>
          )}
        </div>
      </div>

      {/* Primary CTA */}
      <Button
        onClick={handleDownload}
        className="h-13 text-base font-semibold bg-emerald-500 hover:bg-emerald-600 border-0 text-white w-full py-4"
        data-ocid="merge.primary_button"
      >
        <Download className="w-5 h-5 mr-2" />
        Download Merged PDF
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        🔒 Your file was processed entirely on your device. Nothing was
        uploaded.
      </p>

      {/* AdSense placeholder */}
      <div className="adsense-placeholder">Advertisement</div>

      {/* Next tool suggestion */}
      <a
        href="/compress-pdf"
        className="flex items-center gap-3 bg-card border border-border rounded-xl p-4 hover:border-emerald-500/40 transition-colors group"
        data-ocid="merge.link"
      >
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm group-hover:text-emerald-400 transition-colors">
            Now compress your PDF →
          </p>
          <p className="text-xs text-muted-foreground">
            Reduce file size by up to 70%
          </p>
        </div>
      </a>

      {/* Download history */}
      {history.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            Recent Merges
          </h3>
          <div className="flex flex-col gap-2">
            {history.map((item, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: stable history list
                key={i}
                className="flex items-center justify-between text-xs text-muted-foreground bg-secondary/30 rounded-lg px-3 py-2"
                data-ocid={`merge.item.${i + 1}`}
              >
                <span className="truncate max-w-[200px]">{item.name}</span>
                <div className="flex items-center gap-3 shrink-0">
                  <span>{formatSize(item.size)}</span>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Merge another */}
      <Button
        variant="outline"
        onClick={onReset}
        className="w-full"
        data-ocid="merge.secondary_button"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Merge Another File
      </Button>
    </div>
  );
}
