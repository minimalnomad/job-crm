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

const COLUMN_MIN_HEIGHT = "70vh";

export default function DroppableColumn({
  stageDef,
  jobs,
  onEdit,
  onDelete,
}: DroppableColumnProps) {
  const isColumnEmpty = jobs.length === 0;
  const EXTRA_SPACE = "20vh";

  const { setNodeRef, isOver } = useDroppable({
    id: stageDef.key,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        minWidth: 0,
        width: { xs: "100%", sm: "auto" },
        transition: "background-color 0.2s",
        backgroundColor: isOver ? "rgba(0, 0, 0, 0.05)" : "transparent",
        borderRadius: 1,
        minHeight: {
          xs: "auto",
          md: COLUMN_MIN_HEIGHT,
        },
      }}
    >
      <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
        {stageDef.label}
      </Typography>
      <Stack
        gap={1.5}
        sx={{ minHeight: isColumnEmpty ? "20vh" : "auto", pb: EXTRA_SPACE }}
      >
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
