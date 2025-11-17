import { Box, Stack, Typography } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import JobAppCard from "./JobAppCard";
import type { JobApp, Stage } from "../domain/types";

interface DroppableColumnProps {
  stageDef: { key: Stage; label: string };
  jobs: JobApp[];
  onEdit: (job: JobApp) => void;
  onDelete: (job: JobApp) => void;
}

export default function DroppableColumn({
  stageDef,
  jobs,
  onEdit,
  onDelete,
}: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: stageDef.key,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        minWidth: 0,
        minHeight: "70vh",
        transition: "background-color 0.2s",
        backgroundColor: isOver ? "rgba(0, 0, 0, 0.05)" : "transparent",
        borderRadius: 1,
        p: 1,
      }}
    >
      <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
        {stageDef.label}
      </Typography>
      <Stack gap={1}>
        {jobs.map((job) => (
          <JobAppCard
            key={job.id}
            job={job}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </Stack>
    </Box>
  );
}
