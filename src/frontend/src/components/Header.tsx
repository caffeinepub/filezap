import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, X, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

const navLinks = [
  { label: "All Tools", href: "/" },
  { label: "PDF Tools", href: "/?category=pdf" },
  { label: "Image Tools", href: "/?category=image" },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleShare = () => {
    const text = `I just used FileZap — works insanely fast! Check it out: ${window.location.origin}`;
    if (navigator.share) {
      navigator
        .share({ title: "FileZap", text, url: window.location.origin })
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
          <span className="brand-gradient-text">FileZap</span>
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
