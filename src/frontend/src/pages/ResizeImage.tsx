import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import ToolPageLayout, {
  type ProcessResult,
} from "../components/ToolPageLayout";

const PRESETS = [
  { label: "WhatsApp", width: 1600, height: 0 },
  { label: "Web Std", width: 1200, height: 0 },
  { label: "Thumbnail", width: 300, height: 300 },
  { label: "HD", width: 1920, height: 1080 },
];

function ResizeOptions({
  widthRef,
  heightRef,
}: {
  widthRef: React.MutableRefObject<number>;
  heightRef: React.MutableRefObject<number>;
}) {
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(0);
  widthRef.current = width;
  heightRef.current = height;
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <Button
            key={p.label}
            variant="outline"
            size="sm"
            onClick={() => {
              setWidth(p.width);
              setHeight(p.height);
            }}
            data-ocid="tool.button"
          >
            {p.label} ({p.width}
            {p.height ? `×${p.height}` : "px"})
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="rw" className="mb-1.5 block text-sm">
            Width (px)
          </Label>
          <Input
            id="rw"
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            min={1}
            data-ocid="tool.input"
          />
        </div>
        <div>
          <Label htmlFor="rh" className="mb-1.5 block text-sm">
            Height (0 = auto)
          </Label>
          <Input
            id="rh"
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            min={0}
            data-ocid="tool.input"
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Set height to 0 to maintain aspect ratio.
      </p>
    </div>
  );
}

async function resizeImageFile(
  file: File,
  targetWidth: number,
  targetHeight: number,
  onProgress: (p: number) => void,
): Promise<ProcessResult> {
  onProgress(10);
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      onProgress(40);
      const aspect = img.naturalWidth / img.naturalHeight;
      const w = targetWidth || img.naturalWidth;
      const h = targetHeight || Math.round(w / aspect);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(objectUrl);
      onProgress(80);
      const isJpeg = file.type === "image/jpeg";
      const mime = isJpeg ? "image/jpeg" : "image/png";
      const ext = isJpeg ? "jpg" : "png";
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Resize failed"));
            return;
          }
          onProgress(100);
          const baseName = file.name.replace(/\.[^.]+$/, "");
          resolve({ blob, filename: `${baseName}-${w}x${h}.${ext}` });
        },
        mime,
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

export default function ResizeImage() {
  const widthRef = useRef(1200);
  const heightRef = useRef(0);

  const processFiles = async (
    files: File[],
    onProgress: (p: number) => void,
  ): Promise<ProcessResult> => {
    return resizeImageFile(
      files[0],
      widthRef.current,
      heightRef.current,
      onProgress,
    );
  };

  const faq = [
    {
      q: "Will my image be cropped?",
      a: "No. If you set height to 0, we maintain the original aspect ratio. If you set both dimensions, the image is stretched to fit exactly.",
    },
    {
      q: "What is the WhatsApp preset?",
      a: "1600px wide is the optimal resolution for sharing on WhatsApp — it looks sharp on all phones without creating unnecessarily large files.",
    },
    {
      q: "What formats are supported?",
      a: "JPG, PNG, WebP, and GIF. Output is saved as the same format as the input.",
    },
    {
      q: "Can I upscale an image?",
      a: "Yes, but upscaling adds no new detail — it just increases the pixel count. For upscaling with quality improvement, AI upscaling tools work better.",
    },
  ];

  return (
    <ToolPageLayout
      toolId="resize-image"
      toolName="Resize Image"
      description="Resize images to any dimension or use smart presets for WhatsApp, web, and thumbnails."
      acceptedTypes=".jpg,.jpeg,.png,.webp,.gif"
      processFiles={processFiles}
      faq={faq}
      optionsPanel={<ResizeOptions widthRef={widthRef} heightRef={heightRef} />}
    />
  );
}
