import type { DragEndEvent } from "@dnd-kit/core";
import { STAGES, type JobApp, type Stage } from "../domain/types";
import { upsertApp } from "../data/repo";

type SetApps = React.Dispatch<React.SetStateAction<JobApp[]>>;

function isStage(value: string | number): value is Stage {
  return STAGES.some((s) => s.key === value);
}

export function useJobBoardDrag(setApps: SetApps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const draggedId = active.id;
    const overId = over.id;

    setApps((prev) => {
      const oldIndex = prev.findIndex((job) => job.id === draggedId);
      if (oldIndex === -1) return prev;

      const draggedJob = prev[oldIndex];

      const newIndex = prev.findIndex((job) => job.id === overId);

      if (newIndex !== -1) {
        const reordered = [...prev];
        reordered.splice(oldIndex, 1);
        reordered.splice(newIndex, 0, draggedJob);
        return reordered;
      }

      if (isStage(overId)) {
        const targetStage = overId;

        if (draggedJob.stage === targetStage) return prev;

        const updated = prev.map((job) =>
          job.id === draggedId ? { ...job, stage: targetStage } : job
        );

        const changedJob = updated.find((job) => job.id === draggedId);
        if (changedJob) upsertApp(changedJob);

        return updated;
      }

      return prev;
    });
  };

  return { handleDragEnd };
}
