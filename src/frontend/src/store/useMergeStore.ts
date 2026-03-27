import { create } from "zustand";

export interface MergeFile {
  id: string;
  file: File;
  thumbnail: string | null;
  pageCount: number;
}

export interface MergeResult {
  blob: Blob;
  filename: string;
  originalSize: number;
  resultSize: number;
}

interface MergeStore {
  files: MergeFile[];
  progress: number;
  status: "idle" | "processing" | "done" | "error";
  statusText: string;
  result: MergeResult | null;
  networkRequests: number;
  dataSent: number;
  optimize: boolean;
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  reorderFiles: (activeId: string, overId: string) => void;
  setProgress: (p: number, text?: string) => void;
  setResult: (r: MergeResult) => void;
  setStatus: (s: MergeStore["status"]) => void;
  setOptimize: (v: boolean) => void;
  reset: () => void;
  setThumbnail: (id: string, thumb: string, pageCount: number) => void;
}

export const useMergeStore = create<MergeStore>((set) => ({
  files: [],
  progress: 0,
  status: "idle",
  statusText: "",
  result: null,
  networkRequests: 0,
  dataSent: 0,
  optimize: true,

  addFiles: (newFiles) =>
    set((state) => ({
      files: [
        ...state.files,
        ...newFiles.map((file) => ({
          id: crypto.randomUUID(),
          file,
          thumbnail: null,
          pageCount: 0,
        })),
      ],
    })),

  removeFile: (id) =>
    set((state) => ({ files: state.files.filter((f) => f.id !== id) })),

  reorderFiles: (activeId, overId) =>
    set((state) => {
      const oldIndex = state.files.findIndex((f) => f.id === activeId);
      const newIndex = state.files.findIndex((f) => f.id === overId);
      if (oldIndex === -1 || newIndex === -1) return state;
      const files = [...state.files];
      const [moved] = files.splice(oldIndex, 1);
      files.splice(newIndex, 0, moved);
      return { files };
    }),

  setProgress: (p, text) =>
    set({ progress: p, statusText: text ?? "Processing..." }),

  setResult: (r) => set({ result: r, status: "done", progress: 100 }),

  setStatus: (s) => set({ status: s }),

  setOptimize: (v) => set({ optimize: v }),

  reset: () =>
    set({
      files: [],
      progress: 0,
      status: "idle",
      statusText: "",
      result: null,
      networkRequests: 0,
      dataSent: 0,
    }),

  setThumbnail: (id, thumb, pageCount) =>
    set((state) => ({
      files: state.files.map((f) =>
        f.id === id ? { ...f, thumbnail: thumb, pageCount } : f,
      ),
    })),
}));
