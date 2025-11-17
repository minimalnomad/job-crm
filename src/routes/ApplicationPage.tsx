import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { JobApp, Stage } from "../domain/types";
import { STAGES } from "../domain/types";
import { loadApps, upsertApp, deleteApp } from "../data/repo";
import JobFormDialog from "../components/JobFormDialog";
import DroppableColumn from "../components/DroppableColumn";

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
    const map = STAGES.reduce(
      (acc, s) => ({ ...acc, [s.key]: [] as JobApp[] }),
      {} as Record<Stage, JobApp[]>
    );
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

      <DndContext onDragEnd={handleDragEnd}>
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
            <DroppableColumn
              key={stageDef.key}
              stageDef={stageDef}
              jobs={appsByStage[stageDef.key]}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </Box>
      </DndContext>

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
