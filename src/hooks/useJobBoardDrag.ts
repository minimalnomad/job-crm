import type { DragEndEvent } from "@dnd-kit/core";
import type { JobApp, Stage } from "../domain/types";
import { upsertApp } from "../data/repo";

type SetApps = React.Dispatch<React.SetStateAction<JobApp[]>>;

export function useJobBoardDrag(setApps: SetApps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const draggedId = active.id;
    const targetStage = over.id as Stage;

    setApps((prev) => {
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
