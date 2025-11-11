import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { JobApp, Stage } from "../domain/types";
import { STAGES } from "../domain/types";
import { loadApps, upsertApp } from "../data/repo";

const newId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

export default function ApplicationsPage() {
  const [apps, setApps] = useState<JobApp[]>([]);
  const [open, setOpen] = useState(false);

  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [stage, setStage] = useState<Stage>("applied");
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");

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

  const resetForm = () => {
    setCompany("");
    setTitle("");
    setStage("applied");
    setTags("");
    setNotes("");
    setContactName("");
    setContactEmail("");
  };

  const handleSave = () => {
    if (!company.trim() || !title.trim()) return;
    const now = new Date().toISOString();
    const app: JobApp = {
      id: newId(),
      company: company.trim(),
      title: title.trim(),
      stage,
      tags: tags
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      notes: notes.trim() || undefined,
      contacts:
        contactName || contactEmail
          ? [
              {
                name: contactName || "Contact",
                email: contactEmail || undefined,
              },
            ]
          : [],
      createdAt: now,
      updatedAt: now,
    };
    upsertApp(app);
    setApps(loadApps());
    setOpen(false);
    resetForm();
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
          onClick={() => setOpen(true)}
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
                <Card
                  key={job.id}
                  variant="outlined"
                  sx={{
                    borderRadius: 0,
                    borderColor: "black",
                    "&:hover": { boxShadow: 3 },
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography fontWeight={700}>{job.title}</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {job.company}
                    </Typography>

                    {!!job.tags.length && (
                      <Stack
                        direction="row"
                        gap={0.5}
                        flexWrap="wrap"
                        sx={{ mt: 1 }}
                      >
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
              ))}
            </Stack>
          </Box>
        ))}
      </Box>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          resetForm();
        }}
        fullWidth
      >
        <DialogTitle>Add Job</DialogTitle>
        <DialogContent>
          <Stack gap={2} sx={{ mt: 1 }}>
            <TextField
              label="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            <TextField
              label="Job Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              select
              label="Stage"
              value={stage}
              onChange={(e) => setStage(e.target.value as Stage)}
            >
              {STAGES.map((stageDef) => (
                <MenuItem key={stageDef.key} value={stageDef.key}>
                  {stageDef.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Tags (comma separated)"
              placeholder="remote, urgent"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <TextField
              label="Notes"
              multiline
              minRows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <Divider>Contact (optional)</Divider>
            <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
              <TextField
                label="Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
              <TextField
                label="Email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              resetForm();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!company.trim() || !title.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
