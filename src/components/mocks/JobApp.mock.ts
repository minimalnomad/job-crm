import type { JobApp } from "../../domain/types";

export const createMockJob = (overrides: Partial<JobApp> = {}): JobApp => ({
  id: "job-1",
  title: "Frontend Engineer",
  company: "Google",
  stage: "applied",
  tags: ["remote", "frontend"],
  contacts: [],
  createdAt: "2025-07-01",
  updatedAt: "2025-08-01",
  ...overrides,
});

export const mockJobApps: JobApp[] = [
  createMockJob({
    id: "1",
    title: "Frontend Engineer",
    company: "Google",
    stage: "applied",
    tags: ["frontend"],
    notes: "typescript",
  }),
  createMockJob({
    id: "2",
    title: "Backend Developer",
    company: "Amazon",
    stage: "interview",
    tags: ["backend"],
    notes: "",
  }),
];
