import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useRef, useState } from "react";
import ToolPageLayout, {
  type ProcessResult,
} from "../components/ToolPageLayout";

function CompressOptions({
  lossyRef,
  qualityRef,
}: {
  lossyRef: React.MutableRefObject<boolean>;
  qualityRef: React.MutableRefObject<number>;
}) {
  const [lossy, setLossy] = useState(true);
  const [quality, setQuality] = useState(75);
  lossyRef.current = lossy;
  qualityRef.current = quality;
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm">Lossy compression (smaller size)</Label>
        <Switch
          checked={lossy}
          onCheckedChange={setLossy}
          data-ocid="tool.switch"
        />
      </div>
      {lossy && (
        <div>
          <Label className="mb-1.5 block text-sm">Quality: {quality}%</Label>
          <Slider
            min={30}
            max={95}
            step={5}
            value={[quality]}
            onValueChange={([v]) => setQuality(v)}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}

async function compressImageFile(
  file: File,
  lossy: boolean,
  quality: number,
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
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(objectUrl);
      onProgress(70);
      const mimeType = lossy ? "image/jpeg" : "image/png";
      const q = lossy ? quality / 100 : undefined;
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Compression failed"));
            return;
          }
          onProgress(100);
          const ext = lossy ? "jpg" : "png";
          const baseName = file.name.replace(/\.[^.]+$/, "");
          resolve({ blob, filename: `${baseName}-compressed.${ext}` });
        },
        mimeType,
        q,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };
    img.src = objectUrl;
  });
}

export default function CompressImage() {
  const lossyRef = useRef(true);
  const qualityRef = useRef(75);

  const processFiles = async (
    files: File[],
    onProgress: (p: number) => void,
  ): Promise<ProcessResult> => {
    return compressImageFile(
      files[0],
      lossyRef.current,
      qualityRef.current,
      onProgress,
    );
  };

  const faq = [
    {
      q: "What is lossy vs lossless compression?",
      a: "Lossy compression (JPEG) significantly reduces file size by discarding some image data. Lossless (PNG) reduces size without any quality loss but achieves less compression.",
    },
    {
      q: "What quality setting should I use?",
      a: "For web use, 70-80% is a great balance of quality and size. For print, use 85-95%. For thumbnails, 60-70% works well.",
    },
    {
      q: "Which image formats are supported?",
      a: "JPG, PNG, WebP, and GIF are all supported for upload. Output is JPEG (lossy) or PNG (lossless).",
    },
    {
      q: "How much can I reduce my image size?",
      a: "Lossy compression at 75% quality typically reduces size by 60-80%. Results vary based on image content.",
    },
  ];

  return (
    <ToolPageLayout
      toolId="compress-image"
      toolName="Compress Image"
      description="Reduce image file size with lossless or lossy compression. Fast, free, and private."
      acceptedTypes=".jpg,.jpeg,.png,.webp,.gif"
      processFiles={processFiles}
      faq={faq}
      optionsPanel={
        <CompressOptions lossyRef={lossyRef} qualityRef={qualityRef} />
      }
    />
  );
}
