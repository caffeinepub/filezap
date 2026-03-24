import { r as reactExports, b as useComposedRefs, j as jsxRuntimeExports, d as cn } from "./index-CvZJN4Dj.js";
import { L as Label } from "./label-ExRidpOB.js";
import { S as Slider } from "./slider-hDJnUrnd.js";
import { u as useControllableState, c as createContextScope, a as composeEventHandlers, T as ToolPageLayout } from "./ToolPageLayout-DfmNlh_W.js";
import { u as usePrevious, a as useSize } from "./index-CNURcpaR.js";
import { P as Primitive } from "./index-GlPihiR5.js";
import "./DragDropZone-B8g_DfcO.js";
import "./shield-uOWfDu_U.js";
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
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
