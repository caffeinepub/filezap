import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FileText, Link2, Plus } from "lucide-react";
import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import MergeDropzone from "../components/MergeDropzone";
import MergeFileList from "../components/MergeFileList";
import MergeResultScreen from "../components/MergeResultScreen";
import ProgressBar from "../components/ProgressBar";
import SystemHealthPanel from "../components/SystemHealthPanel";
import { useMergeStore } from "../store/useMergeStore";

const faqItems = [
  {
    q: "How many PDFs can I merge at once?",
    a: "As many as your browser's memory allows. Most devices handle 20+ files easily. Keep total size under 500MB for best performance.",
  },
  {
    q: "Is my data safe when I use this tool?",
    a: "Completely. Files are processed in your browser's memory and never sent anywhere. We have no server that could receive your files even if we wanted to.",
  },
  {
    q: "Will my PDF quality be preserved?",
    a: "Yes. We copy pages using pdf-lib without re-encoding, so text, images, fonts, and formatting remain identical to the originals.",
  },
  {
    q: "Can I merge PDFs on my phone?",
    a: "Yes. The tool is fully mobile-optimized. For large files (50MB+) on older phones, processing may take a few extra seconds.",
  },
  {
    q: "What happens to my files after merging?",
    a: "They exist only in your browser's RAM during processing. Once you download the result and close the tab, everything is gone.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. The tool runs entirely in your browser using modern web technologies. No plugins, no extensions, no downloads required.",
  },
  {
    q: "Is there a file size limit?",
    a: "There's no artificial limit. The practical limit depends on your device's available RAM, typically 200-500MB total.",
  },
];

function AddMoreDropzone() {
  const addFiles = useMergeStore((s) => s.addFiles);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: useCallback(
      (f: File[]) => {
        if (f.length) addFiles(f);
      },
      [addFiles],
    ),
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
    noClick: false,
  });
  return (
    <div
      {...getRootProps()}
      className="flex items-center gap-2 border border-dashed border-border rounded-xl px-4 py-3 cursor-pointer hover:border-emerald-500/40 transition-colors text-sm text-muted-foreground"
      data-ocid="merge.upload_button"
    >
      <input {...getInputProps()} />
      <Plus className="w-4 h-4" />
      Add more PDFs
    </div>
  );
}

export default function MergePdf() {
  document.title = "Merge PDF Online Free — Private, No Upload | BoltTools.app";

  const store = useMergeStore();
  const workerRef = useRef<Worker | null>(null);

  const handleMerge = async () => {
    if (store.files.length < 2) {
      toast.error("Please add at least 2 PDF files to merge.");
      return;
    }

    const totalSize = store.files.reduce((acc, f) => acc + f.file.size, 0);
    const isMobile = /Mobile/i.test(navigator.userAgent);
    if (totalSize > 20 * 1024 * 1024 && isMobile) {
      toast.warning("Large files may take longer on mobile devices");
    }

    store.setStatus("processing");
    store.setProgress(0, "Preparing files...");

    try {
      const filesData = await Promise.all(
        store.files.map(async (mf) => ({
          name: mf.file.name,
          arrayBuffer: await mf.file.arrayBuffer(),
        })),
      );

      const worker = new Worker("/pdfWorker.js");
      workerRef.current = worker;

      worker.onmessage = (e) => {
        const msg = e.data;
        if (msg.type === "progress") {
          store.setProgress(msg.progress, msg.text);
        } else if (msg.type === "done") {
          const blob = new Blob([new Uint8Array(msg.pdfBytes)], {
            type: "application/pdf",
          });
          store.setResult({
            blob,
            filename: "merged.pdf",
            originalSize: store.files.reduce((a, f) => a + f.file.size, 0),
            resultSize: blob.size,
          });
          worker.terminate();
          workerRef.current = null;
        } else if (msg.type === "error") {
          store.setStatus("error");
          toast.error(msg.message || "Merge failed. Please try again.");
          worker.terminate();
          workerRef.current = null;
        }
      };

      worker.onerror = (err) => {
        store.setStatus("error");
        toast.error(err.message || "Worker error during merge.");
        worker.terminate();
        workerRef.current = null;
      };

      worker.postMessage({ files: filesData });
    } catch (err) {
      store.setStatus("error");
      toast.error(err instanceof Error ? err.message : "Failed to read files.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
          <FileText className="w-7 h-7 text-emerald-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">Merge PDF</h1>
        <p className="text-muted-foreground">
          Combine multiple PDF files into one document. Free, private, instant.
        </p>
      </div>

      {/* Step 1: Drop zone */}
      {store.status === "idle" && store.files.length === 0 && (
        <div className="flex flex-col gap-5">
          <MergeDropzone />
          <SystemHealthPanel
            networkRequests={store.networkRequests}
            dataSent={store.dataSent}
            isProcessing={false}
          />
        </div>
      )}

      {/* Step 2: File list + controls */}
      {store.status === "idle" && store.files.length > 0 && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            {store.files.length} file{store.files.length !== 1 ? "s" : ""}{" "}
            added. Drag to reorder.
          </p>
          <MergeFileList
            files={store.files}
            onRemove={store.removeFile}
            onReorder={store.reorderFiles}
          />
          <AddMoreDropzone />

          <div className="flex items-center gap-3 py-1">
            <Switch
              id="optimize-toggle"
              checked={store.optimize}
              onCheckedChange={store.setOptimize}
              data-ocid="merge.switch"
            />
            <Label htmlFor="optimize-toggle" className="text-sm cursor-pointer">
              Optimize file size{" "}
              <span className="text-muted-foreground">(recommended)</span>
            </Label>
          </div>

          <Button
            onClick={handleMerge}
            className="w-full h-13 text-base font-semibold bg-emerald-500 hover:bg-emerald-600 border-0 text-white py-4"
            data-ocid="merge.primary_button"
          >
            Merge PDF
          </Button>

          <SystemHealthPanel
            networkRequests={store.networkRequests}
            dataSent={store.dataSent}
            isProcessing={false}
          />
        </div>
      )}

      {/* Step 3: Processing */}
      {store.status === "processing" && (
        <div className="flex flex-col gap-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <ProgressBar progress={store.progress} isActive />
            <p className="text-sm text-center text-muted-foreground mt-2">
              {store.statusText}
            </p>
          </div>
          <SystemHealthPanel
            networkRequests={store.networkRequests}
            dataSent={store.dataSent}
            isProcessing
          />
        </div>
      )}

      {/* Step 4: Done */}
      {store.status === "done" && store.result && (
        <MergeResultScreen result={store.result} onReset={store.reset} />
      )}

      {/* Error state */}
      {store.status === "error" && (
        <div
          className="bg-destructive/10 border border-destructive/30 rounded-xl p-5 text-sm text-destructive text-center"
          data-ocid="merge.error_state"
        >
          <p className="font-semibold mb-2">Something went wrong</p>
          <Button variant="outline" size="sm" onClick={store.reset}>
            Try Again
          </Button>
        </div>
      )}

      {/* SEO Content */}
      {(store.status === "idle" || store.status === "error") && (
        <>
          <article className="max-w-3xl mx-auto px-0 py-12 prose prose-invert prose-sm">
            <h2>Merge PDF Files Online — Free, Fast, and Private</h2>
            <p>
              Combining multiple PDF documents into a single file has never been
              easier or more secure. BoltTools' PDF merger works entirely inside
              your browser — no server uploads, no waiting in queue, no file
              size limits imposed by bandwidth. Whether you're combining a
              resume with a cover letter, merging invoices for accounting, or
              assembling a multi-chapter report, our tool handles it in seconds.
            </p>

            <h3>How to Merge PDFs in 3 Steps</h3>
            <ol>
              <li>
                <strong>Upload your files</strong> — drag them directly onto the
                page or tap to browse. You can add as many PDFs as you need.
              </li>
              <li>
                <strong>Arrange the order</strong> — drag and drop files to set
                the exact page sequence in your final document.
              </li>
              <li>
                <strong>Click Merge &amp; Download</strong> — your merged PDF is
                ready instantly, processed right on your device.
              </li>
            </ol>

            <h3>Why BoltTools is Different</h3>
            <p>
              Most online PDF mergers upload your files to a remote server,
              process them in the cloud, then send the result back. That means
              your documents — which may contain sensitive financial, legal, or
              personal information — pass through third-party infrastructure.
              BoltTools does none of that. Processing happens entirely in your
              browser's memory using WebAssembly technology, so your files never
              leave your device.
            </p>

            {/* Competitor comparison */}
            <h3>BoltTools vs Traditional Online PDF Tools</h3>
            <div className="not-prose overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="py-3 px-4 text-emerald-400">BoltTools</th>
                    <th className="py-3 px-4 text-muted-foreground">
                      Traditional Tools
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Upload Required",
                      "❌ No — client-side only",
                      "✅ Yes — server upload",
                    ],
                    ["Privacy", "🔒 Maximum", "⚠️ Medium"],
                    [
                      "Processing Speed",
                      "⚡ Instant",
                      "🐢 Wait for upload/download",
                    ],
                    [
                      "File Storage",
                      "❌ None — RAM only",
                      "✅ Stored on servers",
                    ],
                    [
                      "Account Required",
                      "❌ No signup ever",
                      "✅ Often required",
                    ],
                  ].map(([feature, us, them]) => (
                    <tr key={feature} className="border-b border-border/50">
                      <td className="py-3 px-4 font-medium">{feature}</td>
                      <td className="py-3 px-4 text-center">{us}</td>
                      <td className="py-3 px-4 text-center text-muted-foreground">
                        {them}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>Common Use Cases</h3>
            <ul>
              <li>
                Merging a resume, cover letter, and portfolio into one
                application package
              </li>
              <li>Combining monthly bank statements for tax filing</li>
              <li>Assembling a multi-section report from separate chapters</li>
              <li>Joining signed contract pages into one complete document</li>
              <li>Creating a photo album from scanned pages</li>
            </ul>

            <h3>Features</h3>
            <ul>
              <li>Unlimited files per merge (browser memory permitting)</li>
              <li>Drag-and-drop reordering with visual previews</li>
              <li>Mobile-optimized — works on iOS and Android</li>
              <li>No account or email required</li>
              <li>Completely free, forever</li>
            </ul>
          </article>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="flex flex-col gap-2"
            >
              {faqItems.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`faq-${i}`}
                  className="bg-card border border-border rounded-xl px-5"
                  data-ocid={`merge.item.${i + 1}`}
                >
                  <AccordionTrigger className="text-sm font-semibold text-left hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Internal links */}
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-8">
            <span className="font-medium text-foreground flex items-center gap-1">
              <Link2 className="w-3.5 h-3.5" /> Also try:
            </span>
            {[
              { label: "Compress PDF", href: "/compress-pdf" },
              { label: "Split PDF", href: "/split-pdf" },
              { label: "PDF to JPG", href: "/pdf-to-jpg" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-accent hover:underline"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="adsense-placeholder">Advertisement</div>
        </>
      )}
    </div>
  );
}
