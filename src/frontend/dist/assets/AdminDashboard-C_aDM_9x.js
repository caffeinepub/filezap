import { c as createLucideIcon, j as jsxRuntimeExports, S as Slot, d as cn, m as cva, r as reactExports, k as useActor, B as Button, l as ue } from "./index-RHF5_ywm.js";
import { I as Input } from "./input-z84UFPFg.js";
import { L as Label } from "./label-CMDiJspp.js";
import { S as Switch } from "./switch-DmXwFKob.js";
import { L as Lock, U as Users } from "./users-BpSruc37.js";
import { S as Shield } from "./shield-BHKmkMB8.js";
import { S as Sparkles, f as Share2 } from "./index-Cu3nm7nG.js";
import "./index-RWUxOPSZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21 7h-3a2 2 0 0 1-2-2V2", key: "9rb54x" }],
  [
    "path",
    {
      d: "M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17Z",
      key: "1059l0"
    }
  ],
  ["path", { d: "M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15", key: "16874u" }],
  ["path", { d: "M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11", key: "k2ox98" }]
];
const FileStack = createLucideIcon("file-stack", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "22", x2: "2", y1: "12", y2: "12", key: "1y58io" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ],
  ["line", { x1: "6", x2: "6.01", y1: "16", y2: "16", key: "sgf278" }],
  ["line", { x1: "10", x2: "10.01", y1: "16", y2: "16", key: "1l4acy" }]
];
const HardDrive = createLucideIcon("hard-drive", __iconNode);
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
const TOOLS = [
  { id: "compress-pdf", name: "Compress PDF" },
  { id: "merge-pdf", name: "Merge PDF" },
  { id: "split-pdf", name: "Split PDF" },
  { id: "pdf-to-word", name: "PDF to Word" },
  { id: "pdf-to-jpg", name: "PDF to JPG" },
  { id: "add-watermark", name: "Add Watermark" },
  { id: "compress-image", name: "Compress Image" },
  { id: "resize-image", name: "Resize Image" },
  { id: "convert-image", name: "Convert Image" }
];
function AdminDashboard() {
  const [password, setPassword] = reactExports.useState("");
  const [authenticated, setAuthenticated] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [authError, setAuthError] = reactExports.useState("");
  const [stats, setStats] = reactExports.useState(null);
  const [toolStates, setToolStates] = reactExports.useState({});
  const [togglingTool, setTogglingTool] = reactExports.useState(null);
  const [currentPw, setCurrentPw] = reactExports.useState("");
  const [newPw, setNewPw] = reactExports.useState("");
  const [confirmPw, setConfirmPw] = reactExports.useState("");
  const [pwLoading, setPwLoading] = reactExports.useState(false);
  const refreshRef = reactExports.useRef(null);
  const { actor } = useActor();
  document.title = "Admin Dashboard — BoltTools.app";
  const fetchStats = reactExports.useCallback(async () => {
    if (!actor) return;
    try {
      const a = actor;
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
          hourlyFileCount: 0n
        });
      }
    } catch {
    }
  }, [actor]);
  const fetchToolStates = reactExports.useCallback(async () => {
    if (!actor) return;
    try {
      const a = actor;
      if (typeof a.getAllToolStates === "function") {
        const states = await a.getAllToolStates();
        const map = {};
        for (const [id, enabled] of states) {
          map[id] = enabled;
        }
        for (const t of TOOLS) {
          if (!(t.id in map)) map[t.id] = true;
        }
        setToolStates(map);
      } else {
        const defaults = {};
        for (const t of TOOLS) defaults[t.id] = true;
        setToolStates(defaults);
      }
    } catch {
      const defaults = {};
      for (const t of TOOLS) defaults[t.id] = true;
      setToolStates(defaults);
    }
  }, [actor]);
  reactExports.useEffect(() => {
    if (!authenticated) return;
    fetchStats();
    fetchToolStates();
    refreshRef.current = setInterval(fetchStats, 3e4);
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
  const handleToolToggle = async (toolId, enabled) => {
    var _a;
    setTogglingTool(toolId);
    setToolStates((prev) => ({ ...prev, [toolId]: enabled }));
    try {
      const a = actor;
      if (typeof a.setToolEnabled === "function") {
        await a.setToolEnabled(toolId, enabled);
      }
      ue.success(
        `${(_a = TOOLS.find((t) => t.id === toolId)) == null ? void 0 : _a.name} ${enabled ? "enabled" : "disabled"}`
      );
    } catch {
      setToolStates((prev) => ({ ...prev, [toolId]: !enabled }));
      ue.error("Failed to update tool state");
    } finally {
      setTogglingTool(null);
    }
  };
  const handleChangePassword = async () => {
    if (newPw !== confirmPw) {
      ue.error("New passwords do not match");
      return;
    }
    if (newPw.length < 6) {
      ue.error("Password must be at least 6 characters");
      return;
    }
    setPwLoading(true);
    try {
      const a = actor;
      let ok = false;
      if (typeof a.updateAdminPassword === "function") {
        const result = await (a.updateAdminPassword.length >= 2 ? a.updateAdminPassword(currentPw, newPw) : a.updateAdminPassword(newPw).then(() => true));
        ok = result === true || result === void 0;
      }
      if (ok) {
        ue.success("Password updated successfully!");
        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
      } else {
        ue.error("Current password is incorrect");
      }
    } catch {
      ue.error("Failed to update password");
    } finally {
      setPwLoading(false);
    }
  };
  const sortedTools = (stats == null ? void 0 : stats.toolUsage.slice().sort((a, b) => Number(b[1] - a[1]))) ?? [];
  if (!authenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[80vh] flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 brand-gradient rounded-2xl flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-7 h-7 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "BoltTools Admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Secure admin access. Enter your password to continue." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-panel rounded-2xl p-6 flex flex-col gap-4",
          "data-ocid": "admin.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pw", className: "mb-1.5 block text-sm", children: "Admin Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "pw",
                  type: "password",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  onKeyDown: (e) => e.key === "Enter" && handleLogin(),
                  placeholder: "Enter admin password",
                  "data-ocid": "admin.input"
                }
              )
            ] }),
            authError && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-destructive",
                "data-ocid": "admin.error_state",
                children: authError
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleLogin,
                disabled: loading || !password || !actor,
                className: "w-full brand-gradient border-0 text-white",
                "data-ocid": "admin.submit_button",
                children: loading ? "Verifying..." : "Sign In"
              }
            ),
            !actor && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Connecting to backend..." })
          ]
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6 text-accent" }),
          " Admin Dashboard"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "BoltTools.app — live statistics & controls" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => {
            setAuthenticated(false);
            setStats(null);
            setToolStates({});
          },
          "data-ocid": "admin.secondary_button",
          children: "Sign Out"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8",
        "data-ocid": "admin.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass-panel border-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-medium text-muted-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileStack, { className: "w-4 h-4" }),
              " Total Files Processed"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: stats ? String(stats.totalFiles) : "—" }),
              stats && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                String(stats.pdfFiles),
                " PDF | ",
                String(stats.imageFiles),
                " Image"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass-panel border-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-medium text-muted-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
              " Magic Button Clicks"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: stats ? String(stats.magicButtonClicks) : "—" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass-panel border-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-medium text-muted-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
              " Share Popups Triggered"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: stats ? String(stats.sharePopupTriggers) : "—" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass-panel border-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-medium text-muted-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
              " Total Sessions"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: stats ? String(stats.totalSessions) : "—" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass-panel border-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-medium text-muted-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
              " Files This Hour"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: stats ? String(stats.hourlyFileCount) : "—" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass-panel border-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-medium text-muted-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "w-4 h-4" }),
              " Storage Status"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-green-500", children: "Auto-deleted after 1 hour ✓" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Files never stored server-side" })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-accent" }),
        " Tool Management"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: TOOLS.map((tool, i) => {
        const enabled = toolStates[tool.id] ?? true;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between py-2 border-b border-border last:border-0",
            "data-ocid": `admin.row.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: tool.name }),
                !enabled && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "text-xs", children: "Maintenance" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: enabled,
                  disabled: togglingTool === tool.id,
                  onCheckedChange: (val) => handleToolToggle(tool.id, val),
                  "data-ocid": "admin.switch"
                }
              )
            ]
          },
          tool.id
        );
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5 text-accent" }),
        " Security"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "Current Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "password",
                value: currentPw,
                onChange: (e) => setCurrentPw(e.target.value),
                placeholder: "Current password",
                "data-ocid": "admin.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "New Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "password",
                value: newPw,
                onChange: (e) => setNewPw(e.target.value),
                placeholder: "Min 6 characters",
                "data-ocid": "admin.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "Confirm New Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "password",
                value: confirmPw,
                onChange: (e) => setConfirmPw(e.target.value),
                placeholder: "Repeat new password",
                "data-ocid": "admin.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "mt-4 brand-gradient border-0 text-white",
            onClick: handleChangePassword,
            disabled: pwLoading || !currentPw || !newPw || !confirmPw,
            "data-ocid": "admin.save_button",
            children: pwLoading ? "Updating..." : "Update Password"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Recent Tool Usage" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: sortedTools.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-muted-foreground text-sm",
          "data-ocid": "admin.empty_state",
          children: "No tool usage recorded yet."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { "data-ocid": "admin.table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tool" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Usage Count" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: sortedTools.map(([tool, count], i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { "data-ocid": `admin.row.${i + 1}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium capitalize", children: tool.replace(/-/g, " ") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono", children: String(count) })
        ] }, tool)) })
      ] }) })
    ] })
  ] });
}
export {
  AdminDashboard as default
};
