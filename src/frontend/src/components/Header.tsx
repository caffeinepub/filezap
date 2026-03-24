import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Menu, Moon, Palette, Sun, X, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { colorThemeOptions, useThemeColor } from "../contexts/ThemeContext";

const navLinks = [
  { label: "All Tools", href: "/" },
  { label: "PDF Tools", href: "/?category=pdf" },
  { label: "Image Tools", href: "/?category=image" },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { colorTheme, setColorTheme } = useThemeColor();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        paletteRef.current &&
        !paletteRef.current.contains(e.target as Node)
      ) {
        setPaletteOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleShare = () => {
    const text = `I just used BoltTools.app — works insanely fast! Check it out: ${window.location.origin}`;
    if (navigator.share) {
      navigator
        .share({ title: "BoltTools.app", text, url: window.location.origin })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md"
      data-ocid="header.panel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl"
          data-ocid="header.link"
        >
          <div className="w-8 h-8 brand-gradient rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="brand-gradient-text">BoltTools.app</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
              data-ocid="header.link"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary"
            data-ocid="header.button"
          >
            Share ❤️
          </button>

          {/* Theme Color Switcher */}
          <div ref={paletteRef} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="w-9 h-9"
              onClick={() => setPaletteOpen(!paletteOpen)}
              data-ocid="header.toggle"
              title="Change color theme"
            >
              <Palette className="w-4 h-4" />
            </Button>
            {paletteOpen && (
              <div
                className="absolute right-0 top-11 z-50 glass-panel rounded-xl p-3 shadow-xl flex flex-col gap-2 min-w-[180px]"
                data-ocid="header.popover"
              >
                <p className="text-xs font-semibold text-muted-foreground px-1 mb-1">
                  Color Theme
                </p>
                {colorThemeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setColorTheme(opt.id);
                      setPaletteOpen(false);
                    }}
                    className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors w-full text-left hover:bg-secondary/50 ${
                      colorTheme === opt.id ? "bg-secondary" : ""
                    }`}
                    data-ocid="header.radio"
                  >
                    <span
                      className="w-4 h-4 rounded-full shrink-0 block"
                      style={{
                        background: opt.color,
                        boxShadow:
                          colorTheme === opt.id
                            ? `0 0 0 2px white, 0 0 0 4px ${opt.color}`
                            : "none",
                      }}
                    />
                    <span
                      className={colorTheme === opt.id ? "font-semibold" : ""}
                    >
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9"
            data-ocid="header.toggle"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden w-9 h-9"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="header.button"
          >
            {mobileOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-3 flex flex-col gap-1">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary"
              data-ocid="header.link"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
