import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const messages = [
  "Crunching numbers...",
  "Optimizing pixels...",
  "Compressing data...",
  "Almost there...",
  "Finalizing your file...",
  "Applying magic...",
  "Removing unnecessary bits...",
  "Polishing the output...",
];

export default function ProgressBar({
  progress,
  isActive,
}: { progress: number; isActive: boolean }) {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const id = setInterval(
      () => setMsgIdx((i) => (i + 1) % messages.length),
      1800,
    );
    return () => clearInterval(id);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      className="w-full flex flex-col items-center gap-3 py-6"
      data-ocid="tool.loading_state"
    >
      <Progress value={progress} className="w-full max-w-md h-2" />
      <p className="text-sm text-muted-foreground animate-pulse">
        {messages[msgIdx]}
      </p>
      <p className="text-xs text-muted-foreground">{Math.round(progress)}%</p>
    </div>
  );
}
