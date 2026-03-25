import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, X, B as Button } from "./index-BFibDN1D.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$7);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "m8 17 4-4 4 4", key: "1quai1" }]
];
const CloudUpload = createLucideIcon("cloud-upload", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M4 7V4a2 2 0 0 1 2-2 2 2 0 0 0-2 2", key: "1vk7w2" }],
  ["path", { d: "M4.063 20.999a2 2 0 0 0 2 1L18 22a2 2 0 0 0 2-2V7l-5-5H6", key: "1jink5" }],
  ["path", { d: "m5 11-3 3", key: "1dgrs4" }],
  ["path", { d: "m5 17-3-3h10", key: "1mvvaf" }]
];
const FileOutput = createLucideIcon("file-output", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m8 6 4-4 4 4", key: "ybng9g" }],
  ["path", { d: "M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22", key: "1hyw0i" }],
  ["path", { d: "m20 22-5-5", key: "1m27yz" }]
];
const Merge = createLucideIcon("merge", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m14 10 7-7", key: "oa77jy" }],
  ["path", { d: "M20 10h-6V4", key: "mjg0md" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M4 14h6v6", key: "rmj7iw" }]
];
const Minimize2 = createLucideIcon("minimize-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
];
const Scissors = createLucideIcon("scissors", __iconNode);
const MAX_SIZE_MB = 50;
function validateFile(file) {
  if (file.size > MAX_SIZE_MB * 1024 * 1024)
    return `File too large. Max ${MAX_SIZE_MB}MB.`;
  return null;
}
function DragDropZone({
  acceptedTypes,
  multiple,
  onFilesSelected,
  selectedFiles,
  label
}) {
  const [dragging, setDragging] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const handleFiles = reactExports.useCallback(
    (files) => {
      if (!files || files.length === 0) return;
      setError(null);
      const arr = Array.from(files);
      for (const f of arr) {
        const err = validateFile(f);
        if (err) {
          setError(err);
          return;
        }
      }
      onFilesSelected(arr);
    },
    [onFilesSelected]
  );
  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };
  const triggerInput = () => {
    var _a;
    return (_a = document.getElementById("filezap-input")) == null ? void 0 : _a.click();
  };
  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };
  const isPdf = acceptedTypes.includes(".pdf");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "tool.dropzone",
        "aria-label": "File upload zone",
        onDragEnter: (e) => {
          e.preventDefault();
          setDragging(true);
        },
        onDragOver: (e) => {
          e.preventDefault();
          setDragging(true);
        },
        onDragLeave: () => setDragging(false),
        onDrop,
        onClick: triggerInput,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") triggerInput();
        },
        className: `relative brand-border-gradient rounded-2xl p-8 md:p-12 text-center cursor-pointer transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent glass-panel ${dragging ? "dropzone-glow scale-[1.01]" : "hover:bg-secondary/10"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "filezap-input",
              type: "file",
              accept: acceptedTypes,
              multiple,
              className: "hidden",
              onChange: (e) => handleFiles(e.target.files),
              "data-ocid": "tool.upload_button"
            }
          ),
          selectedFiles && selectedFiles.length > 0 ? (
            // biome-ignore lint/a11y/useKeyWithClickEvents: stops propagation only
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center gap-3",
                onClick: (e) => e.stopPropagation(),
                children: [
                  selectedFiles.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-3 bg-secondary rounded-xl px-4 py-3 w-full max-w-md",
                      children: [
                        isPdf ? /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-accent shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5 text-accent shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 text-left", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: f.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatSize(f.size) })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: (e) => {
                              e.stopPropagation();
                              onFilesSelected(
                                selectedFiles.filter((_, idx) => idx !== i)
                              );
                            },
                            className: "shrink-0 text-muted-foreground hover:text-foreground",
                            "data-ocid": "tool.delete_button",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                          }
                        )
                      ]
                    },
                    `${f.name}-${i}`
                  )),
                  multiple && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: (e) => {
                        var _a;
                        e.stopPropagation();
                        (_a = document.getElementById("filezap-input")) == null ? void 0 : _a.click();
                      },
                      "data-ocid": "tool.upload_button",
                      children: "Add more files"
                    }
                  )
                ]
              }
            )
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 brand-gradient rounded-2xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "w-8 h-8 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold mb-1", children: label || "Drag & Drop Files Here" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "or click to browse • Max ",
                MAX_SIZE_MB,
                "MB"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: isPdf ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 bg-secondary rounded text-xs font-mono text-muted-foreground", children: "PDF" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 bg-secondary rounded text-xs font-mono text-muted-foreground", children: "JPG" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 bg-secondary rounded text-xs font-mono text-muted-foreground", children: "PNG" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 bg-secondary rounded text-xs font-mono text-muted-foreground", children: "WebP" })
            ] }) })
          ] })
        ]
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "mt-2 text-sm text-destructive text-center",
        "data-ocid": "tool.error_state",
        children: error
      }
    )
  ] });
}
export {
  ArrowRight as A,
  DragDropZone as D,
  FileOutput as F,
  Image as I,
  Minimize2 as M,
  Scissors as S,
  Merge as a,
  FileText as b
};
