import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { DragIndicator, Delete } from "@mui/icons-material";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import type { JobApp } from "../domain/types";
interface JobAppCardProps {
  job: JobApp;
  onEdit?: (job: JobApp) => void;
  onDelete?: (job: JobApp) => void;
}

export default function JobAppCard({ job, onEdit, onDelete }: JobAppCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
    isDragging,
  } = useDraggable({
    id: job.id,
    data: { job },
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: job.id,
  });

  return (
    <Card
      ref={(node) => {
        setDragRef(node);
        setDropRef(node);
      }}
      sx={{
        borderRadius: 1,
        cursor: "pointer",
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isOver ? "rgba(0, 0, 0, 0.05)" : "white",
        "&:hover": { boxShadow: 3 },
        transition: "box-shadow 0.2s ease-in-out",
        userSelect: "none",
      }}
      onClick={() => onEdit?.(job)}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography fontWeight={700}>{job.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {job.company}
            </Typography>
          </Box>

          <Stack direction="row" spacing={0.5}>
            {onDelete && (
              <IconButton
                aria-label="delete job"
                size="small"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(job);
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}

            <IconButton
              size="small"
              {...listeners}
              {...attributes}
              onClick={(e) => e.stopPropagation()}
              sx={{ cursor: "grab" }}
            >
              <DragIndicator fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        {!!job.tags.length && (
          <Stack direction="row" gap={0.5} flexWrap="wrap" sx={{ mt: 1 }}>
            {job.tags.map((tag) => (
              <Chip key={tag} size="small" label={tag} />
            ))}
          </Stack>
        )}

        {job.notes && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            {job.notes}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
