import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  Copy,
  Facebook,
  Link2,
  Mail,
  Share2,
  Twitter,
} from "lucide-react";
import { useState } from "react";
import { useReferral } from "../contexts/ReferralContext";

interface ShareInviteModalProps {
  open: boolean;
  onClose: () => void;
}

function CopyButton({ value, ocid }: { value: string; ocid: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="shrink-0 gap-1.5 transition-all"
      data-ocid={ocid}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-green-500" />
          <span className="text-green-500">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          Copy
        </>
      )}
    </Button>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
      role="img"
      aria-label="WhatsApp"
    >
      <title>WhatsApp</title>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ShareInviteModal({
  open,
  onClose,
}: ShareInviteModalProps) {
  const { myRefLink, referralVisits } = useReferral();
  const appLink = window.location.origin;

  const shareMessage = `I use BoltTools.app to compress PDFs and images for free — no signup needed! Try it: ${myRefLink}`;
  const [messageCopied, setMessageCopied] = useState(false);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(shareMessage).then(() => {
      setMessageCopied(true);
      setTimeout(() => setMessageCopied(false), 2000);
    });
  };

  const socialLinks = [
    {
      label: "WhatsApp",
      icon: <WhatsAppIcon />,
      href: `https://wa.me/?text=${encodeURIComponent(`Check out BoltTools.app - free file tools, no signup! ${myRefLink}`)}`,
      color:
        "hover:bg-green-600/20 hover:border-green-500/50 hover:text-green-400",
    },
    {
      label: "Twitter / X",
      icon: <Twitter className="w-4 h-4" />,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent("Free file tools — compress PDFs, resize images, no signup! Check out BoltTools.app")}&url=${encodeURIComponent(myRefLink)}`,
      color: "hover:bg-sky-600/20 hover:border-sky-500/50 hover:text-sky-400",
    },
    {
      label: "Facebook",
      icon: <Facebook className="w-4 h-4" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(myRefLink)}`,
      color:
        "hover:bg-blue-700/20 hover:border-blue-600/50 hover:text-blue-400",
    },
    {
      label: "Email",
      icon: <Mail className="w-4 h-4" />,
      href: `mailto:?subject=${encodeURIComponent("Free file tools — no signup!")}&body=${encodeURIComponent(`Check out BoltTools.app: ${myRefLink}`)}`,
      color:
        "hover:bg-rose-600/20 hover:border-rose-500/50 hover:text-rose-400",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="sm:max-w-md gap-0 p-0 overflow-hidden"
        data-ocid="share.modal"
      >
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2.5 text-lg">
            <div className="w-8 h-8 brand-gradient rounded-lg flex items-center justify-center shrink-0">
              <Share2 className="w-4 h-4 text-white" />
            </div>
            Share BoltTools.app
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Share with friends and track who you bring in.
          </p>
        </DialogHeader>

        <Separator />

        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Section 1: App Link */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <Link2 className="w-3.5 h-3.5" />
              Your App Link
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 min-w-0 bg-secondary border border-border rounded-lg px-3 py-2 text-sm font-mono text-foreground/80 truncate">
                {appLink}
              </div>
              <CopyButton value={appLink} ocid="share.primary_button" />
            </div>
          </div>

          {/* Section 2: Referral Link */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <Share2 className="w-3.5 h-3.5" />
              Your Referral Link
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 min-w-0 bg-secondary border border-border rounded-lg px-3 py-2 text-sm font-mono text-foreground/80 truncate">
                {myRefLink}
              </div>
              <CopyButton value={myRefLink} ocid="share.secondary_button" />
            </div>
            <p className="text-xs text-muted-foreground">
              {referralVisits === 0
                ? "No visits via your link yet — start sharing!"
                : `✨ ${referralVisits} ${
                    referralVisits === 1 ? "person has" : "people have"
                  } visited via your link`}
            </p>
          </div>

          {/* Section 3: Social Share */}
          <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Share On
            </div>
            <div className="grid grid-cols-4 gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border border-border text-muted-foreground text-xs transition-all ${s.color}`}
                  data-ocid="share.button"
                >
                  {s.icon}
                  <span className="leading-none">{s.label.split(" ")[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Section 4: Copy Message */}
          <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Ready-to-Send Message
            </div>
            <div className="bg-secondary border border-border rounded-xl p-3 text-sm text-foreground/80 leading-relaxed">
              {shareMessage}
            </div>
            <Button
              onClick={handleCopyMessage}
              className="w-full gap-2 brand-gradient text-white border-0 hover:opacity-90 transition-opacity"
              data-ocid="share.submit_button"
            >
              {messageCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  Message Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Share Message
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
