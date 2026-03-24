import { Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useActor } from "../hooks/useActor";

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

function LiveTicker() {
  const { actor } = useActor();
  const [count, setCount] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchCount = async () => {
      if (!actor) return;
      try {
        const a = actor as any;
        if (typeof a.getHourlyFileCount === "function") {
          const c = await a.getHourlyFileCount();
          if (mounted) setCount(Number(c));
        }
      } catch {
        // ignore
      }
    };
    fetchCount();
    return () => {
      mounted = false;
    };
  }, [actor]);

  // Simulate increments — intentionally run once on mount only
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally run once
  useEffect(() => {
    const base = Math.floor(Math.random() * (183 - 47 + 1)) + 47;
    setCount((prev) => prev ?? base);
    const tick = () => {
      const delay = Math.floor(Math.random() * (15000 - 8000 + 1)) + 8000;
      intervalRef.current = setTimeout(() => {
        setCount((prev) => (prev ?? base) + 1);
        tick();
      }, delay);
    };
    tick();
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);

  return (
    <div className="w-full border-b border-border bg-secondary/30 py-2 px-4 text-center text-xs text-muted-foreground">
      <span>⚡ </span>
      <span className="ticker-number font-bold text-foreground">
        {count ?? "..."}
      </span>
      <span> files processed in the last hour</span>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "bolttools")}`;

  return (
    <footer className="border-t border-border bg-card mt-20">
      <LiveTicker />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-xl mb-3">
              <div className="w-7 h-7 brand-gradient rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="brand-gradient-text">BoltTools.app</span>
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

          {/* Platform */}
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

          {/* Partner Tools */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Partner Tools</h3>
            <p className="text-xs text-muted-foreground mb-2">
              affiliate links
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://acrobat.adobe.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Adobe Acrobat ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.canva.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Canva ↗
                </a>
              </li>
              <li>
                <a
                  href="https://smallpdf.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Smallpdf ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.ilovepdf.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  iLovePDF ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            © {year} BoltTools.app. All files processed locally in your browser.
            🔒
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
