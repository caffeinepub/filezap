import { Button } from "@/components/ui/button";
import { CloudUpload, FileText, Image, X } from "lucide-react";
import { useCallback, useState } from "react";

interface DragDropZoneProps {
  acceptedTypes: string;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
  selectedFiles?: File[];
  label?: string;
}

const MAX_SIZE_MB = 50;

function validateFile(file: File): string | null {
  if (file.size > MAX_SIZE_MB * 1024 * 1024)
    return `File too large. Max ${MAX_SIZE_MB}MB.`;
  return null;
}

export default function DragDropZone({
  acceptedTypes,
  multiple,
  onFilesSelected,
  selectedFiles,
  label,
}: DragDropZoneProps) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      setError(null);
      const arr = Array.from(files);
      for (const f of arr) {
        const err = validateFile(f);
        if (err) {
          setError(err);
          return;
        }
      }
      onFilesSelected(arr);
    },
    [onFilesSelected],
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const triggerInput = () => document.getElementById("filezap-input")?.click();

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  const isPdf = acceptedTypes.includes(".pdf");

  return (
    <div className="w-full">
      <div
        data-ocid="tool.dropzone"
        aria-label="File upload zone"
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={triggerInput}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") triggerInput();
        }}
        className={`relative brand-border-gradient rounded-2xl p-8 md:p-12 text-center cursor-pointer transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent ${
          dragging
            ? "dropzone-glow scale-[1.01] bg-secondary/50"
            : "bg-card hover:bg-secondary/30"
        }`}
      >
        <input
          id="filezap-input"
          type="file"
          accept={acceptedTypes}
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          data-ocid="tool.upload_button"
        />

        {selectedFiles && selectedFiles.length > 0 ? (
          // biome-ignore lint/a11y/useKeyWithClickEvents: stops propagation only
          <div
            className="flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedFiles.map((f, i) => (
              <div
                key={`${f.name}-${i}`}
                className="flex items-center gap-3 bg-secondary rounded-xl px-4 py-3 w-full max-w-md"
              >
                {isPdf ? (
                  <FileText className="w-5 h-5 text-accent shrink-0" />
                ) : (
                  <Image className="w-5 h-5 text-accent shrink-0" />
                )}
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium truncate">{f.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatSize(f.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilesSelected(
                      selectedFiles.filter((_, idx) => idx !== i),
                    );
                  }}
                  className="shrink-0 text-muted-foreground hover:text-foreground"
                  data-ocid="tool.delete_button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            {multiple && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById("filezap-input")?.click();
                }}
                data-ocid="tool.upload_button"
              >
                Add more files
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 pointer-events-none">
            <div className="w-16 h-16 brand-gradient rounded-2xl flex items-center justify-center">
              <CloudUpload className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold mb-1">
                {label || "Drag & Drop Files Here"}
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse • Max {MAX_SIZE_MB}MB
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isPdf ? (
                <span className="px-2 py-1 bg-secondary rounded text-xs font-mono text-muted-foreground">
                  PDF
                </span>
              ) : (
                <>
                  <span className="px-2 py-1 bg-secondary rounded text-xs font-mono text-muted-foreground">
                    JPG
                  </span>
                  <span className="px-2 py-1 bg-secondary rounded text-xs font-mono text-muted-foreground">
                    PNG
                  </span>
                  <span className="px-2 py-1 bg-secondary rounded text-xs font-mono text-muted-foreground">
                    WebP
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {error && (
        <p
          className="mt-2 text-sm text-destructive text-center"
          data-ocid="tool.error_state"
        >
          {error}
        </p>
      )}
    </div>
  );
}
