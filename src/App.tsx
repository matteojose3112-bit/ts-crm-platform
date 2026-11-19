import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { initialContacts, initialTasks } from "./data";
import { formatCurrency, pipelineValue, searchContacts, stages, stageCounts } from "./crm";
import type { Contact, LeadStage, NavigationSection, Task } from "./types";

const navItems: NavigationSection[] = ["Overview", "Contacts", "Pipeline", "Activities"];

function App() {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    try {
      const saved = localStorage.getItem("northstar-crm-contacts");
      return saved ? JSON.parse(saved) as Contact[] : initialContacts;
    } catch { return initialContacts; }
  });
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem("northstar-crm-tasks");
      return saved ? JSON.parse(saved) as Task[] : initialTasks;
    } catch { return initialTasks; }
  });
  const [section, setSection] = useState<NavigationSection>("Overview");
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState("");

  const counts = useMemo(() => stageCounts(contacts), [contacts]);
  const openPipeline = useMemo(() => pipelineValue(contacts), [contacts]);
  const wonValue = useMemo(() => contacts.filter((c) => c.stage === "Won").reduce((sum, c) => sum + c.value, 0), [contacts]);
  const visibleContacts = useMemo(() => searchContacts(contacts, query), [contacts, query]);

  function saveContacts(next: Contact[]) {
    setContacts(next);
    localStorage.setItem("northstar-crm-contacts", JSON.stringify(next));
  }

  function changeStage(id: string, stage: LeadStage) {
    saveContacts(contacts.map((contact) => contact.id === id ? { ...contact, stage, lastActivity: "Just now" } : contact));
    setNotice("Opportunity stage updated.");
  }

  function toggleTask(id: string) {
    const next = tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task);
    setTasks(next);
    localStorage.setItem("northstar-crm-tasks", JSON.stringify(next));
  }

  function addContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const company = String(form.get("company") || "").trim();
    const email = String(form.get("email") || "").trim();
    const value = Number(form.get("value") || 0);
    if (!name || !company || !email || !email.includes("@") || value < 0) {
      setNotice("Enter a valid name, company, email, and non-negative deal value.");
      return;
    }
    const next: Contact = {
      id: `C-${Date.now().toString().slice(-6)}`, name, company, email,
      phone: "—", source: "Manual entry", owner: "You", stage: "New",
      value, lastActivity: "Just now"
    };
    saveContacts([next, ...contacts]);
    setShowForm(false);
    setSection("Contacts");
    setQuery("");
    setNotice("New contact added to your pipeline.");
    event.currentTarget.reset();
  }

  const initials = (name: string) => name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">N</div><span>northstar<span className="brand-light">.</span></span></div>
        <div className="workspace-label">WORKSPACE</div>
        <div className="workspace-switch"><div className="workspace-avatar">A</div><div><strong>Acme Studio</strong><small>Free workspace</small></div><span className="chevron">⌄</span></div>
        <div className="nav-label">WORKSPACE</div>
        <nav aria-label="Main navigation">
          {navItems.map((item) => <button key={item} className={section === item ? "nav-item active" : "nav-item"} onClick={() => setSection(item)}>
            <span className="nav-icon">{item === "Overview" ? "◫" : item === "Contacts" ? "♙" : item === "Pipeline" ? "▥" : "◷"}</span>{item}
            {item === "Activities" && <span className="nav-count">{tasks.filter((task) => !task.completed).length}</span>}
          </button>)}
        </nav>
        <div className="sidebar-bottom"><div className="help-card"><div className="help-icon">✦</div><strong>Make every follow-up count.</strong><p>Keep your pipeline moving with a clear next step.</p><button onClick={() => setSection("Activities")}>View your tasks →</button></div><div className="profile"><div className="profile-avatar">MV</div><div><strong>Matteo Velez</strong><small>Workspace admin</small></div><span className="chevron">•••</span></div></div>
      </aside>

      <main className="main-area">
        <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> {section}</div><div className="top-actions"><span className="date-label">Tuesday, October 20</span><button className="icon-button" aria-label="Notifications">♧<i /></button><div className="top-avatar">MV</div></div></header>
        <div className="content">
          <div className="page-heading"><div><div className="eyebrow">SALES WORKSPACE</div><h1>{section === "Overview" ? "Good morning, Matteo" : section}</h1><p>{section === "Overview" ? "Here's what's happening across your sales pipeline." : section === "Contacts" ? "Manage relationships and keep every opportunity moving." : section === "Pipeline" ? "Track opportunities from first touch to close." : "Stay on top of the next action for every relationship."}</p></div><button className="primary-button" onClick={() => setShowForm(true)}><span>＋</span> Add contact</button></div>
          {notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice("")} aria-label="Dismiss">×</button></div>}

          {section === "Overview" && <>
            <section className="metric-grid">
              <Metric label="Open pipeline" value={formatCurrency(openPipeline)} change="Across active opportunities" icon="↗" tone="blue" />
              <Metric label="Won revenue" value={formatCurrency(wonValue)} change="Closed opportunities" icon="✓" tone="green" />
              <Metric label="Active contacts" value={String(contacts.length)} change="In your workspace" icon="♙" tone="violet" />
              <Metric label="Follow-ups due" value={String(tasks.filter((task) => !task.completed).length)} change="Tasks still to complete" icon="◷" tone="amber" />
            </section>
            <div className="dashboard-grid">
              <section className="panel pipeline-panel"><div className="panel-heading"><div><h2>Pipeline overview</h2><p>Opportunities by current stage</p></div><button className="text-button" onClick={() => setSection("Pipeline")}>View pipeline →</button></div>
                <div className="pipeline-total"><strong>{formatCurrency(openPipeline)}</strong><span>total open value</span></div>
                <div className="stage-bars">{stages.filter((stage) => stage !== "Lost").map((stage) => {
                  const amount = contacts.filter((c) => c.stage === stage).reduce((sum, c) => sum + c.value, 0);
                  const max = Math.max(1, ...stages.map((s) => contacts.filter((c) => c.stage === s).reduce((sum, c) => sum + c.value, 0)));
                  return <div className="stage-row" key={stage}><div className="stage-meta"><span>{stage}</span><strong>{formatCurrency(amount)}</strong></div><div className="bar-track"><div className={`bar-fill stage-${stage.toLowerCase()}`} style={{ width: `${amount / max * 100}%` }} /></div></div>;
                })}</div>
                <div className="pipeline-footer">{stages.filter((s) => s !== "Lost").map((s) => <span key={s}><i className={`dot dot-${s.toLowerCase()}`} />{counts[s]} {s}</span>)}</div>
              </section>
              <section className="panel tasks-panel"><div className="panel-heading"><div><h2>Upcoming tasks</h2><p>Your next best actions</p></div><button className="text-button" onClick={() => setSection("Activities")}>See all →</button></div>
                <TaskList tasks={tasks.slice(0, 4)} onToggle={toggleTask} />
              </section>
            </div>
            <ContactTable contacts={visibleContacts.slice(0, 5)} onStage={changeStage} onSearch={setQuery} query={query} onViewAll={() => setSection("Contacts")} />
          </>}

          {section === "Contacts" && <ContactTable contacts={visibleContacts} onStage={changeStage} onSearch={setQuery} query={query} />}
          {section === "Pipeline" && <section className="panel full-panel"><div className="panel-heading"><div><h2>Opportunity board</h2><p>Change a stage directly to keep the forecast current.</p></div><span className="total-pill">{contacts.length} records</span></div><div className="kanban">{stages.map((stage) => <div className="kanban-column" key={stage}><div className="kanban-title"><span><i className={`dot dot-${stage.toLowerCase()}`} />{stage}</span><b>{counts[stage]}</b></div>{contacts.filter((c) => c.stage === stage).map((contact) => <article className="deal-card" key={contact.id}><div className="deal-card-top"><div className="mini-avatar">{initials(contact.name)}</div><strong>{contact.name}</strong></div><p>{contact.company}</p><b>{formatCurrency(contact.value)}</b><select aria-label={`Change stage for ${contact.name}`} value={contact.stage} onChange={(e) => changeStage(contact.id, e.target.value as LeadStage)}>{stages.map((s) => <option key={s}>{s}</option>)}</select></article>)}</div>)}</div></section>}
          {section === "Activities" && <section className="panel full-panel"><div className="panel-heading"><div><h2>Follow-up queue</h2><p>Complete tasks as you work through your day.</p></div><span className="total-pill">{tasks.filter((task) => !task.completed).length} open</span></div><TaskList tasks={tasks} onToggle={toggleTask} /></section>}
        </div>
      </main>
      {showForm && <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}><form className="contact-modal" onSubmit={addContact}><div className="modal-heading"><div><div className="eyebrow">NEW RECORD</div><h2>Add a contact</h2></div><button type="button" className="close-button" onClick={() => setShowForm(false)} aria-label="Close">×</button></div><label>Full name<input name="name" placeholder="e.g. Jordan Lee" required /></label><label>Company<input name="company" placeholder="Company name" required /></label><label>Email address<input name="email" type="email" placeholder="name@company.com" required /></label><label>Estimated deal value (USD)<input name="value" type="number" min="0" step="100" defaultValue="5000" required /></label><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowForm(false)}>Cancel</button><button className="primary-button" type="submit">Save contact</button></div></form></div>}
    </div>
  );
}

function Metric({ label, value, change, icon, tone }: { label: string; value: string; change: string; icon: string; tone: string }) {
  return <article className="metric-card"><div className="metric-top"><span>{label}</span><div className={`metric-icon ${tone}`}>{icon}</div></div><strong className="metric-value">{value}</strong><span className="metric-change">{change}</span></article>;
}

function TaskList({ tasks, onToggle }: { tasks: Task[]; onToggle: (id: string) => void }) {
  return <div className="task-list">{tasks.map((task) => <div className={task.completed ? "task-item completed" : "task-item"} key={task.id}><button className="task-check" aria-label={task.completed ? "Mark task incomplete" : "Complete task"} onClick={() => onToggle(task.id)}>{task.completed ? "✓" : ""}</button><div className="task-copy"><strong>{task.title}</strong><span>{task.contactName}</span></div><time>{task.due}</time></div>)}</div>;
}

function ContactTable({ contacts, onStage, onSearch, query, onViewAll }: { contacts: Contact[]; onStage: (id: string, stage: LeadStage) => void; onSearch: (query: string) => void; query: string; onViewAll?: () => void }) {
  const initials = (name: string) => name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
  return <section className="panel contacts-panel"><div className="panel-heading"><div><h2>Recent contacts</h2><p>Latest activity across your customer base</p></div>{onViewAll && <button className="text-button" onClick={onViewAll}>View all contacts →</button>}</div><div className="table-toolbar"><label className="search-box"><span>⌕</span><input value={query} onChange={(e) => onSearch(e.target.value)} placeholder="Search contacts or companies..." /></label><span className="table-count">{contacts.length} records</span></div><div className="table-scroll"><table><thead><tr><th>CONTACT</th><th>COMPANY</th><th>STAGE</th><th>DEAL VALUE</th><th>LAST ACTIVITY</th></tr></thead><tbody>{contacts.map((contact) => <tr key={contact.id}><td><div className="contact-cell"><div className="contact-avatar">{initials(contact.name)}</div><div><strong>{contact.name}</strong><small>{contact.email}</small></div></div></td><td>{contact.company}</td><td><select className={`stage-select stage-text-${contact.stage.toLowerCase()}`} aria-label={`Stage for ${contact.name}`} value={contact.stage} onChange={(e) => onStage(contact.id, e.target.value as LeadStage)}>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></td><td className="value-cell">{formatCurrency(contact.value)}</td><td className="activity-cell">{contact.lastActivity}</td></tr>)}</tbody></table>{contacts.length === 0 && <div className="empty-state">No contacts match your search.</div>}</div></section>;
}

export default App;