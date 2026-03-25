import { r as reactExports, j as jsxRuntimeExports } from "./index-BFibDN1D.js";
import { L as Label } from "./label--51PUgiM.js";
import { S as Slider } from "./slider-79axiSDa.js";
import { S as Switch } from "./switch-ov5AENIK.js";
import { T as ToolPageLayout } from "./ToolPageLayout-BMNJSYtz.js";
import "./index-C_aVSdMy.js";
import "./index-BGkL2C-a.js";
import "./DragDropZone-CCwh-WxW.js";
import "./shield-MFsbNxDC.js";
import "./sparkles-CEWBQRUj.js";
function CompressOptions({
  lossyRef,
  qualityRef
}) {
  const [lossy, setLossy] = reactExports.useState(true);
  const [quality, setQuality] = reactExports.useState(75);
  lossyRef.current = lossy;
  qualityRef.current = quality;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: "Lossy compression (smaller size)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Switch,
        {
          checked: lossy,
          onCheckedChange: setLossy,
          "data-ocid": "tool.switch"
        }
      )
    ] }),
    lossy && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "mb-1.5 block text-sm", children: [
        "Quality: ",
        quality,
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          min: 30,
          max: 95,
          step: 5,
          value: [quality],
          onValueChange: ([v]) => setQuality(v),
          className: "w-full"
        }
      )
    ] })
  ] });
}
async function compressImageFile(file, lossy, quality, onProgress) {
  onProgress(10);
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      onProgress(40);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(objectUrl);
      onProgress(70);
      const mimeType = lossy ? "image/jpeg" : "image/png";
      const q = lossy ? quality / 100 : void 0;
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Compression failed"));
            return;
          }
          onProgress(100);
          const ext = lossy ? "jpg" : "png";
          const baseName = file.name.replace(/\.[^.]+$/, "");
          resolve({ blob, filename: `${baseName}-compressed.${ext}` });
        },
        mimeType,
        q
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };
    img.src = objectUrl;
  });
}
function CompressImage() {
  const lossyRef = reactExports.useRef(true);
  const qualityRef = reactExports.useRef(75);
  const processFiles = async (files, onProgress) => {
    return compressImageFile(
      files[0],
      lossyRef.current,
      qualityRef.current,
      onProgress
    );
  };
  const faq = [
    {
      q: "What is lossy vs lossless compression?",
      a: "Lossy compression (JPEG) significantly reduces file size by discarding some image data. Lossless (PNG) reduces size without any quality loss but achieves less compression."
    },
    {
      q: "What quality setting should I use?",
      a: "For web use, 70-80% is a great balance of quality and size. For print, use 85-95%. For thumbnails, 60-70% works well."
    },
    {
      q: "Which image formats are supported?",
      a: "JPG, PNG, WebP, and GIF are all supported for upload. Output is JPEG (lossy) or PNG (lossless)."
    },
    {
      q: "How much can I reduce my image size?",
      a: "Lossy compression at 75% quality typically reduces size by 60-80%. Results vary based on image content."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolPageLayout,
    {
      toolId: "compress-image",
      toolName: "Compress Image",
      description: "Reduce image file size with lossless or lossy compression. Fast, free, and private.",
      acceptedTypes: ".jpg,.jpeg,.png,.webp,.gif",
      processFiles,
      faq,
      optionsPanel: /* @__PURE__ */ jsxRuntimeExports.jsx(CompressOptions, { lossyRef, qualityRef })
    }
  );
}
export {
  CompressImage as default
};
