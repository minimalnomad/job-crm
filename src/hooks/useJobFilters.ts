import { useMemo, useState } from "react";
import { type JobApp, type FilterState } from "../domain/types";

export function useJobFilters(apps: JobApp[]) {
  const [filter, setFilter] = useState<FilterState>({
    search: "",
    stage: "all",
    tag: "all",
  });

  const filteredApps = useMemo(() => {
    const normalizedSearch = filter.search.toLowerCase();

    return apps.filter((job) => {
      const matchStage = filter.stage === "all" || job.stage === filter.stage;
      const matchTag = filter.tag === "all" || job.tags?.includes(filter.tag);

      const matchSearch =
        job.title.toLowerCase().includes(normalizedSearch) ||
        job.company.toLowerCase().includes(normalizedSearch) ||
        (job.notes ?? "").toLowerCase().includes(normalizedSearch);

      return matchStage && matchTag && matchSearch;
    });
  }, [apps, filter]);
  return { filter, setFilter, filteredApps };
}
