import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Cpu,
  FileImage,
  FileOutput,
  FileText,
  FileType,
  GripVertical,
  HardDrive,
  Hash,
  ImageIcon,
  Lock,
  Merge,
  Minimize2,
  PenLine,
  RotateCcw,
  Scissors,
  ShieldCheck,
  ShieldOff,
  Smartphone,
  Table2,
  Trash2,
  Unlock,
  UserX,
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
    id: "pdf-to-png",
    name: "PDF → PNG",
    desc: "Convert PDF pages to PNG",
    icon: <ImageIcon className="w-5 h-5" />,
    color: "from-lime-500 to-lime-600",
  },
  {
    id: "add-watermark",
    name: "Add Watermark",
    desc: "Stamp text on every PDF page",
    icon: <FileText className="w-5 h-5" />,
    color: "from-teal-500 to-teal-600",
  },
  {
    id: "rotate-pdf",
    name: "Rotate PDF",
    desc: "Rotate pages 90°, 180° or 270°",
    icon: <RotateCcw className="w-5 h-5" />,
    color: "from-sky-500 to-sky-600",
  },
  {
    id: "protect-pdf",
    name: "Protect PDF",
    desc: "Add password to your PDF",
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "from-red-500 to-red-600",
  },
  {
    id: "unlock-pdf",
    name: "Unlock PDF",
    desc: "Remove password from PDF",
    icon: <Unlock className="w-5 h-5" />,
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: "remove-pages",
    name: "Remove Pages",
    desc: "Delete specific PDF pages",
    icon: <Trash2 className="w-5 h-5" />,
    color: "from-rose-500 to-rose-600",
  },
  {
    id: "reorder-pages",
    name: "Reorder Pages",
    desc: "Change PDF page order",
    icon: <GripVertical className="w-5 h-5" />,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "add-page-numbers",
    name: "Add Page Numbers",
    desc: "Stamp page numbers on PDF",
    icon: <Hash className="w-5 h-5" />,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    id: "sign-pdf",
    name: "Sign PDF",
    desc: "Draw or type your signature",
    icon: <PenLine className="w-5 h-5" />,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: "word-to-pdf",
    name: "Word to PDF",
    desc: "Convert .docx documents to PDF",
    icon: <FileType className="w-5 h-5" />,
    color: "from-blue-600 to-blue-700",
  },
  {
    id: "excel-to-pdf",
    name: "Excel to PDF",
    desc: "Convert .xlsx spreadsheets to PDF",
    icon: <Table2 className="w-5 h-5" />,
    color: "from-green-600 to-green-700",
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
  {
    id: "jpg-to-pdf",
    name: "JPG to PDF",
    desc: "Convert JPG images to PDF",
    icon: <FileText className="w-5 h-5" />,
    color: "from-amber-500 to-amber-600",
  },
  {
    id: "png-to-pdf",
    name: "PNG to PDF",
    desc: "Convert PNG images to PDF",
    icon: <FileText className="w-5 h-5" />,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: "image-to-pdf",
    name: "Images to PDF",
    desc: "Combine multiple images into PDF",
    icon: <FileImage className="w-5 h-5" />,
    color: "from-violet-500 to-violet-600",
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

const featureCards = [
  {
    icon: <ShieldOff className="w-6 h-6" />,
    title: "No Upload Ever",
    desc: "Your files stay on your device. Always.",
    glow: "from-emerald-500/25 via-emerald-600/10 to-transparent",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Processing",
    desc: "Results in seconds, not minutes. No server queues.",
    glow: "from-yellow-500/25 via-yellow-600/10 to-transparent",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "100% Private",
    desc: "Zero network requests. Zero tracking. Zero risk.",
    glow: "from-blue-500/25 via-blue-600/10 to-transparent",
  },
  {
    icon: <UserX className="w-6 h-6" />,
    title: "No Account Needed",
    desc: "Drop your file and go. No signup, no email.",
    glow: "from-violet-500/25 via-violet-600/10 to-transparent",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Works on Mobile",
    desc: "Optimized for mobile. Fast even on older phones.",
    glow: "from-sky-500/25 via-sky-600/10 to-transparent",
  },
  {
    icon: <HardDrive className="w-6 h-6" />,
    title: "No File Size Limits",
    desc: "Limited only by your device's RAM.",
    glow: "from-rose-500/25 via-rose-600/10 to-transparent",
  },
];

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
    <div className="w-full bg-[#09090b] text-white">
      {/* HERO */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <img
          src="/assets/generated/hero.dim_1920x1080.jpg"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-400 mb-6">
              <Zap className="w-3.5 h-3.5" />
              20+ Tools · 100% Free · No Signup · Instant Processing
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
              Merge &amp; Compress PDFs Instantly —{" "}
              <span className="text-emerald-400">No Upload Required</span>
            </h1>
            <p className="mt-4 text-gray-300 max-w-xl text-lg">
              Process your files directly in your browser. Fast, private, and
              secure.
            </p>
            <div className="mt-6 flex gap-4 flex-wrap justify-center">
              <Link to="/merge-pdf">
                <button
                  type="button"
                  className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2"
                >
                  <Merge className="w-4 h-4" /> Merge PDF
                </button>
              </Link>
              <Link to="/compress-pdf">
                <button
                  type="button"
                  className="border border-gray-600 px-6 py-3 rounded-xl hover:bg-gray-800 transition flex items-center gap-2"
                >
                  <Minimize2 className="w-4 h-4" /> Compress PDF
                </button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-400">
              🔒 No uploads • ⚡ Instant • 📱 Works on mobile
            </p>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-10 w-full max-w-2xl"
            >
              <DragDropZone
                acceptedTypes=".pdf,.jpg,.jpeg,.png,.webp,.gif"
                onFilesSelected={handleFilesSelected}
                selectedFiles={files}
                label="Or drop any file — we'll pick the right tool automatically"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* AD */}
      <div className="adsense-placeholder max-w-4xl mx-auto px-4 py-6">
        Advertisement
      </div>

      {/* PDF TOOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-2xl font-bold mb-1">PDF Tools</h2>
        <p className="text-gray-400 text-sm mb-6">
          Everything you need to work with PDF files — {pdfTools.length} tools,
          all free
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pdfTools.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={`/${tool.id}` as "/"}
                className="group flex items-start gap-4 p-5 bg-gray-900 border border-gray-800 rounded-xl hover:border-emerald-500/40 hover:bg-gray-800/80 transition-all"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shrink-0`}
                >
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold group-hover:text-emerald-400 transition-colors text-sm">
                    {tool.name}
                  </p>
                  <p className="text-xs text-gray-400">{tool.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 ml-auto shrink-0 group-hover:text-emerald-400 transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AD */}
      <div className="adsense-placeholder max-w-4xl mx-auto px-4 mb-6">
        Advertisement
      </div>

      {/* IMAGE TOOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        <h2 className="text-2xl font-bold mb-1">Image Tools</h2>
        <p className="text-gray-400 text-sm mb-6">
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
                className="group flex items-start gap-4 p-5 bg-gray-900 border border-gray-800 rounded-xl hover:border-emerald-500/40 hover:bg-gray-800/80 transition-all"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shrink-0`}
                >
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold group-hover:text-emerald-400 transition-colors">
                    {tool.name}
                  </p>
                  <p className="text-sm text-gray-400">{tool.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 ml-auto shrink-0 group-hover:text-emerald-400 transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {trustBadges.map((b) => (
            <div
              key={b.label}
              className="flex flex-col items-center text-center p-6 bg-gray-900 border border-gray-800 rounded-xl"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white mb-3">
                {b.icon}
              </div>
              <p className="font-semibold">{b.label}</p>
              <p className="text-sm text-gray-400 mt-1">{b.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY BOLTTOOLS — FEATURE CARD GRID */}
      <section className="bg-[#09090b] py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-emerald-500 mb-3">
              Built Different
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Choose <span className="text-emerald-400">BoltTools</span>?
            </h2>
            <p className="mt-3 text-gray-400 max-w-xl mx-auto">
              Everything you'd expect from a professional tool — without the
              compromises.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featureCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur-sm p-6 cursor-default transition-colors hover:border-emerald-500/40"
              >
                {/* Glow blob */}
                <div
                  className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${card.glow} blur-2xl opacity-60 group-hover:opacity-90 transition-opacity`}
                />

                {/* Icon */}
                <div className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                  {card.icon}
                </div>

                {/* Text */}
                <h3 className="relative z-10 text-lg font-bold text-white mb-2">
                  {card.title}
                </h3>
                <p className="relative z-10 text-sm text-gray-400 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14 text-center">
        <h2 className="text-2xl font-bold mb-2">
          Ready to bolt through your files?
        </h2>
        <p className="text-gray-400 mb-6">
          20+ free tools. No signup. No uploads. All private.
        </p>
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="h-12 px-8 text-base font-semibold bg-emerald-500 hover:bg-emerald-600 border-0 text-white"
        >
          <Zap className="w-5 h-5 mr-2" /> Get Started — It's Free
        </Button>
      </section>
    </div>
  );
}
