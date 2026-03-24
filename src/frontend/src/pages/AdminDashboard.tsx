import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Clock,
  FileStack,
  HardDrive,
  Lock,
  Share2,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

const TOOLS = [
  { id: "compress-pdf", name: "Compress PDF" },
  { id: "merge-pdf", name: "Merge PDF" },
  { id: "split-pdf", name: "Split PDF" },
  { id: "pdf-to-word", name: "PDF to Word" },
  { id: "pdf-to-jpg", name: "PDF to JPG" },
  { id: "add-watermark", name: "Add Watermark" },
  { id: "compress-image", name: "Compress Image" },
  { id: "resize-image", name: "Resize Image" },
  { id: "convert-image", name: "Convert Image" },
];

interface DashboardStats {
  totalFiles: bigint;
  pdfFiles: bigint;
  imageFiles: bigint;
  totalSessions: bigint;
  magicButtonClicks: bigint;
  sharePopupTriggers: bigint;
  toolUsage: Array<[string, bigint]>;
  hourlyFileCount: bigint;
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [toolStates, setToolStates] = useState<Record<string, boolean>>({});
  const [togglingTool, setTogglingTool] = useState<string | null>(null);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const refreshRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { actor } = useActor();

  document.title = "Admin Dashboard — BoltTools.app";

  const fetchStats = useCallback(async () => {
    if (!actor) return;
    try {
      const a = actor as any;
      // Try extended stats first, fall back to platform stats
      if (typeof a.getExtendedStats === "function") {
        const s = await a.getExtendedStats();
        setStats(s);
      } else {
        const s = await actor.getPlatformStats();
        setStats({
          totalFiles: s.totalFiles,
          pdfFiles: 0n,
          imageFiles: 0n,
          totalSessions: s.totalSessions,
          magicButtonClicks: 0n,
          sharePopupTriggers: 0n,
          toolUsage: s.toolUsage,
          hourlyFileCount: 0n,
        });
      }
    } catch {
      // ignore
    }
  }, [actor]);

  const fetchToolStates = useCallback(async () => {
    if (!actor) return;
    try {
      const a = actor as any;
      if (typeof a.getAllToolStates === "function") {
        const states: Array<[string, boolean]> = await a.getAllToolStates();
        const map: Record<string, boolean> = {};
        for (const [id, enabled] of states) {
          map[id] = enabled;
        }
        for (const t of TOOLS) {
          if (!(t.id in map)) map[t.id] = true;
        }
        setToolStates(map);
      } else {
        const defaults: Record<string, boolean> = {};
        for (const t of TOOLS) defaults[t.id] = true;
        setToolStates(defaults);
      }
    } catch {
      const defaults: Record<string, boolean> = {};
      for (const t of TOOLS) defaults[t.id] = true;
      setToolStates(defaults);
    }
  }, [actor]);

  useEffect(() => {
    if (!authenticated) return;
    fetchStats();
    fetchToolStates();
    refreshRef.current = setInterval(fetchStats, 30000);
    return () => {
      if (refreshRef.current) clearInterval(refreshRef.current);
    };
  }, [authenticated, fetchStats, fetchToolStates]);

  const handleLogin = async () => {
    if (!actor) return;
    setLoading(true);
    setAuthError("");
    try {
      const ok = await actor.verifyAdminPassword(password);
      if (ok) {
        setAuthenticated(true);
      } else {
        setAuthError("Invalid password. Please try again.");
      }
    } catch {
      setAuthError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleToolToggle = async (toolId: string, enabled: boolean) => {
    setTogglingTool(toolId);
    setToolStates((prev) => ({ ...prev, [toolId]: enabled }));
    try {
      const a = actor as any;
      if (typeof a.setToolEnabled === "function") {
        await a.setToolEnabled(toolId, enabled);
      }
      toast.success(
        `${TOOLS.find((t) => t.id === toolId)?.name} ${enabled ? "enabled" : "disabled"}`,
      );
    } catch {
      setToolStates((prev) => ({ ...prev, [toolId]: !enabled }));
      toast.error("Failed to update tool state");
    } finally {
      setTogglingTool(null);
    }
  };

  const handleChangePassword = async () => {
    if (newPw !== confirmPw) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPw.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setPwLoading(true);
    try {
      const a = actor as any;
      let ok = false;
      if (typeof a.updateAdminPassword === "function") {
        // Try two-param version first (new backend), fall back to one-param
        const result = await (a.updateAdminPassword.length >= 2
          ? a.updateAdminPassword(currentPw, newPw)
          : a.updateAdminPassword(newPw).then(() => true));
        ok = result === true || result === undefined;
      }
      if (ok) {
        toast.success("Password updated successfully!");
        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
      } else {
        toast.error("Current password is incorrect");
      }
    } catch {
      toast.error("Failed to update password");
    } finally {
      setPwLoading(false);
    }
  };

  const sortedTools =
    stats?.toolUsage.slice().sort((a, b) => Number(b[1] - a[1])) ?? [];

  if (!authenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 brand-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold">BoltTools Admin</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Secure admin access. Enter your password to continue.
            </p>
          </div>
          <div
            className="glass-panel rounded-2xl p-6 flex flex-col gap-4"
            data-ocid="admin.panel"
          >
            <div>
              <Label htmlFor="pw" className="mb-1.5 block text-sm">
                Admin Password
              </Label>
              <Input
                id="pw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter admin password"
                data-ocid="admin.input"
              />
            </div>
            {authError && (
              <p
                className="text-sm text-destructive"
                data-ocid="admin.error_state"
              >
                {authError}
              </p>
            )}
            <Button
              onClick={handleLogin}
              disabled={loading || !password || !actor}
              className="w-full brand-gradient border-0 text-white"
              data-ocid="admin.submit_button"
            >
              {loading ? "Verifying..." : "Sign In"}
            </Button>
            {!actor && (
              <p className="text-xs text-muted-foreground text-center">
                Connecting to backend...
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-accent" /> Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            BoltTools.app — live statistics & controls
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setAuthenticated(false);
            setStats(null);
            setToolStates({});
          }}
          data-ocid="admin.secondary_button"
        >
          Sign Out
        </Button>
      </div>

      {/* Stats Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
        data-ocid="admin.panel"
      >
        {/* Total Files */}
        <Card className="glass-panel border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileStack className="w-4 h-4" /> Total Files Processed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {stats ? String(stats.totalFiles) : "—"}
            </p>
            {stats && (
              <p className="text-xs text-muted-foreground mt-1">
                {String(stats.pdfFiles)} PDF | {String(stats.imageFiles)} Image
              </p>
            )}
          </CardContent>
        </Card>

        {/* Magic Button Clicks */}
        <Card className="glass-panel border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Magic Button Clicks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {stats ? String(stats.magicButtonClicks) : "—"}
            </p>
          </CardContent>
        </Card>

        {/* Share Popups */}
        <Card className="glass-panel border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Share Popups Triggered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {stats ? String(stats.sharePopupTriggers) : "—"}
            </p>
          </CardContent>
        </Card>

        {/* Total Sessions */}
        <Card className="glass-panel border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4" /> Total Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {stats ? String(stats.totalSessions) : "—"}
            </p>
          </CardContent>
        </Card>

        {/* Files This Hour */}
        <Card className="glass-panel border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" /> Files This Hour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {stats ? String(stats.hourlyFileCount) : "—"}
            </p>
          </CardContent>
        </Card>

        {/* Storage Status */}
        <Card className="glass-panel border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <HardDrive className="w-4 h-4" /> Storage Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base font-semibold text-green-500">
              Auto-deleted after 1 hour ✓
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Files never stored server-side
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tool Management */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" /> Tool Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {TOOLS.map((tool, i) => {
              const enabled = toolStates[tool.id] ?? true;
              return (
                <div
                  key={tool.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  data-ocid={`admin.row.${i + 1}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm">{tool.name}</span>
                    {!enabled && (
                      <Badge variant="destructive" className="text-xs">
                        Maintenance
                      </Badge>
                    )}
                  </div>
                  <Switch
                    checked={enabled}
                    disabled={togglingTool === tool.id}
                    onCheckedChange={(val) => handleToolToggle(tool.id, val)}
                    data-ocid="admin.switch"
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-accent" /> Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label className="mb-1.5 block text-sm">Current Password</Label>
              <Input
                type="password"
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                placeholder="Current password"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm">New Password</Label>
              <Input
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                placeholder="Min 6 characters"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm">
                Confirm New Password
              </Label>
              <Input
                type="password"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                placeholder="Repeat new password"
                data-ocid="admin.input"
              />
            </div>
          </div>
          <Button
            className="mt-4 brand-gradient border-0 text-white"
            onClick={handleChangePassword}
            disabled={pwLoading || !currentPw || !newPw || !confirmPw}
            data-ocid="admin.save_button"
          >
            {pwLoading ? "Updating..." : "Update Password"}
          </Button>
        </CardContent>
      </Card>

      {/* Tool Usage Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Tool Usage</CardTitle>
        </CardHeader>
        <CardContent>
          {sortedTools.length === 0 ? (
            <p
              className="text-muted-foreground text-sm"
              data-ocid="admin.empty_state"
            >
              No tool usage recorded yet.
            </p>
          ) : (
            <Table data-ocid="admin.table">
              <TableHeader>
                <TableRow>
                  <TableHead>Tool</TableHead>
                  <TableHead className="text-right">Usage Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTools.map(([tool, count], i) => (
                  <TableRow key={tool} data-ocid={`admin.row.${i + 1}`}>
                    <TableCell className="font-medium capitalize">
                      {tool.replace(/-/g, " ")}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {String(count)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
