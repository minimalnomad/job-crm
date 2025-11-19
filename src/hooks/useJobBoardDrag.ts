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
    if (!isStage(over.id)) return;

    const targetStage = over.id;

    setApps((prev) => {
      const prevJob = prev.find((job) => job.id === draggedId);
      if (!prevJob) return prev;

      if (prevJob.stage === targetStage) return prev;

      const updated = prev.map((job) =>
        job.id === draggedId ? { ...job, stage: targetStage } : job
      );

      const changedJob = updated.find((job) => job.id === draggedId);
      if (changedJob) upsertApp(changedJob);

      return updated;
    });
  };

  return { handleDragEnd };
}
