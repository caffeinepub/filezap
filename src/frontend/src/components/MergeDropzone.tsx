import { FileText, Upload } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMergeStore } from "../store/useMergeStore";

export default function MergeDropzone() {
  const addFiles = useMergeStore((s) => s.addFiles);

  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted.length > 0) addFiles(accepted);
    },
    [addFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
  });

  return (
    <div className="flex flex-col gap-3">
      <div
        {...getRootProps()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-200 ${
          isDragActive
            ? "border-emerald-400 bg-emerald-950/20 shadow-[0_0_0_1px_oklch(0.72_0.18_155/0.4),0_0_40px_oklch(0.72_0.18_155/0.15)]"
            : "border-border bg-card/40 hover:border-emerald-500/40 hover:bg-emerald-950/10"
        } backdrop-blur-sm`}
        data-ocid="merge.dropzone"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
              isDragActive ? "bg-emerald-500/20" : "bg-secondary"
            }`}
          >
            {isDragActive ? (
              <Upload className="w-7 h-7 text-emerald-400" />
            ) : (
              <FileText className="w-7 h-7 text-muted-foreground" />
            )}
          </div>
          <div>
            <p className="text-lg font-semibold">
              {isDragActive ? "Drop PDFs here" : "Drop PDFs here"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse files
            </p>
          </div>
          <button
            type="button"
            className="sm:hidden mt-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
            data-ocid="merge.upload_button"
          >
            Tap to select PDFs
          </button>
        </div>
      </div>
      <p className="text-xs text-center text-muted-foreground">
        🔒 No uploads. No tracking. No risk.{" "}
        <span className="text-emerald-400">
          Your files never leave your device.
        </span>
      </p>
    </div>
  );
}
