import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FileText, GripVertical, X } from "lucide-react";
import type { MergeFile } from "../store/useMergeStore";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function SortableItem({
  item,
  index,
  onRemove,
}: {
  item: MergeFile;
  index: number;
  onRemove: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 bg-card border border-border rounded-xl p-3 group select-none"
      data-ocid={`merge.item.${index + 1}`}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground p-1 shrink-0"
        data-ocid={"merge.drag_handle"}
        aria-label="Drag to reorder"
      >
        <GripVertical className="w-4 h-4" />
      </button>

      <div className="w-16 h-12 rounded-lg overflow-hidden bg-secondary shrink-0 flex items-center justify-center">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.file.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <FileText className="w-6 h-6 text-muted-foreground" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{item.file.name}</p>
        <p className="text-xs text-muted-foreground">
          {formatSize(item.file.size)}
          {item.pageCount > 0 && (
            <span className="ml-2">{item.pageCount} pages</span>
          )}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
        data-ocid={`merge.delete_button.${index + 1}`}
        aria-label="Remove file"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function MergeFileList({
  files,
  onRemove,
  onReorder,
}: {
  files: MergeFile[];
  onRemove: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onReorder(String(active.id), String(over.id));
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext
        items={files.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2">
          {files.map((item, i) => (
            <SortableItem
              key={item.id}
              item={item}
              index={i}
              onRemove={onRemove}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
