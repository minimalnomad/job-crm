import { useReducer, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import type { JobApp, Stage } from "../domain/types";
import { STAGES } from "../domain/types";
import { newId } from "../utils/id";

type JobFormState = Omit<
  JobApp,
  "id" | "createdAt" | "updatedAt" | "contacts" | "tags"
> & {
  tags: string;
  contactName: string;
  contactEmail: string;
};

const initialFormState: JobFormState = {
  company: "",
  title: "",
  stage: "applied",
  tags: "",
  notes: "",
  contactName: "",
  contactEmail: "",
};

type FormAction =
  | { type: "SET_FIELD"; field: keyof JobFormState; value: string | Stage }
  | { type: "RESET"; payload?: JobApp | null };

const formReducer = (state: JobFormState, action: FormAction): JobFormState => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "RESET": {
      if (!action.payload) return initialFormState;

      const app = action.payload;

      return {
        company: app.company,
        title: app.title,
        stage: app.stage,
        tags: app.tags.join(", "),
        notes: app.notes || "",
        contactName: app.contacts?.[0]?.name || "",
        contactEmail: app.contacts?.[0]?.email || "",
      };
    }

    default:
      return state;
  }
};

interface JobFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (app: JobApp) => void;
  editingApp?: JobApp | null;
}

export default function JobFormDialog({
  open,
  onClose,
  onSave,
  editingApp,
}: JobFormDialogProps) {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  useEffect(() => {
    dispatch({ type: "RESET", payload: editingApp || null });
  }, [editingApp]);

  const { company, title, stage, tags, notes, contactName, contactEmail } =
    formState;

  const canSave = company.trim() && title.trim();

  const handleClose = () => {
    onClose();
    dispatch({ type: "RESET" });
  };

  const handleSave = () => {
    if (!canSave) return;

    const now = new Date().toISOString();
    const name = contactName.trim();
    const email = contactEmail.trim() || undefined;

    const app: JobApp = {
      id: editingApp?.id ?? newId(),
      company,
      title,
      stage,

      tags: Array.from(
        new Set(
          tags
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter(Boolean)
        )
      ),

      notes: notes || undefined,

      contacts: name || email ? [{ name, email }] : [],

      createdAt: editingApp?.createdAt ?? now,
      updatedAt: now,
    };

    onSave(app);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth keepMounted>
      <DialogTitle id="job-form-dialog-title">
        {editingApp ? "EDIT JOB" : "ADD JOB"}
      </DialogTitle>
      <DialogContent>
        <Stack gap={2} sx={{ mt: 1 }}>
          <TextField
            label="Company"
            value={company}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "company",
                value: e.target.value,
              })
            }
            required
            autoFocus={!editingApp}
            aria-required="true"
          />
          <TextField
            label="Job Title"
            value={title}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "title",
                value: e.target.value,
              })
            }
            required
            aria-required="true"
          />
          <TextField
            select
            label="Stage"
            value={stage}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "stage",
                value: e.target.value,
              })
            }
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
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "tags",
                value: e.target.value,
              })
            }
          />
          <TextField
            label="Notes"
            multiline
            minRows={3}
            value={notes}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "notes",
                value: e.target.value,
              })
            }
          />
          <Divider>Contact (optional)</Divider>
          <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
            <TextField
              label="Name"
              value={contactName}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "contactName",
                  value: e.target.value,
                })
              }
            />
            <TextField
              label="Email"
              type="email"
              value={contactEmail}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "contactEmail",
                  value: e.target.value,
                })
              }
              sx={{ flexGrow: 1 }}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ mb: 1, mr: 1.5 }}>
        <Button onClick={handleClose}>CANCEL</Button>
        <Button variant="contained" onClick={handleSave} disabled={!canSave}>
          SAVE
        </Button>
      </DialogActions>
    </Dialog>
  );
}
