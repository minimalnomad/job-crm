export type Stage = "applied" | "interview" | "offer" | "rejected";

export interface Contact {
  name: string;
  email?: string;
  phone?: string;
}

export interface JobApp {
  id: string;
  title: string;
  company: string;
  stage: Stage;
  tags: string[];
  contacts: Contact[];
  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export const STAGES: { key: Stage; label: string }[] = [
  { key: "applied", label: "APPLIED" },
  { key: "interview", label: "INTERVIEW" },
  { key: "offer", label: "OFFER" },
  { key: "rejected", label: "REJECTED" },
];
export interface FilterState {
  search: string;
  stage: Stage | "all";
  tag: string | "all";
}
