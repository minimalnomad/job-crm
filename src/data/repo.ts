import type { JobApp } from "../domain/types";

const KEY = "jobcrm.apps.v1";

export const loadApps = (): JobApp[] =>
  JSON.parse(localStorage.getItem(KEY) || "[]");

export const saveApps = (list: JobApp[]) =>
  localStorage.setItem(KEY, JSON.stringify(list));

export const upsertApp = (app: JobApp) => {
  const list = loadApps();
  const index = list.findIndex((a) => a.id === app.id);
  if (index >= 0) list[index] = app;
  else list.push(app);
  saveApps(list);
};

export const deleteApp = (id: string) =>
  saveApps(loadApps().filter((a) => a.id !== id));
