import type { JobApp } from "../domain/types";

const KEY = "jobcrm.apps.v1";

export const loadApps = (): JobApp[] =>
  JSON.parse(localStorage.getItem(KEY) || "[]");

export const saveApps = (jobs: JobApp[]) =>
  localStorage.setItem(KEY, JSON.stringify(jobs));

export const upsertApp = (job: JobApp) => {
  const jobs = loadApps();
  const index = jobs.findIndex((existing) => existing.id === job.id);
  if (index >= 0) jobs[index] = job;
  else jobs.push(job);
  saveApps(jobs);
};

export const deleteApp = (id: string) =>
  saveApps(loadApps().filter((existing) => existing.id !== id));
