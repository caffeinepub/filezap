import { Link } from "@tanstack/react-router";
import { Check, Minus, X } from "lucide-react";

const rows = [
  {
    feature: "Server Upload Required",
    bolt: { val: "Never", good: true },
    ilove: { val: "Always", good: false },
  },
  {
    feature: "Files Stored on Servers",
    bolt: { val: "No", good: true },
    ilove: { val: "Up to 2 hours", good: false },
  },
  {
    feature: "Account Required",
    bolt: { val: "No", good: true },
    ilove: { val: "For some features", good: false },
  },
  {
    feature: "Works Offline",
    bolt: { val: "Yes (after first load)", good: true },
    ilove: { val: "No", good: false },
  },
  {
    feature: "Mobile Performance",
    bolt: { val: "Optimized", good: true },
    ilove: { val: "Average", good: null },
  },
  {
    feature: "Processing Speed",
    bolt: { val: "Instant (in-browser)", good: true },
    ilove: { val: "Depends on server", good: false },
  },
  {
    feature: "File Size Limit",
    bolt: { val: "Device RAM only", good: true },
    ilove: { val: "200MB (free tier)", good: false },
  },
  {
    feature: "Privacy",
    bolt: { val: "Maximum", good: true },
    ilove: { val: "Medium", good: false },
  },
  {
    feature: "Data Sent to Server",
    bolt: { val: "0 KB", good: true },
    ilove: { val: "100% of file", good: false },
  },
  {
    feature: "Free Tier",
    bolt: { val: "All tools, unlimited", good: true },
    ilove: { val: "Limited", good: false },
  },
  {
    feature: "Ads",
    bolt: { val: "Minimal", good: true },
    ilove: { val: "Yes", good: null },
  },
  {
    feature: "Dark Mode",
    bolt: { val: "Default", good: true },
    ilove: { val: "No", good: false },
  },
  {
    feature: "Upsell Prompts",
    bolt: { val: "None", good: true },
    ilove: { val: "Frequent", good: false },
  },
];

const faq = [
  {
    q: "Is BoltTools really free?",
    a: "Yes, completely free. No premium tiers, no paywalls. All tools are available to everyone at no cost.",
  },
  {
    q: "Does BoltTools work offline?",
    a: "After your first visit, BoltTools loads from your browser cache and can process files without an internet connection.",
  },
  {
    q: "Is BoltTools safer than iLovePDF?",
    a: "For privacy, yes. iLovePDF uploads your files to their servers. BoltTools processes everything in your browser — your files never touch a server.",
  },
  {
    q: "Does BoltTools have as many tools as iLovePDF?",
    a: "BoltTools is growing fast. We have 20+ tools and are adding more every week based on user requests.",
  },
  {
    q: "Why doesn't BoltTools need an account?",
    a: "Because we don't store your files or data, there's nothing to associate with an account. You can use every tool anonymously.",
  },
  {
    q: "Will BoltTools stay free?",
    a: "Yes. The app is monetized through non-intrusive ads, not subscriptions. Free access is a core principle, not a marketing tactic.",
  },
];

export default function VsIlovepdf() {
  document.title =
    "BoltTools vs iLovePDF — The Privacy-First Alternative | BoltTools.app";
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-400 mb-4">
          Honest Comparison
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
          BoltTools vs iLovePDF
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The privacy-first alternative that processes your files entirely in
          your browser — no uploads, no accounts, no limits.
        </p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border mb-12">
        <table className="w-full text-sm">
          <thead className="bg-card">
            <tr>
              <th className="p-4 text-left text-muted-foreground font-medium">
                Feature
              </th>
              <th className="p-4 text-center text-emerald-400 font-semibold">
                ⚡ BoltTools
              </th>
              <th className="p-4 text-center text-muted-foreground font-medium">
                iLovePDF
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr
                key={row.feature}
                className="hover:bg-secondary/30 transition-colors"
              >
                <td className="p-4 font-medium">{row.feature}</td>
                <td className="p-4 text-center">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${row.bolt.good ? "bg-emerald-500/10 text-emerald-400" : "bg-secondary text-muted-foreground"}`}
                  >
                    {row.bolt.good ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Minus className="w-3 h-3" />
                    )}
                    {row.bolt.val}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${row.ilove.good === false ? "bg-red-500/10 text-red-400" : row.ilove.good ? "bg-emerald-500/10 text-emerald-400" : "bg-secondary text-muted-foreground"}`}
                  >
                    {row.ilove.good === false ? (
                      <X className="w-3 h-3" />
                    ) : row.ilove.good ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Minus className="w-3 h-3" />
                    )}
                    {row.ilove.val}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="prose prose-invert max-w-none mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Why In-Browser Processing Beats Server Uploads
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          When you use a traditional PDF tool like iLovePDF, your files travel
          across the internet to a remote server. That server processes your
          file, stores it temporarily, then sends it back. This means your
          private documents — contracts, medical records, financial statements —
          pass through infrastructure you don't control.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          BoltTools works differently. When you drop a file into BoltTools, it
          never leaves your device. The processing happens entirely inside your
          browser using WebAssembly and JavaScript. The result is faster
          processing (no upload wait time), complete privacy, and tools that
          work even when you're offline.
        </p>
        <h3 className="text-xl font-bold mb-3">The Privacy Gap</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          iLovePDF states they delete files within 2 hours. But during those 2
          hours, your file exists on their servers. Server breaches, employee
          access, and data retention policies are all risks that disappear
          entirely when processing happens client-side.
        </p>
        <h3 className="text-xl font-bold mb-3">Speed and Reliability</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Upload-based tools are limited by your internet speed. BoltTools reads
          the file from your disk directly — no network round trip. On a decent
          device, most operations complete in under 2 seconds.
        </p>
        <h3 className="text-xl font-bold mb-3">
          No Limits, No Account Required
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          iLovePDF's free tier limits file size and daily tasks. BoltTools has
          no such limits — the only constraint is your device's RAM. And since
          there's no server infrastructure, there's nothing to log in to.
        </p>
      </div>
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4">
          {faq.map((item) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: stable static FAQ
            <div
              key={item.q}
              className="bg-card border border-border rounded-xl p-5"
            >
              <h3 className="font-semibold mb-1">{item.q}</h3>
              <p className="text-sm text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center p-8 bg-card border border-border rounded-2xl">
        <h2 className="text-2xl font-bold mb-2">Ready to try BoltTools?</h2>
        <p className="text-muted-foreground mb-6">
          All tools free. No upload. No account. Just drop your file.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            to="/merge-pdf"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Merge PDF Free
          </Link>
          <Link
            to="/compress-pdf"
            className="border border-border hover:bg-secondary px-6 py-3 rounded-xl font-semibold transition"
          >
            Compress PDF Free
          </Link>
        </div>
      </div>
    </div>
  );
}
