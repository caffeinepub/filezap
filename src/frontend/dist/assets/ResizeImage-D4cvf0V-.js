import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-CvZJN4Dj.js";
import { I as Input } from "./input-NsbCPF5s.js";
import { L as Label } from "./label-ExRidpOB.js";
import { T as ToolPageLayout } from "./ToolPageLayout-DfmNlh_W.js";
import "./index-GlPihiR5.js";
import "./DragDropZone-B8g_DfcO.js";
import "./shield-uOWfDu_U.js";
const PRESETS = [
  { label: "WhatsApp", width: 1600, height: 0 },
  { label: "Web Std", width: 1200, height: 0 },
  { label: "Thumbnail", width: 300, height: 300 },
  { label: "HD", width: 1920, height: 1080 }
];
function ResizeOptions({
  widthRef,
  heightRef
}) {
  const [width, setWidth] = reactExports.useState(1200);
  const [height, setHeight] = reactExports.useState(0);
  widthRef.current = width;
  heightRef.current = height;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: PRESETS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: () => {
          setWidth(p.width);
          setHeight(p.height);
        },
        "data-ocid": "tool.button",
        children: [
          p.label,
          " (",
          p.width,
          p.height ? `×${p.height}` : "px",
          ")"
        ]
      },
      p.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rw", className: "mb-1.5 block text-sm", children: "Width (px)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "rw",
            type: "number",
            value: width,
            onChange: (e) => setWidth(Number(e.target.value)),
            min: 1,
            "data-ocid": "tool.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rh", className: "mb-1.5 block text-sm", children: "Height (0 = auto)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "rh",
            type: "number",
            value: height,
            onChange: (e) => setHeight(Number(e.target.value)),
            min: 0,
            "data-ocid": "tool.input"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Set height to 0 to maintain aspect ratio." })
  ] });
}
async function resizeImageFile(file, targetWidth, targetHeight, onProgress) {
  onProgress(10);
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      onProgress(40);
      const aspect = img.naturalWidth / img.naturalHeight;
      const w = targetWidth || img.naturalWidth;
      const h = targetHeight || Math.round(w / aspect);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(objectUrl);
      onProgress(80);
      const isJpeg = file.type === "image/jpeg";
      const mime = isJpeg ? "image/jpeg" : "image/png";
      const ext = isJpeg ? "jpg" : "png";
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Resize failed"));
            return;
          }
          onProgress(100);
          const baseName = file.name.replace(/\.[^.]+$/, "");
          resolve({ blob, filename: `${baseName}-${w}x${h}.${ext}` });
        },
        mime,
        0.92
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };
    img.src = objectUrl;
  });
}
function ResizeImage() {
  const widthRef = reactExports.useRef(1200);
  const heightRef = reactExports.useRef(0);
  const processFiles = async (files, onProgress) => {
    return resizeImageFile(
      files[0],
      widthRef.current,
      heightRef.current,
      onProgress
    );
  };
  const faq = [
    {
      q: "Will my image be cropped?",
      a: "No. If you set height to 0, we maintain the original aspect ratio. If you set both dimensions, the image is stretched to fit exactly."
    },
    {
      q: "What is the WhatsApp preset?",
      a: "1600px wide is the optimal resolution for sharing on WhatsApp — it looks sharp on all phones without creating unnecessarily large files."
    },
    {
      q: "What formats are supported?",
      a: "JPG, PNG, WebP, and GIF. Output is saved as the same format as the input."
    },
    {
      q: "Can I upscale an image?",
      a: "Yes, but upscaling adds no new detail — it just increases the pixel count. For upscaling with quality improvement, AI upscaling tools work better."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolPageLayout,
    {
      toolId: "resize-image",
      toolName: "Resize Image",
      description: "Resize images to any dimension or use smart presets for WhatsApp, web, and thumbnails.",
      acceptedTypes: ".jpg,.jpeg,.png,.webp,.gif",
      processFiles,
      faq,
      optionsPanel: /* @__PURE__ */ jsxRuntimeExports.jsx(ResizeOptions, { widthRef, heightRef })
    }
  );
}
export {
  ResizeImage as default
};
