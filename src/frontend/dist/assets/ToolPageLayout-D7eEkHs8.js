import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, R as React, r as reactExports, A as Dialog, E as DialogContent, G as DialogHeader, H as DialogTitle, I as DialogDescription, B as Button, C as Check, J as Copy, y as useActor, z as Share2, o as ue } from "./index-BvMqnfhD.js";
import { I as Image, A as ArrowRight, a as Minimize2, M as Merge, S as Scissors, F as FileOutput, D as DragDropZone } from "./DragDropZone-pzKI25H8.js";
import { F as FileText, R as RotateCcw } from "./rotate-ccw-Bmx2dr2A.js";
import { C as CircleCheckBig } from "./circle-check-big-BCkoZsdf.js";
import { P as ProgressBar, D as Download } from "./ProgressBar-C2XzB2ev.js";
import { S as Shield } from "./shield-CBuBy4yV.js";
import { S as Sparkles } from "./sparkles-DcVQ6SrG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode);
const fmt = (b) => {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(2)} MB`;
};
function FilePreview({
  fileName,
  originalSize,
  processedSize,
  isPdf
}) {
  const reduction = originalSize > 0 ? Math.round((1 - processedSize / originalSize) * 100) : 0;
  const Icon = isPdf ? FileText : Image;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "w-full bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4",
      "data-ocid": "tool.success_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 text-center sm:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium truncate", children: fileName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center sm:justify-start gap-3 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: fmt(originalSize) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-4 h-4 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-accent", children: fmt(processedSize) })
          ] })
        ] }),
        reduction > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-3 py-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-accent", children: [
            "-",
            reduction,
            "%"
          ] })
        ] })
      ]
    }
  );
}
const ALL_TOOLS = [
  {
    id: "compress-pdf",
    name: "Compress PDF",
    desc: "Shrink PDF size up to 70%",
    color: "from-blue-500 to-blue-600",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize2, { className: "w-5 h-5" }),
    category: "pdf"
  },
  {
    id: "merge-pdf",
    name: "Merge PDF",
    desc: "Combine multiple PDFs into one",
    color: "from-violet-500 to-violet-600",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Merge, { className: "w-5 h-5" }),
    category: "pdf"
  },
  {
    id: "split-pdf",
    name: "Split PDF",
    desc: "Split pages into separate files",
    color: "from-pink-500 to-pink-600",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-5 h-5" }),
    category: "pdf"
  },
  {
    id: "pdf-to-word",
    name: "PDF → Word",
    desc: "Extract text from PDF documents",
    color: "from-orange-500 to-orange-600",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileOutput, { className: "w-5 h-5" }),
    category: "pdf"
  },
  {
    id: "pdf-to-jpg",
    name: "PDF → JPG",
    desc: "Convert PDF pages to images",
    color: "from-green-500 to-green-600",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5" }),
    category: "pdf"
  },
  {
    id: "add-watermark",
    name: "Add Watermark",
    desc: "Stamp text on every PDF page",
    color: "from-teal-500 to-teal-600",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5" }),
    category: "pdf"
  },
  {
    id: "compress-image",
    name: "Compress Image",
    desc: "Lossless or lossy compression",
    color: "from-cyan-500 to-cyan-600",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize2, { className: "w-5 h-5" }),
    category: "image"
  },
  {
    id: "resize-image",
    name: "Resize Image",
    desc: "Smart resize for any platform",
    color: "from-indigo-500 to-indigo-600",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5" }),
    category: "image"
  },
  {
    id: "convert-image",
    name: "Convert Image",
    desc: "Convert between JPG, PNG, WebP",
    color: "from-rose-500 to-rose-600",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileOutput, { className: "w-5 h-5" }),
    category: "image"
  }
];
function RelatedTools({ currentToolId }) {
  const current = ALL_TOOLS.find((t) => t.id === currentToolId);
  const sameCategory = ALL_TOOLS.filter(
    (t) => t.id !== currentToolId && t.category === (current == null ? void 0 : current.category)
  );
  const otherCategory = ALL_TOOLS.filter(
    (t) => t.id !== currentToolId && t.category !== (current == null ? void 0 : current.category)
  );
  const related = [...sameCategory, ...otherCategory].slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold mb-4", children: "You might also need" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: related.map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: `/${tool.id}`,
        className: "group flex items-start gap-4 p-5 bg-card border border-border rounded-xl tool-card-hover",
        "data-ocid": `related.${tool.id.replace(/-/g, "_")}.link`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shrink-0`,
              children: tool.icon
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold group-hover:text-accent transition-colors text-sm", children: tool.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: tool.desc })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-muted-foreground ml-auto shrink-0 group-hover:text-accent transition-colors" })
        ]
      },
      tool.id
    )) })
  ] });
}
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = React.createContext && /* @__PURE__ */ React.createContext(DefaultContext);
var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /* @__PURE__ */ React.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return (props) => /* @__PURE__ */ React.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = (conf) => {
    var {
      attr,
      size,
      title
    } = props, svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /* @__PURE__ */ React.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /* @__PURE__ */ React.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? /* @__PURE__ */ React.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}
function SiWhatsapp(props) {
  return GenIcon({ "attr": { "role": "img", "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" }, "child": [] }] })(props);
}
function SiX(props) {
  return GenIcon({ "attr": { "role": "img", "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" }, "child": [] }] })(props);
}
function SharePopup({
  open,
  onClose,
  toolName
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const url = window.location.href;
  const shareText = `I just used ${toolName} on BoltTools.app — works insanely fast and 100% free! No signup needed 🚀 Try it: ${url}`;
  const copy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const shareX = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };
  const shareWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "share.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-5 h-5 text-red-400" }),
        "This saved you time?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Share BoltTools.app and help others discover it! 🚀" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-secondary rounded-lg p-3 text-sm text-muted-foreground mb-4 break-words", children: shareText }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: copy,
            className: "w-full",
            "data-ocid": "share.primary_button",
            children: [
              copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4 mr-2" }),
              copied ? "Copied!" : "Copy Share Link"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: shareX,
              "data-ocid": "share.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SiX, { className: "w-4 h-4 mr-2" }),
                " Share on X"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: shareWhatsApp,
              "data-ocid": "share.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SiWhatsapp, { className: "w-4 h-4 mr-2" }),
                " WhatsApp"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            onClick: onClose,
            "data-ocid": "share.close_button",
            children: "Maybe later"
          }
        )
      ] })
    ] })
  ] }) });
}
function getSuggestions(files, currentToolId) {
  const suggestions = [];
  const file = files[0];
  if (!file) return [];
  const isPdf = file.type === "application/pdf" || file.name.endsWith(".pdf");
  const isImage = file.type.startsWith("image/");
  const sizeMB = file.size / 1024 / 1024;
  if (isPdf) {
    if (sizeMB > 5 && currentToolId !== "compress-pdf")
      suggestions.push({
        label: "Reduce file size by up to 70%",
        href: "/compress-pdf",
        highlight: true
      });
    if (currentToolId !== "pdf-to-word")
      suggestions.push({
        label: "Convert to Word for editing",
        href: "/pdf-to-word"
      });
    if (currentToolId !== "pdf-to-jpg")
      suggestions.push({
        label: "Convert pages to images",
        href: "/pdf-to-jpg"
      });
  }
  if (isImage) {
    if (sizeMB > 2 && currentToolId !== "compress-image")
      suggestions.push({
        label: "Compress to save storage space",
        href: "/compress-image",
        highlight: true
      });
    if (currentToolId !== "resize-image")
      suggestions.push({
        label: "Optimize for WhatsApp sharing (1600px)",
        href: "/resize-image"
      });
    if (currentToolId !== "convert-image")
      suggestions.push({
        label: "Convert to WebP for faster web loading",
        href: "/convert-image"
      });
  }
  return suggestions.slice(0, 3);
}
function SmartSuggestions({
  files,
  currentToolId
}) {
  const suggestions = getSuggestions(files, currentToolId);
  if (suggestions.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "w-full bg-secondary/50 rounded-xl p-4 border border-border",
      "data-ocid": "tool.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-4 h-4 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Smart Suggestions" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: suggestions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: s.href,
            className: `flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors hover:bg-secondary ${s.highlight ? "border-accent/50 text-accent bg-accent/5" : "border-border text-muted-foreground"}`,
            "data-ocid": "tool.button",
            children: [
              s.label,
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
            ]
          },
          s.href
        )) })
      ]
    }
  );
}
function ToolPageLayout({
  toolId,
  toolName,
  description,
  acceptedTypes,
  multiple,
  processFiles,
  faq,
  optionsPanel,
  icon
}) {
  const [files, setFiles] = reactExports.useState([]);
  const [result, setResult] = reactExports.useState(null);
  const [originalSize, setOriginalSize] = reactExports.useState(0);
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const [error, setError] = reactExports.useState(null);
  const [showShare, setShowShare] = reactExports.useState(false);
  const downloadAnchorRef = reactExports.useRef(null);
  const { actor } = useActor();
  const isPdf = acceptedTypes.includes(".pdf");
  const saveLastTool = reactExports.useCallback(() => {
    localStorage.setItem("filezap_last_tool", toolId);
    localStorage.setItem("filezap_last_tool_name", toolName);
    localStorage.setItem("filezap_last_tool_path", `/${toolId}`);
  }, [toolId, toolName]);
  const handleFilesSelected = (selected) => {
    setFiles(selected);
    setResult(null);
    setError(null);
    setOriginalSize(selected.reduce((acc, f) => acc + f.size, 0));
    saveLastTool();
  };
  const handleProcess = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setProgress(0);
    setError(null);
    try {
      const res = await processFiles(files, setProgress);
      setResult(res);
      setProgress(100);
      ue.success("File processed successfully!");
      actor == null ? void 0 : actor.recordToolUsage(toolId).catch(() => {
      });
      const a = actor;
      if (typeof (a == null ? void 0 : a.recordFileTyped) === "function") {
        a.recordFileTyped(isPdf ? "pdf" : "image").catch(() => {
        });
      } else {
        actor == null ? void 0 : actor.recordFile().catch(() => {
        });
      }
      if (typeof (a == null ? void 0 : a.recordMagicButtonClick) === "function") {
        a.recordMagicButtonClick().catch(() => {
        });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Processing failed. Please try again.";
      setError(msg);
      ue.error(msg);
    } finally {
      setIsProcessing(false);
    }
  };
  const handleDownload = () => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5e3);
    setShowShare(true);
    ue.info("📌 Bookmark BoltTools.app to use it again instantly!", {
      duration: 4e3
    });
    const ac = actor;
    if (typeof (ac == null ? void 0 : ac.recordSharePopup) === "function") {
      ac.recordSharePopup().catch(() => {
      });
    }
    downloadAnchorRef.current = null;
  };
  const handleReset = () => {
    setFiles([]);
    setResult(null);
    setError(null);
    setProgress(0);
  };
  const handleShareOpen = () => {
    setShowShare(true);
    const ac = actor;
    if (typeof (ac == null ? void 0 : ac.recordSharePopup) === "function") {
      ac.recordSharePopup().catch(() => {
      });
    }
  };
  document.title = `${toolName} — Free Online Tool | BoltTools.app`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl font-extrabold mb-2", children: toolName }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-8 text-xs text-muted-foreground bg-secondary/50 rounded-full px-4 py-2 w-fit mx-auto border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-accent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Your files are processed entirely in your browser — we never see, store, or upload your files. 🔒" })
    ] }),
    optionsPanel && !isProcessing && !result && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: optionsPanel }),
    !isProcessing && !result && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DragDropZone,
      {
        acceptedTypes,
        multiple,
        onFilesSelected: handleFilesSelected,
        selectedFiles: files
      }
    ),
    files.length > 0 && !isProcessing && !result && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SmartSuggestions, { files, currentToolId: toolId }) }),
    files.length > 0 && !isProcessing && !result && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: handleProcess,
          className: "flex-1 h-12 text-base font-semibold brand-gradient border-0 text-white hover:opacity-90",
          "data-ocid": "tool.primary_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 mr-2" }),
            "✨ Make this file perfect"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: handleProcess,
          className: "flex-1 h-12",
          "data-ocid": "tool.submit_button",
          children: [
            "Process File",
            files.length > 1 ? "s" : ""
          ]
        }
      )
    ] }),
    isProcessing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "w-full h-12 text-base font-semibold brand-gradient border-0 text-white magic-glow-animate cursor-not-allowed",
          disabled: true,
          "data-ocid": "tool.loading_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 mr-2 animate-spin" }),
            " Processing..."
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { progress, isActive: isProcessing })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-xl text-sm text-destructive",
        "data-ocid": "tool.error_state",
        children: error
      }
    ),
    result && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilePreview,
        {
          fileName: result.filename,
          originalSize,
          processedSize: result.blob.size,
          isPdf
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleDownload,
            className: "flex-1 h-12 text-base font-semibold brand-gradient border-0 text-white hover:opacity-90",
            "data-ocid": "tool.primary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-5 h-5 mr-2" }),
              "Download File"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: handleShareOpen,
            className: "h-12",
            "data-ocid": "tool.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4 mr-2" }),
              " Share"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            onClick: handleReset,
            className: "h-12",
            "data-ocid": "tool.secondary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4 mr-2" }),
              " New File"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SharePopup,
      {
        open: showShare,
        onClose: () => setShowShare(false),
        toolName
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedTools, { currentToolId: toolId }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adsense-placeholder mt-10", children: "Advertisement" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-4", children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: faq.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5",
          "data-ocid": `tool.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-1", children: item.q }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: item.a })
          ]
        },
        i
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "adsense-placeholder mt-8", children: "Advertisement" })
  ] });
}
export {
  ToolPageLayout as T
};
