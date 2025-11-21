import { TextField, MenuItem, Stack } from "@mui/material";
import type { FilterState } from "../domain/types";
import { STAGES } from "../domain/types";

interface Props {
  filter: FilterState;
  onChange: (next: FilterState) => void;
  allTags: string[];
}

export default function SearchFilterBar({ filter, onChange, allTags }: Props) {
  const handleChange =
    (key: keyof FilterState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange({ ...filter, [key]: e.target.value });
    };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      gap={2}
      sx={{ mb: 3 }}
      alignItems="center"
    >
      <TextField
        label="Search title"
        size="small"
        value={filter.search}
        onChange={handleChange("search")}
      />

      <TextField
        label="Stage"
        size="small"
        select
        value={filter.stage}
        onChange={handleChange("stage")}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="all">All</MenuItem>
        {STAGES.map((s) => (
          <MenuItem key={s.key} value={s.key}>
            {s.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Tag"
        size="small"
        select
        value={filter.tag}
        onChange={handleChange("tag")}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="all">All</MenuItem>
        {allTags.map((tag) => (
          <MenuItem key={tag} value={tag}>
            {tag}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}
