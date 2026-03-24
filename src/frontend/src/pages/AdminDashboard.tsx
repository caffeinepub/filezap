import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileStack, Lock, Shield, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";

interface Stats {
  totalFiles: bigint;
  totalSessions: bigint;
  toolUsage: [string, bigint][];
  recentActivity: { toolName: string; timestamp: bigint }[];
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const { actor } = useActor();

  document.title = "Admin Dashboard — FileZap";

  const handleLogin = async () => {
    if (!actor) return;
    setLoading(true);
    setAuthError("");
    try {
      const ok = await actor.verifyAdminPassword(password);
      if (ok) {
        setAuthenticated(true);
        const s = await actor.getPlatformStats();
        setStats(s);
      } else {
        setAuthError("Invalid password. Please try again.");
      }
    } catch {
      setAuthError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sortedTools =
    stats?.toolUsage.slice().sort((a, b) => Number(b[1] - a[1])) ?? [];
  const topTool = sortedTools[0]?.[0] ?? "—";

  if (!authenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 brand-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Admin Access</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Enter the admin password to continue
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4">
            <div>
              <Label htmlFor="pw" className="mb-1.5 block text-sm">
                Password
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
              disabled={loading || !password}
              className="w-full brand-gradient border-0 text-white"
              data-ocid="admin.submit_button"
            >
              {loading ? "Verifying..." : "Sign In"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-accent" /> Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            FileZap platform statistics
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setAuthenticated(false);
            setStats(null);
          }}
          data-ocid="admin.secondary_button"
        >
          Sign Out
        </Button>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        data-ocid="admin.panel"
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileStack className="w-4 h-4" /> Total Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {stats ? String(stats.totalFiles) : "—"}
            </p>
          </CardContent>
        </Card>
        <Card>
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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Top Tool
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold capitalize">
              {topTool.replace(/-/g, " ")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tool Usage</CardTitle>
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
                  <TableHead className="text-right">Usage</TableHead>
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

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {!stats?.recentActivity?.length ? (
            <p
              className="text-muted-foreground text-sm"
              data-ocid="admin.empty_state"
            >
              No recent activity.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {stats.recentActivity.slice(0, 10).map((evt) => (
                <div
                  key={`${evt.toolName}-${String(evt.timestamp)}`}
                  className="flex items-center justify-between text-sm py-1.5 border-b border-border last:border-0"
                >
                  <span className="capitalize">
                    {evt.toolName.replace(/-/g, " ")}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {new Date(
                      Number(evt.timestamp) / 1_000_000,
                    ).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
