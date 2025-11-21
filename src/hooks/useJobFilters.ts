import { useMemo, useState } from "react";
import { type JobApp, type Stage } from "../domain/types";

export function useJobFilters(apps: JobApp[]) {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<Stage | "all">("all");
  const [tag, setTag] = useState<string | "all">("all");

  const filteredApps = useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    return apps.filter((job) => {
      const matchStage = stage === "all" || job.stage === stage;

      const matchTag = tag === "all" || job.tags?.includes(tag);

      const matchSearch =
        job.title.toLowerCase().includes(normalizedSearch) ||
        job.company.toLowerCase().includes(normalizedSearch) ||
        (job.notes ?? "").toLowerCase().includes(normalizedSearch);

      return matchStage && matchTag && matchSearch;
    });
  }, [apps, search, tag, stage]);

  return {
    search,
    setSearch,
    stage,
    setStage,
    tag,
    setTag,
    filteredApps,
  };
}
