import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  FileOutput,
  FileText,
  ImageIcon,
  Merge,
  Minimize2,
  Scissors,
} from "lucide-react";

const ALL_TOOLS = [
  {
    id: "compress-pdf",
    name: "Compress PDF",
    desc: "Shrink PDF size up to 70%",
    color: "from-blue-500 to-blue-600",
    icon: <Minimize2 className="w-5 h-5" />,
    category: "pdf",
  },
  {
    id: "merge-pdf",
    name: "Merge PDF",
    desc: "Combine multiple PDFs into one",
    color: "from-violet-500 to-violet-600",
    icon: <Merge className="w-5 h-5" />,
    category: "pdf",
  },
  {
    id: "split-pdf",
    name: "Split PDF",
    desc: "Split pages into separate files",
    color: "from-pink-500 to-pink-600",
    icon: <Scissors className="w-5 h-5" />,
    category: "pdf",
  },
  {
    id: "pdf-to-word",
    name: "PDF → Word",
    desc: "Extract text from PDF documents",
    color: "from-orange-500 to-orange-600",
    icon: <FileOutput className="w-5 h-5" />,
    category: "pdf",
  },
  {
    id: "pdf-to-jpg",
    name: "PDF → JPG",
    desc: "Convert PDF pages to images",
    color: "from-green-500 to-green-600",
    icon: <ImageIcon className="w-5 h-5" />,
    category: "pdf",
  },
  {
    id: "add-watermark",
    name: "Add Watermark",
    desc: "Stamp text on every PDF page",
    color: "from-teal-500 to-teal-600",
    icon: <FileText className="w-5 h-5" />,
    category: "pdf",
  },
  {
    id: "compress-image",
    name: "Compress Image",
    desc: "Lossless or lossy compression",
    color: "from-cyan-500 to-cyan-600",
    icon: <Minimize2 className="w-5 h-5" />,
    category: "image",
  },
  {
    id: "resize-image",
    name: "Resize Image",
    desc: "Smart resize for any platform",
    color: "from-indigo-500 to-indigo-600",
    icon: <ImageIcon className="w-5 h-5" />,
    category: "image",
  },
  {
    id: "convert-image",
    name: "Convert Image",
    desc: "Convert between JPG, PNG, WebP",
    color: "from-rose-500 to-rose-600",
    icon: <FileOutput className="w-5 h-5" />,
    category: "image",
  },
];

interface RelatedToolsProps {
  currentToolId: string;
}

export default function RelatedTools({ currentToolId }: RelatedToolsProps) {
  const current = ALL_TOOLS.find((t) => t.id === currentToolId);
  const sameCategory = ALL_TOOLS.filter(
    (t) => t.id !== currentToolId && t.category === current?.category,
  );
  const otherCategory = ALL_TOOLS.filter(
    (t) => t.id !== currentToolId && t.category !== current?.category,
  );
  const related = [...sameCategory, ...otherCategory].slice(0, 3);

  return (
    <div className="mt-10">
      <h2 className="text-lg font-bold mb-4">You might also need</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((tool) => (
          <Link
            key={tool.id}
            to={`/${tool.id}` as "/"}
            className="group flex items-start gap-4 p-5 bg-card border border-border rounded-xl tool-card-hover"
            data-ocid={`related.${tool.id.replace(/-/g, "_")}.link`}
          >
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shrink-0`}
            >
              {tool.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold group-hover:text-accent transition-colors text-sm">
                {tool.name}
              </p>
              <p className="text-xs text-muted-foreground">{tool.desc}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto shrink-0 group-hover:text-accent transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
