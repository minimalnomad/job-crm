import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useDraggable } from "@dnd-kit/core";
import type { JobApp } from "../domain/types";

interface JobAppCardProps {
  job: JobApp;
  onEdit?: (job: JobApp) => void;
  onDelete?: (job: JobApp) => void;
}

export default function JobAppCard({ job, onEdit, onDelete }: JobAppCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: job.id,
      data: { job },
    });

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{
        borderRadius: 1,
        cursor: isDragging ? "grabbing" : "grab",
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        opacity: isDragging ? 0.5 : 1,
        "&:hover": { boxShadow: 3 },
        transition: "box-shadow 0.2s ease-in-out",
        userSelect: "none",
      }}
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
            {onEdit && (
              <IconButton
                size="small"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(job);
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            )}

            {onDelete && (
              <IconButton
                size="small"
                color="error"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(job);
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
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
