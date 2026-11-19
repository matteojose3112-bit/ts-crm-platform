import type { Contact, Task } from "./types";

export const initialContacts: Contact[] = [
  { id: "C-1042", name: "Olivia Chen", company: "Brightline Studio", email: "olivia@brightline.example", phone: "+1 617 555 0142", source: "Website", owner: "You", stage: "Proposal", value: 12400, lastActivity: "Today" },
  { id: "C-1041", name: "Marcus Reed", company: "Northwind Supply", email: "marcus@northwind.example", phone: "+1 617 555 0181", source: "Referral", owner: "You", stage: "Qualified", value: 8600, lastActivity: "Today" },
  { id: "C-1040", name: "Sofia Patel", company: "Goodwell Health", email: "sofia@goodwell.example", phone: "+1 617 555 0109", source: "LinkedIn", owner: "Alex", stage: "New", value: 5200, lastActivity: "Yesterday" },
  { id: "C-1039", name: "Ethan Brooks", company: "Fieldwork Co.", email: "ethan@fieldwork.example", phone: "+1 617 555 0177", source: "Website", owner: "You", stage: "Won", value: 18900, lastActivity: "Yesterday" },
  { id: "C-1038", name: "Amara Okafor", company: "Cedar & Stone", email: "amara@cedarstone.example", phone: "+1 617 555 0133", source: "Event", owner: "Jamie", stage: "Qualified", value: 7400, lastActivity: "Oct 17" },
  { id: "C-1037", name: "Noah Williams", company: "Atlas Creative", email: "noah@atlascreative.example", phone: "+1 617 555 0118", source: "Referral", owner: "You", stage: "New", value: 3900, lastActivity: "Oct 16" },
  { id: "C-1036", name: "Isabella Garcia", company: "Mosaic Retail", email: "isabella@mosaic.example", phone: "+1 617 555 0195", source: "Website", owner: "Alex", stage: "Proposal", value: 15200, lastActivity: "Oct 15" }
];

export const initialTasks: Task[] = [
  { id: "T-201", title: "Send revised proposal", due: "Today · 2:30 PM", contactName: "Olivia Chen", completed: false },
  { id: "T-202", title: "Follow up after discovery call", due: "Today · 4:00 PM", contactName: "Marcus Reed", completed: false },
  { id: "T-203", title: "Prepare onboarding notes", due: "Tomorrow · 10:00 AM", contactName: "Ethan Brooks", completed: false },
  { id: "T-204", title: "Review inbound qualification", due: "Tomorrow · 1:00 PM", contactName: "Sofia Patel", completed: false }
];