import type { Contact, LeadStage } from "./types";

export const stages: LeadStage[] = ["New", "Qualified", "Proposal", "Won", "Lost"];

export function pipelineValue(contacts: Contact[]): number {
  return contacts
    .filter((contact) => contact.stage !== "Won" && contact.stage !== "Lost")
    .reduce((total, contact) => total + contact.value, 0);
}

export function stageCounts(contacts: Contact[]): Record<LeadStage, number> {
  return stages.reduce((counts, stage) => {
    counts[stage] = contacts.filter((contact) => contact.stage === stage).length;
    return counts;
  }, {} as Record<LeadStage, number>);
}

export function searchContacts(contacts: Contact[], query: string): Contact[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return contacts;
  return contacts.filter((contact) =>
    [contact.name, contact.company, contact.email, contact.stage]
      .some((field) => field.toLowerCase().includes(normalized))
  );
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}