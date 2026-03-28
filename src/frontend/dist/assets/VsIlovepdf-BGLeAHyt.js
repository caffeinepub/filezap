import { c as createLucideIcon, j as jsxRuntimeExports, C as Check, X, L as Link } from "./index-C8sWIOGs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode);
const rows = [
  {
    feature: "Server Upload Required",
    bolt: { val: "Never", good: true },
    ilove: { val: "Always", good: false }
  },
  {
    feature: "Files Stored on Servers",
    bolt: { val: "No", good: true },
    ilove: { val: "Up to 2 hours", good: false }
  },
  {
    feature: "Account Required",
    bolt: { val: "No", good: true },
    ilove: { val: "For some features", good: false }
  },
  {
    feature: "Works Offline",
    bolt: { val: "Yes (after first load)", good: true },
    ilove: { val: "No", good: false }
  },
  {
    feature: "Mobile Performance",
    bolt: { val: "Optimized", good: true },
    ilove: { val: "Average", good: null }
  },
  {
    feature: "Processing Speed",
    bolt: { val: "Instant (in-browser)", good: true },
    ilove: { val: "Depends on server", good: false }
  },
  {
    feature: "File Size Limit",
    bolt: { val: "Device RAM only", good: true },
    ilove: { val: "200MB (free tier)", good: false }
  },
  {
    feature: "Privacy",
    bolt: { val: "Maximum", good: true },
    ilove: { val: "Medium", good: false }
  },
  {
    feature: "Data Sent to Server",
    bolt: { val: "0 KB", good: true },
    ilove: { val: "100% of file", good: false }
  },
  {
    feature: "Free Tier",
    bolt: { val: "All tools, unlimited", good: true },
    ilove: { val: "Limited", good: false }
  },
  {
    feature: "Ads",
    bolt: { val: "Minimal", good: true },
    ilove: { val: "Yes", good: null }
  },
  {
    feature: "Dark Mode",
    bolt: { val: "Default", good: true },
    ilove: { val: "No", good: false }
  },
  {
    feature: "Upsell Prompts",
    bolt: { val: "None", good: true },
    ilove: { val: "Frequent", good: false }
  }
];
const faq = [
  {
    q: "Is BoltTools really free?",
    a: "Yes, completely free. No premium tiers, no paywalls. All tools are available to everyone at no cost."
  },
  {
    q: "Does BoltTools work offline?",
    a: "After your first visit, BoltTools loads from your browser cache and can process files without an internet connection."
  },
  {
    q: "Is BoltTools safer than iLovePDF?",
    a: "For privacy, yes. iLovePDF uploads your files to their servers. BoltTools processes everything in your browser — your files never touch a server."
  },
  {
    q: "Does BoltTools have as many tools as iLovePDF?",
    a: "BoltTools is growing fast. We have 20+ tools and are adding more every week based on user requests."
  },
  {
    q: "Why doesn't BoltTools need an account?",
    a: "Because we don't store your files or data, there's nothing to associate with an account. You can use every tool anonymously."
  },
  {
    q: "Will BoltTools stay free?",
    a: "Yes. The app is monetized through non-intrusive ads, not subscriptions. Free access is a core principle, not a marketing tactic."
  }
];
function VsIlovepdf() {
  document.title = "BoltTools vs iLovePDF — The Privacy-First Alternative | BoltTools.app";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-400 mb-4", children: "Honest Comparison" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl font-extrabold mb-3", children: "BoltTools vs iLovePDF" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "The privacy-first alternative that processes your files entirely in your browser — no uploads, no accounts, no limits." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-border mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 text-left text-muted-foreground font-medium", children: "Feature" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 text-center text-emerald-400 font-semibold", children: "⚡ BoltTools" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 text-center text-muted-foreground font-medium", children: "iLovePDF" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "hover:bg-secondary/30 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-medium", children: row.feature }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${row.bolt.good ? "bg-emerald-500/10 text-emerald-400" : "bg-secondary text-muted-foreground"}`,
                children: [
                  row.bolt.good ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" }),
                  row.bolt.val
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${row.ilove.good === false ? "bg-red-500/10 text-red-400" : row.ilove.good ? "bg-emerald-500/10 text-emerald-400" : "bg-secondary text-muted-foreground"}`,
                children: [
                  row.ilove.good === false ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }) : row.ilove.good ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" }),
                  row.ilove.val
                ]
              }
            ) })
          ]
        },
        row.feature
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-invert max-w-none mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-4", children: "Why In-Browser Processing Beats Server Uploads" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "When you use a traditional PDF tool like iLovePDF, your files travel across the internet to a remote server. That server processes your file, stores it temporarily, then sends it back. This means your private documents — contracts, medical records, financial statements — pass through infrastructure you don't control." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "BoltTools works differently. When you drop a file into BoltTools, it never leaves your device. The processing happens entirely inside your browser using WebAssembly and JavaScript. The result is faster processing (no upload wait time), complete privacy, and tools that work even when you're offline." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-3", children: "The Privacy Gap" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "iLovePDF states they delete files within 2 hours. But during those 2 hours, your file exists on their servers. Server breaches, employee access, and data retention policies are all risks that disappear entirely when processing happens client-side." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-3", children: "Speed and Reliability" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "Upload-based tools are limited by your internet speed. BoltTools reads the file from your disk directly — no network round trip. On a decent device, most operations complete in under 2 seconds." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-3", children: "No Limits, No Account Required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "iLovePDF's free tier limits file size and daily tasks. BoltTools has no such limits — the only constraint is your device's RAM. And since there's no server infrastructure, there's nothing to log in to." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-6", children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: faq.map((item) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: stable static FAQ
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-1", children: item.q }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: item.a })
            ]
          },
          item.q
        )
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-8 bg-card border border-border rounded-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-2", children: "Ready to try BoltTools?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "All tools free. No upload. No account. Just drop your file." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/merge-pdf",
            className: "bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition",
            children: "Merge PDF Free"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/compress-pdf",
            className: "border border-border hover:bg-secondary px-6 py-3 rounded-xl font-semibold transition",
            children: "Compress PDF Free"
          }
        )
      ] })
    ] })
  ] });
}
export {
  VsIlovepdf as default
};
