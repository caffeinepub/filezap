import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Copy, Heart } from "lucide-react";
import { useState } from "react";
import { SiWhatsapp, SiX } from "react-icons/si";

interface SharePopupProps {
  open: boolean;
  onClose: () => void;
  toolName: string;
}

export default function SharePopup({
  open,
  onClose,
  toolName,
}: SharePopupProps) {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;
  const shareText = `I just used ${toolName} on FileZap — works insanely fast and 100% free! No signup needed 🚀 Try it: ${url}`;

  const copy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareX = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      "_blank",
    );
  };

  const shareWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`,
      "_blank",
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-ocid="share.dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-400" />
            This saved you time?
          </DialogTitle>
          <DialogDescription>
            Share FileZap and help others discover it! 🚀
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          <div className="bg-secondary rounded-lg p-3 text-sm text-muted-foreground mb-4 break-words">
            {shareText}
          </div>
          <div className="flex flex-col gap-2">
            <Button
              onClick={copy}
              className="w-full"
              data-ocid="share.primary_button"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              {copied ? "Copied!" : "Copy Share Link"}
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={shareX}
                data-ocid="share.button"
              >
                <SiX className="w-4 h-4 mr-2" /> Share on X
              </Button>
              <Button
                variant="outline"
                onClick={shareWhatsApp}
                data-ocid="share.button"
              >
                <SiWhatsapp className="w-4 h-4 mr-2" /> WhatsApp
              </Button>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              data-ocid="share.close_button"
            >
              Maybe later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
