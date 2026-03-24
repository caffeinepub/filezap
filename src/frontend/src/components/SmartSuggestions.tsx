import { ArrowRight, Lightbulb } from "lucide-react";

interface Suggestion {
  label: string;
  href: string;
  highlight?: boolean;
}

function getSuggestions(files: File[], currentToolId: string): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const file = files[0];
  if (!file) return [];
  const isPdf = file.type === "application/pdf" || file.name.endsWith(".pdf");
  const isImage = file.type.startsWith("image/");
  const sizeMB = file.size / 1024 / 1024;

  if (isPdf) {
    if (sizeMB > 5 && currentToolId !== "compress-pdf")
      suggestions.push({
        label: "Reduce file size by up to 70%",
        href: "/compress-pdf",
        highlight: true,
      });
    if (currentToolId !== "pdf-to-word")
      suggestions.push({
        label: "Convert to Word for editing",
        href: "/pdf-to-word",
      });
    if (currentToolId !== "pdf-to-jpg")
      suggestions.push({
        label: "Convert pages to images",
        href: "/pdf-to-jpg",
      });
  }

  if (isImage) {
    if (sizeMB > 2 && currentToolId !== "compress-image")
      suggestions.push({
        label: "Compress to save storage space",
        href: "/compress-image",
        highlight: true,
      });
    if (currentToolId !== "resize-image")
      suggestions.push({
        label: "Optimize for WhatsApp sharing (1600px)",
        href: "/resize-image",
      });
    if (currentToolId !== "convert-image")
      suggestions.push({
        label: "Convert to WebP for faster web loading",
        href: "/convert-image",
      });
  }

  return suggestions.slice(0, 3);
}

export default function SmartSuggestions({
  files,
  currentToolId,
}: { files: File[]; currentToolId: string }) {
  const suggestions = getSuggestions(files, currentToolId);
  if (suggestions.length === 0) return null;

  return (
    <div
      className="w-full bg-secondary/50 rounded-xl p-4 border border-border"
      data-ocid="tool.panel"
    >
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-accent" />
        <span className="text-sm font-medium">Smart Suggestions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <a
            key={s.href}
            href={s.href}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors hover:bg-secondary ${
              s.highlight
                ? "border-accent/50 text-accent bg-accent/5"
                : "border-border text-muted-foreground"
            }`}
            data-ocid="tool.button"
          >
            {s.label}
            <ArrowRight className="w-3 h-3" />
          </a>
        ))}
      </div>
    </div>
  );
}
