import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef, useState } from "react";
import ToolPageLayout, {
  type ProcessResult,
} from "../components/ToolPageLayout";

const FORMATS = [
  { value: "image/jpeg", ext: "jpg", label: "JPG — Best for photos" },
  { value: "image/png", ext: "png", label: "PNG — Lossless with transparency" },
  {
    value: "image/webp",
    ext: "webp",
    label: "WebP — Modern web format (smaller)",
  },
];

function ConvertOptions({
  formatRef,
}: { formatRef: React.MutableRefObject<string> }) {
  const [format, setFormat] = useState("image/webp");
  formatRef.current = format;
  const handleChange = (v: string) => {
    setFormat(v);
    formatRef.current = v;
  };
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <Label className="mb-2 block text-sm">Output Format</Label>
      <Select value={format} onValueChange={handleChange}>
        <SelectTrigger className="w-full" data-ocid="tool.select">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {FORMATS.map((f) => (
            <SelectItem key={f.value} value={f.value}>
              {f.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

async function convertImageFile(
  file: File,
  targetMime: string,
  onProgress: (p: number) => void,
): Promise<ProcessResult> {
  onProgress(10);
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      onProgress(40);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      if (targetMime !== "image/png") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(objectUrl);
      onProgress(75);
      const format = FORMATS.find((f) => f.value === targetMime);
      const ext = format?.ext ?? "jpg";
      const baseName = file.name.replace(/\.[^.]+$/, "");
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Conversion failed"));
            return;
          }
          onProgress(100);
          resolve({ blob, filename: `${baseName}.${ext}` });
        },
        targetMime,
        0.92,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };
    img.src = objectUrl;
  });
}

export default function ConvertImage() {
  const formatRef = useRef("image/webp");

  const processFiles = async (
    files: File[],
    onProgress: (p: number) => void,
  ): Promise<ProcessResult> => {
    return convertImageFile(files[0], formatRef.current, onProgress);
  };

  const faq = [
    {
      q: "Why convert to WebP?",
      a: "WebP images are typically 25-35% smaller than JPEG at the same quality, and up to 80% smaller than PNG. All modern browsers support WebP.",
    },
    {
      q: "Will I lose transparency when converting to JPG?",
      a: "Yes. JPG does not support transparency — transparent areas will be filled with white. Use PNG or WebP to preserve transparency.",
    },
    {
      q: "What formats can I convert from?",
      a: "You can convert from any common image format: JPG, PNG, WebP, GIF, BMP, and TIFF.",
    },
    {
      q: "Is there any quality loss?",
      a: "Converting to PNG is lossless. Converting to JPG or WebP may have slight quality loss depending on the compression level.",
    },
  ];

  return (
    <ToolPageLayout
      toolId="convert-image"
      toolName="Convert Image Format"
      description="Convert images between JPG, PNG, and WebP formats instantly in your browser."
      acceptedTypes=".jpg,.jpeg,.png,.webp,.gif,.bmp"
      processFiles={processFiles}
      faq={faq}
      optionsPanel={<ConvertOptions formatRef={formatRef} />}
    />
  );
}
