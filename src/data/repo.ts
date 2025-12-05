import type { JobApp } from "../domain/types";
import { initialMockApps } from "./mockApps";

const KEY = "jobcrm.apps.v1";

export const loadApps = (): JobApp[] => {
  const storedData = localStorage.getItem(KEY);

  if (!storedData) {
    saveApps(initialMockApps);
    return initialMockApps;
  }

  const apps = JSON.parse(storedData) as JobApp[];

  if (apps.length === 0) {
    saveApps(initialMockApps);
    return initialMockApps;
  }

  return apps;
};

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
