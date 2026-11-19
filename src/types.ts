export type LeadStage = "New" | "Qualified" | "Proposal" | "Won" | "Lost";

export interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  owner: string;
  stage: LeadStage;
  value: number;
  lastActivity: string;
}

export interface Task {
  id: string;
  title: string;
  due: string;
  contactName: string;
  completed: boolean;
}

export type NavigationSection = "Overview" | "Contacts" | "Pipeline" | "Activities";