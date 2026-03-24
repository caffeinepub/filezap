import { CheckCircle, FileText, Image, TrendingDown } from "lucide-react";

interface FilePreviewProps {
  fileName: string;
  originalSize: number;
  processedSize: number;
  isPdf?: boolean;
}

const fmt = (b: number) => {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(2)} MB`;
};

export default function FilePreview({
  fileName,
  originalSize,
  processedSize,
  isPdf,
}: FilePreviewProps) {
  const reduction =
    originalSize > 0 ? Math.round((1 - processedSize / originalSize) * 100) : 0;
  const Icon = isPdf ? FileText : Image;

  return (
    <div
      className="w-full bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4"
      data-ocid="tool.success_state"
    >
      <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      <div className="flex-1 min-w-0 text-center sm:text-left">
        <p className="font-medium truncate">{fileName}</p>
        <div className="flex items-center justify-center sm:justify-start gap-3 mt-1">
          <span className="text-sm text-muted-foreground">
            {fmt(originalSize)}
          </span>
          <TrendingDown className="w-4 h-4 text-accent" />
          <span className="text-sm font-semibold text-accent">
            {fmt(processedSize)}
          </span>
        </div>
      </div>
      {reduction > 0 && (
        <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-3 py-2 shrink-0">
          <CheckCircle className="w-4 h-4 text-accent" />
          <span className="text-sm font-semibold text-accent">
            -{reduction}%
          </span>
        </div>
      )}
    </div>
  );
}
