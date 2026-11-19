import { describe, expect, it } from "vitest";
import { formatCurrency, pipelineValue, searchContacts, stageCounts } from "../src/crm";
import { initialContacts } from "../src/data";

describe("CRM helpers", () => {
  it("calculates open pipeline value without won or lost deals", () => {
    expect(pipelineValue(initialContacts)).toBe(42700);
  });

  it("counts contacts by stage", () => {
    expect(stageCounts(initialContacts)).toEqual({
      New: 2, Qualified: 2, Proposal: 2, Won: 1, Lost: 0
    });
  });

  it("searches across contact name, company, email, and stage", () => {
    expect(searchContacts(initialContacts, "brightline")).toHaveLength(1);
    expect(searchContacts(initialContacts, "QUALIFIED")).toHaveLength(2);
    expect(searchContacts(initialContacts, "   ")).toHaveLength(initialContacts.length);
  });

  it("formats currency consistently", () => {
    expect(formatCurrency(12400)).toBe("$12,400");
  });
});