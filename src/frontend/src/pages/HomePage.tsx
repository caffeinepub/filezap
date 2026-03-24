import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Cpu,
  FileOutput,
  FileText,
  ImageIcon,
  Lock,
  Merge,
  Minimize2,
  Scissors,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import DragDropZone from "../components/DragDropZone";

const pdfTools = [
  {
    id: "compress-pdf",
    name: "Compress PDF",
    desc: "Shrink PDF size up to 70% instantly",
    icon: <Minimize2 className="w-5 h-5" />,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "merge-pdf",
    name: "Merge PDF",
    desc: "Combine multiple PDFs into one",
    icon: <Merge className="w-5 h-5" />,
    color: "from-violet-500 to-violet-600",
  },
  {
    id: "split-pdf",
    name: "Split PDF",
    desc: "Split pages into separate files",
    icon: <Scissors className="w-5 h-5" />,
    color: "from-pink-500 to-pink-600",
  },
  {
    id: "pdf-to-word",
    name: "PDF → Word",
    desc: "Extract text from PDF documents",
    icon: <FileOutput className="w-5 h-5" />,
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "pdf-to-jpg",
    name: "PDF → JPG",
    desc: "Convert PDF pages to images",
    icon: <ImageIcon className="w-5 h-5" />,
    color: "from-green-500 to-green-600",
  },
  {
    id: "add-watermark",
    name: "Add Watermark",
    desc: "Stamp text on every PDF page",
    icon: <FileText className="w-5 h-5" />,
    color: "from-teal-500 to-teal-600",
  },
];

const imageTools = [
  {
    id: "compress-image",
    name: "Compress Image",
    desc: "Lossless or lossy compression",
    icon: <Minimize2 className="w-5 h-5" />,
    color: "from-cyan-500 to-cyan-600",
  },
  {
    id: "resize-image",
    name: "Resize Image",
    desc: "Smart resize for any platform",
    icon: <ImageIcon className="w-5 h-5" />,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    id: "convert-image",
    name: "Convert Image",
    desc: "Convert between JPG, PNG, WebP",
    icon: <FileOutput className="w-5 h-5" />,
    color: "from-rose-500 to-rose-600",
  },
];

const trustBadges = [
  {
    icon: <Cpu className="w-5 h-5" />,
    label: "Processed Locally",
    sub: "Files never leave your device",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    label: "100% Private",
    sub: "Zero server uploads, ever",
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "No Sign-up",
    sub: "Just drop your file and go",
  },
];

const STARS = [1, 2, 3, 4, 5];

export default function HomePage() {
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  document.title =
    "BoltTools.app — Free All-in-One File Tools: Compress, Convert & Merge PDFs and Images";

  const handleFilesSelected = (f: File[]) => {
    setFiles(f);
    const file = f[0];
    if (!file) return;
    const isPdf = file.type === "application/pdf" || file.name.endsWith(".pdf");
    const isImage = file.type.startsWith("image/");
    if (isPdf) navigate({ to: "/compress-pdf" });
    else if (isImage) navigate({ to: "/compress-image" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 pb-12 px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 text-sm text-accent mb-6">
            <Zap className="w-3.5 h-3.5" />
            100% Free · No Signup · Instant Processing
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            All-in-One Smart
            <br />
            <span className="brand-gradient-text">File Tools</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-2">
            Compress, merge, convert &amp; edit files — 100% free, private, and
            blazing fast.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap text-sm text-muted-foreground mb-8">
            {[
              "No signup ever",
              "Files never leave your device",
              "Private & secure",
            ].map((b) => (
              <span key={b} className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-accent" />
                {b}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center gap-1 mb-10">
            {STARS.map((n) => (
              <Star
                key={n}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              Trusted by thousands daily
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <DragDropZone
            acceptedTypes=".pdf,.jpg,.jpeg,.png,.webp,.gif"
            onFilesSelected={handleFilesSelected}
            selectedFiles={files}
            label="Drop any file here — we'll figure out the best tool"
          />
        </motion.div>
      </section>

      {/* Social proof stats bar */}
      <div className="max-w-4xl mx-auto px-4 mb-4 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
        <span>📄 1M+ files processed</span>
        <span>🌍 Users in 50+ countries</span>
        <span>⚡ Avg. 2s processing time</span>
        <span>🔒 Zero server uploads, ever</span>
      </div>

      {/* Ad between hero and PDF tools */}
      <div className="adsense-placeholder max-w-4xl mx-auto px-4 mb-6">
        Advertisement
      </div>

      {/* PDF Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        <h2 className="text-2xl font-bold mb-1">PDF Tools</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Everything you need to work with PDF files
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pdfTools.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                to={`/${tool.id}` as "/"}
                className="group flex items-start gap-4 p-5 bg-card border border-border rounded-xl tool-card-hover"
                data-ocid={`tools.item.${i + 1}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shrink-0`}
                >
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold group-hover:text-accent transition-colors">
                    {tool.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{tool.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto shrink-0 group-hover:text-accent transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ad between PDF tools and Image tools */}
      <div className="adsense-placeholder max-w-4xl mx-auto px-4 mb-6">
        Advertisement
      </div>

      {/* Image Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        <h2 className="text-2xl font-bold mb-1">Image Tools</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Compress, resize and convert images instantly
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {imageTools.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                to={`/${tool.id}` as "/"}
                className="group flex items-start gap-4 p-5 bg-card border border-border rounded-xl tool-card-hover"
                data-ocid={`image-tools.item.${i + 1}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shrink-0`}
                >
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold group-hover:text-accent transition-colors">
                    {tool.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{tool.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto shrink-0 group-hover:text-accent transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {trustBadges.map((b) => (
            <div
              key={b.label}
              className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-xl"
            >
              <div className="w-12 h-12 brand-gradient rounded-xl flex items-center justify-center text-white mb-3">
                {b.icon}
              </div>
              <p className="font-semibold">{b.label}</p>
              <p className="text-sm text-muted-foreground mt-1">{b.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h2 className="text-2xl font-bold mb-2">
          Ready to bolt through your files?
        </h2>
        <p className="text-muted-foreground mb-6">
          Join thousands who use BoltTools.app daily. It's free, fast and
          private.
        </p>
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="h-12 px-8 text-base font-semibold brand-gradient border-0 text-white hover:opacity-90"
          data-ocid="home.primary_button"
        >
          <Zap className="w-5 h-5 mr-2" /> Get Started — It's Free
        </Button>
      </section>
    </div>
  );
}
