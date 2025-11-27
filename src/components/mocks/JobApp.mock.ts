import type { JobApp } from "../../domain/types";

export const createMockJob = (overrides: Partial<JobApp> = {}): JobApp => ({
  id: "job-1",
  title: "Frontend Engineer",
  company: "Google",
  stage: "applied",
  tags: ["remote", "frontend"],
  contacts: [],
  createdAt: "2025-07-01",
  updatedAt: "2024-08-01",
  ...overrides,
});
