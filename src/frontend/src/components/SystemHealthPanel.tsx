import { Shield } from "lucide-react";

interface SystemHealthPanelProps {
  networkRequests: number;
  dataSent: number;
  isProcessing: boolean;
}

export default function SystemHealthPanel({
  networkRequests,
  dataSent,
  isProcessing,
}: SystemHealthPanelProps) {
  return (
    <div
      className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4"
      data-ocid="health.panel"
    >
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-4 h-4 text-emerald-400" />
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          System Health
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">
            Processing Location
          </p>
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full bg-emerald-400 ${
                isProcessing ? "animate-pulse" : ""
              }`}
            />
            <span className="text-sm font-medium text-emerald-400">
              Your Device
            </span>
          </div>
        </div>
        <div className="bg-card/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Network Activity</p>
          <span className="text-sm font-medium text-emerald-400">
            {networkRequests} requests
          </span>
        </div>
        <div className="bg-card/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Data Sent</p>
          <span className="text-sm font-medium text-emerald-400">
            {dataSent} KB
          </span>
        </div>
        <div className="bg-card/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Status</p>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">Secure</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3 italic">
        Your files are processed locally in your browser memory and never
        uploaded.
      </p>
    </div>
  );
}
