import { Zap } from "lucide-react";

const pdfTools = [
  { label: "Compress PDF", href: "/compress-pdf" },
  { label: "Merge PDF", href: "/merge-pdf" },
  { label: "Split PDF", href: "/split-pdf" },
  { label: "PDF to Word", href: "/pdf-to-word" },
  { label: "PDF to JPG", href: "/pdf-to-jpg" },
  { label: "Add Watermark", href: "/add-watermark" },
];

const imageTools = [
  { label: "Compress Image", href: "/compress-image" },
  { label: "Resize Image", href: "/resize-image" },
  { label: "Convert Image", href: "/convert-image" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "filezap")}`;

  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-3">
              <div className="w-7 h-7 brand-gradient rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="brand-gradient-text">FileZap</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The fastest, most private file toolkit on the web. No signup. No
              uploads. Pure speed.
            </p>
          </div>

          {/* PDF Tools */}
          <div>
            <h3 className="text-sm font-semibold mb-3">PDF Tools</h3>
            <ul className="space-y-2">
              {pdfTools.map((t) => (
                <li key={t.href}>
                  <a
                    href={t.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Tools */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Image Tools</h3>
            <ul className="space-y-2">
              {imageTools.map((t) => (
                <li key={t.href}>
                  <a
                    href={t.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Platform</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/admin"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Admin
                </a>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            © {year} FileZap. All files processed locally in your browser. 🔒
          </span>
          <a
            href={utm}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
