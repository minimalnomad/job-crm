import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { JobApp } from "../domain/types";

interface JobAppCardProps {
  job: JobApp;
  onEdit?: (job: JobApp) => void;
  onDelete?: (job: JobApp) => void;
}

export default function JobAppCard({ job, onEdit, onDelete }: JobAppCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 0,
        borderColor: "black",
        "&:hover": { boxShadow: 3 },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack>
            <Typography fontWeight={700}>{job.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {job.company}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.5}>
            <IconButton aria-label="Edit job" onClick={() => onEdit?.(job)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Delete job" onClick={() => onDelete?.(job)}>
              <DeleteIcon />
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
