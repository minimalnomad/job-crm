import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Snackbar,
  Alert,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
} from "@mui/material";
import type { JobApp, Stage } from "../domain/types";
import { STAGES } from "../domain/types";
import { loadApps, upsertApp, deleteApp } from "../data/repo";
import JobAppCard from "../components/JobAppCard";
import JobFormDialog from "../components/JobFormDialog";

export default function ApplicationsPage() {
  const [apps, setApps] = useState<JobApp[]>([]);
  const [open, setOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<JobApp | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<JobApp | null>(null);

  useEffect(() => {
    setApps(loadApps());
  }, []);

  const appsByStage = useMemo(() => {
    const map: Record<Stage, JobApp[]> = {
      applied: [],
      interview: [],
      offer: [],
      rejected: [],
    };
    apps.forEach((jobApp) => map[jobApp.stage].push(jobApp));
    return map;
  }, [apps]);

  const handleAppSave = (app: JobApp) => {
    upsertApp(app);
    setApps(loadApps());
  };

  const handleClose = () => {
    setOpen(false);
    setEditingApp(null);
  };

  const handleAddClick = () => {
    setEditingApp(null);
    setOpen(true);
  };

  const handleEditClick = (job: JobApp) => {
    setEditingApp(job);
    setOpen(true);
  };

  const handleDeleteClick = (job: JobApp) => {
    setPendingDelete(job);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    deleteApp(pendingDelete.id);
    setApps(loadApps());
    setConfirmOpen(false);
    setPendingDelete(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3, px: { xs: 2, md: 0 } }}
      >
        <Typography variant="h5">Applications</Typography>
        <Button
          variant="contained"
          onClick={handleAddClick}
          sx={{ borderRadius: 2 }}
        >
          Add
        </Button>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          alignItems: "start",
        }}
      >
        {STAGES.map((stageDef) => (
          <Box key={stageDef.key} sx={{ minWidth: 0 }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
              {stageDef.label}
            </Typography>

            <Stack gap={1}>
              {appsByStage[stageDef.key].map((job) => (
                <JobAppCard
                  key={job.id}
                  job={job}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              ))}
            </Stack>
          </Box>
        ))}
      </Box>

      <JobFormDialog
        open={open}
        onClose={handleClose}
        onSave={handleAppSave}
        editingApp={editingApp}
      />
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete Job</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{pendingDelete?.title}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete} variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
