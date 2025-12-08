import type { JobApp } from "../domain/types";
import { newId } from "../utils/id";

const now = new Date().toISOString();

export const initialMockApps: JobApp[] = [
  {
    id: newId(),
    title: "Software Engineer",
    company: "LuminaTech",
    stage: "applied",
    tags: ["remote", "full-time"],
    contacts: [{ name: "Alex Chen", email: "alex.c@lumina.com" }],
    notes: "Applied via LinkedIn.",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: newId(),
    title: "Product Manager",
    company: "Veridian",
    stage: "interview",
    tags: ["urgent", "on-site"],
    contacts: [],
    notes: "Needs immediate prep.",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: newId(),
    title: "Product Manager",
    company: "NovaMetric",
    stage: "interview",
    tags: ["marketing"],
    contacts: [],
    notes: "Waiting for feedback.",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: newId(),
    title: "Unreal Developer",
    company: "Aether Game",
    stage: "rejected",
    tags: ["gaming"],
    contacts: [],
    notes: "Received polite rejection.",
    createdAt: now,
    updatedAt: now,
  },
];
