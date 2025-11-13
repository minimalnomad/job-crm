import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import type { JobApp } from "../domain/types";

interface JobAppCardProps {
  job: JobApp;
  onClick?: (job: JobApp) => void;
}

export default function JobAppCard({ job, onClick }: JobAppCardProps) {
  return (
    <Card
      variant="outlined"
      onClick={() => onClick?.(job)}
      sx={{
        borderRadius: 0,
        borderColor: "black",
        cursor: onClick ? "pointer" : "default",
        "&:hover": { boxShadow: 3 },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Typography fontWeight={700}>{job.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {job.company}
        </Typography>

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
