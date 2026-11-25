"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CHANNELS, CONTACT_LABEL, CONTACT_STATUSES, PLATFORM_LABEL, PLATFORM_STATUSES, STATUSES, STATUS_LABEL,
  type Col, type Contact, type Job, type Platform,
} from "@/lib/work/types";

type Item = { id: string; updatedAt: string; status: string; nextDate?: string } & Record<string, string>;
type Field = { key: string; label: string; type?: "text" | "date" | "select" | "area"; options?: [string, string][]; wide?: boolean; required?: boolean; placeholder?: string };

const today = () => new Date().toLocaleDateString("sv-SE"); // yyyy-mm-dd, local time
const nice = (d: string) => (d ? new Date(d + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "");
const host = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };
const href = (u: string) => (u.includes("@") && !u.startsWith("http") ? `mailto:${u}` : u);
const pairs = <T extends string>(list: readonly T[], labels: Record<T, string>) => list.map((s) => [s, labels[s]] as [string, string]);

async function api<T>(url: string, method: string, body?: unknown): Promise<T> {
  const res = await fetch(url, { method, headers: body ? { "Content-Type": "application/json" } : undefined, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
  return data as T;
}

const JOB_FIELDS: Field[] = [
  { key: "company", label: "Company", required: true },
  { key: "role", label: "Role", required: true, placeholder: "Senior Engineer" },
  { key: "url", label: "Link to the posting", wide: true, placeholder: "https://" },
  { key: "location", label: "Location", placeholder: "Stockholm · Hybrid" },
  { key: "source", label: "Found via", placeholder: "The Hub, LinkedIn, referral…" },
  { key: "status", label: "Status", type: "select", options: pairs(STATUSES, STATUS_LABEL) },
  { key: "appliedAt", label: "Applied on", type: "date" },
  { key: "nextStep", label: "Next step", placeholder: "Follow up with recruiter" },
  { key: "nextDate", label: "Next step date", type: "date" },
  { key: "salary", label: "Salary / terms", wide: true },
  { key: "notes", label: "Notes", type: "area", wide: true, placeholder: "Why it is interesting, what was said in interviews…" },
];
const CONTACT_FIELDS: Field[] = [
  { key: "name", label: "Name", required: true },
  { key: "company", label: "Company" },
  { key: "title", label: "Their role", placeholder: "CTO, recruiter, founder…" },
  { key: "channel", label: "Channel", type: "select", options: CHANNELS.map((c) => [c, c]) },
  { key: "handle", label: "LinkedIn profile or email", wide: true, placeholder: "https://linkedin.com/in/… or name@company.com" },
  { key: "about", label: "About which role", wide: true, placeholder: "Founding Engineer at …" },
  { key: "status", label: "Status", type: "select", options: pairs(CONTACT_STATUSES, CONTACT_LABEL) },
  { key: "sentAt", label: "Message sent on", type: "date" },
  { key: "nextStep", label: "Next step", placeholder: "Follow up if no reply" },
  { key: "nextDate", label: "Next step date", type: "date" },
  { key: "notes", label: "Notes", type: "area", wide: true, placeholder: "What you wrote, what they answered…" },
];
const PLATFORM_FIELDS: Field[] = [
  { key: "name", label: "Platform", required: true },
  { key: "focus", label: "Good for", placeholder: "Nordic startups" },
  { key: "url", label: "Link", wide: true, placeholder: "https://" },
  { key: "status", label: "Status", type: "select", options: pairs(PLATFORM_STATUSES, PLATFORM_LABEL), wide: true },
  { key: "why", label: "Why use it", type: "area", wide: true },
  { key: "notes", label: "Notes", type: "area", wide: true, placeholder: "Username, saved searches, alerts set up…" },
];

type View = "jobs" | "contacts" | "platforms";
const VIEWS: Record<View, { label: string; add: string; noun: string; fields: Field[]; statuses: [string, string][]; first: string; doneKey?: string; quick?: [string, string] }> = {
  jobs: { label: "Roles", add: "+ Add role", noun: "role", fields: JOB_FIELDS, statuses: pairs(STATUSES, STATUS_LABEL), first: "saved", doneKey: "appliedAt", quick: ["applied", "Mark applied"] },
  contacts: { label: "People", add: "+ Add person", noun: "person", fields: CONTACT_FIELDS, statuses: pairs(CONTACT_STATUSES, CONTACT_LABEL), first: "todo", doneKey: "sentAt", quick: ["sent", "Mark sent"] },
  platforms: { label: "Platforms", add: "+ Add platform", noun: "platform", fields: PLATFORM_FIELDS, statuses: pairs(PLATFORM_STATUSES, PLATFORM_LABEL), first: "todo" },
};

export function Tracker(props: { jobs: Job[]; contacts: Contact[]; platforms: Platform[]; loadError: string }) {
  const router = useRouter();
  const [data, setData] = useState<Record<View, Item[]>>({ jobs: props.jobs as unknown as Item[], contacts: props.contacts as unknown as Item[], platforms: props.platforms as unknown as Item[] });
  const [view, setView] = useState<View>("jobs");
  const [tab, setTab] = useState<Record<View, string>>({ jobs: "saved", contacts: "todo", platforms: "todo" });
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Item | "new" | null>(null);
  const [error, setError] = useState(props.loadError);
  const [over, setOver] = useState<string | null>(null);
  const dragId = useRef<string | null>(null);

  const cfg = VIEWS[view], items = data[view];
  const setItems = (col: View, fn: (all: Item[]) => Item[]) => setData((d) => ({ ...d, [col]: fn(d[col]) }));
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((j) => Object.values(j).join(" ").toLowerCase().includes(q)) : items;
  }, [items, query]);
  const inStatus = (s: string) => shown.filter((j) => j.status === s).sort((a, b) => (a.nextDate || "9999").localeCompare(b.nextDate || "9999") || b.updatedAt.localeCompare(a.updatedAt));
  const count = (col: View, s: string) => data[col].filter((j) => j.status === s).length;
  const isDue = (j: Item, closed: string) => !!j.nextDate && j.nextDate <= today() && j.status !== closed;
  const due = data.jobs.filter((j) => isDue(j, "rejected")).length + data.contacts.filter((j) => isDue(j, "closed")).length;

  /* Change first, save after: the board answers at once and rolls back if saving fails. */
  const patch = async (col: View, item: Item, change: Record<string, string>) => {
    const before = data[col];
    setItems(col, (all) => all.map((j) => (j.id === item.id ? { ...j, ...change } : j)));
    try {
      const { item: saved } = await api<{ item: Item }>(`/api/work/${col}/${item.id}`, "PATCH", change);
      setItems(col, (all) => all.map((j) => (j.id === saved.id ? saved : j)));
      setError("");
    } catch (e) { setData((d) => ({ ...d, [col]: before })); setError((e as Error).message); }
  };
  const move = (item: Item, status: string) => {
    if (item.status === status) return;
    const k = cfg.doneKey;
    patch(view, item, { status, ...(k && status !== cfg.first && !item[k] ? { [k]: today() } : {}) });
  };
  const save = async (input: Record<string, string>, id?: string) => {
    const k = cfg.doneKey;
    if (k && input.status !== cfg.first && !input[k]) input[k] = today();
    if (id) { const { item } = await api<{ item: Item }>(`/api/work/${view}/${id}`, "PATCH", input); setItems(view, (all) => all.map((j) => (j.id === id ? item : j))); }
    else { const { item } = await api<{ item: Item }>(`/api/work/${view}`, "POST", input); setItems(view, (all) => [item, ...all]); setTab((t) => ({ ...t, [view]: item.status })); }
    setEditing(null); setError("");
  };
  const remove = async (id: string) => { await api(`/api/work/${view}/${id}`, "DELETE"); setItems(view, (all) => all.filter((j) => j.id !== id)); setEditing(null); };
  const signOut = async () => { await fetch("/api/work/login", { method: "DELETE" }); router.refresh(); };

  const active = count("jobs", "applied") + count("jobs", "interview") + count("jobs", "offer");
  const summary = [`${data.jobs.length} role${data.jobs.length === 1 ? "" : "s"}`, `${active} in progress`, `${data.contacts.length} ${data.contacts.length === 1 ? "person" : "people"} contacted`, due ? `${due} to follow up` : ""].filter(Boolean).join(" · ");

  return (
    <main className="w-app">
      <header className="w-top">
        <div>
          <a className="w-kicker" href="/">← Portfolio</a>
          <h1>Work</h1>
          <p className="w-sub">{summary}</p>
        </div>
        <div className="w-tools">
          <input className="w-search" type="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search" />
          <button className="w-btn w-btn-dark" onClick={() => setEditing("new")}>{cfg.add}</button>
          <button className="w-btn w-btn-ghost" onClick={signOut}>Sign out</button>
        </div>
      </header>

      <nav className="w-views" aria-label="Sections">
        {(Object.keys(VIEWS) as View[]).map((v) => (
          <button key={v} data-active={view === v} onClick={() => { setView(v); setQuery(""); }}>{VIEWS[v].label}<b>{data[v].length}</b></button>
        ))}
      </nav>

      {error && <p className="w-error" role="alert">{error}</p>}

      {view === "platforms" ? (
        <section className="w-grid">
          {shown.length === 0 && <p className="w-empty">No platforms match.</p>}
          {[...shown].sort((a, b) => a.createdAt.localeCompare(b.createdAt) * -1).map((p) => (
            <article key={p.id} className="w-plat" data-status={p.status}>
              <button className="w-card-main" onClick={() => setEditing(p)}>
                {p.focus && <span className="w-meta">{p.focus}</span>}
                <span className="w-company">{p.name}</span>
                <span className="w-why">{p.why}</span>
                {p.notes && <span className="w-next">{p.notes}</span>}
              </button>
              <div className="w-card-foot">
                {p.url ? <a href={p.url} target="_blank" rel="noreferrer">Open {host(p.url)} ↗</a> : <span />}
                <select aria-label={`Status for ${p.name}`} value={p.status} data-status={p.status} onChange={(e) => patch("platforms", p, { status: e.target.value })}>{cfg.statuses.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <>
          <nav className="w-tabs" aria-label="Status">
            {cfg.statuses.map(([s, label]) => <button key={s} data-active={tab[view] === s} onClick={() => setTab((t) => ({ ...t, [view]: s }))}>{label}<b>{count(view, s)}</b></button>)}
          </nav>
          <section className="w-board" data-view={view}>
            {cfg.statuses.map(([s, label], n) => {
              const list = inStatus(s), closed = cfg.statuses[cfg.statuses.length - 1][0];
              return (
                <div key={s} className="w-col" data-n={n} data-active={tab[view] === s} data-over={over === s}
                  onDragOver={(e) => { e.preventDefault(); setOver(s); }}
                  onDragLeave={() => setOver((o) => (o === s ? null : o))}
                  onDrop={() => { const item = items.find((j) => j.id === dragId.current); setOver(null); if (item) move(item, s); }}>
                  <h2><i />{label}<b>{list.length}</b></h2>
                  {list.length === 0 && <p className="w-empty">{n === 0 ? (view === "jobs" ? "Roles you want to apply for land here." : "People you plan to message land here.") : "Nothing here yet."}</p>}
                  {list.map((j) => {
                    const link = view === "jobs" ? j.url : j.handle;
                    return (
                      <article key={j.id} className="w-card" data-closed={s === closed} draggable onDragStart={() => { dragId.current = j.id; }}>
                        <Main prep={view === "jobs" && s === "interview" ? `/work/interview/${j.id}` : ""} onEdit={() => setEditing(j)}>
                          {view === "jobs" ? (
                            <><span className="w-company">{j.company}</span><span className="w-role">{j.role}</span>
                              {(j.location || j.source) && <span className="w-meta">{[j.location, j.source].filter(Boolean).join(" · ")}</span>}</>
                          ) : (
                            <><span className="w-company">{j.name}</span><span className="w-role">{[j.title, j.company].filter(Boolean).join(" · ")}</span>
                              <span className="w-meta">{[j.channel, j.about].filter(Boolean).join(" · ")}</span></>
                          )}
                          {(j.nextStep || j.nextDate) && <span className="w-next" data-late={isDue(j, closed)}>{j.nextDate && <b>{nice(j.nextDate)}</b>}{j.nextStep || "Follow up"}</span>}
                          {cfg.doneKey && j[cfg.doneKey] && <span className="w-meta">{view === "jobs" ? "Applied" : "Sent"} {nice(j[cfg.doneKey])}</span>}
                          {view === "jobs" && s === "interview" && <span className="w-prep">Prepare →</span>}
                        </Main>
                        <div className="w-card-foot">
                          {link ? <a href={href(link)} target="_blank" rel="noreferrer">{link.includes("@") && !link.startsWith("http") ? link : `${host(link)} ↗`}</a> : <span />}
                          {n === 0 && cfg.quick
                            ? <button className="w-mini" onClick={() => move(j, cfg.quick![0])}>{cfg.quick[1]}</button>
                            : <span className="w-right">{view === "jobs" && s === "interview" && <button className="w-mini w-mini-ghost" onClick={() => setEditing(j)}>Edit</button>}<select aria-label="Status" value={j.status} onChange={(e) => move(j, e.target.value)}>{cfg.statuses.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></span>}
                        </div>
                      </article>
                    );
                  })}
                </div>
              );
            })}
          </section>
        </>
      )}

      {editing && <Editor key={view} noun={cfg.noun} fields={cfg.fields} item={editing === "new" ? null : editing} onClose={() => setEditing(null)} onSave={save} onRemove={remove} />}
    </main>
  );
}

/* A card opens the editor, except interviews: those open the prep page for that role. */
function Main({ prep, onEdit, children }: { prep: string; onEdit: () => void; children: React.ReactNode }) {
  return prep ? <a className="w-card-main" href={prep}>{children}</a> : <button className="w-card-main" onClick={onEdit}>{children}</button>;
}

function Editor({ noun, fields, item, onClose, onSave, onRemove }: { noun: string; fields: Field[]; item: Item | null; onClose: () => void; onSave: (input: Record<string, string>, id?: string) => Promise<void>; onRemove: (id: string) => Promise<void> }) {
  const [form, setForm] = useState<Record<string, string>>(() => Object.fromEntries(fields.map((f) => [f.key, item?.[f.key] ?? (f.type === "select" ? f.options![0][0] : "")])));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const run = async (fn: () => Promise<void>) => { setBusy(true); setError(""); try { await fn(); } catch (e) { setError((e as Error).message); setBusy(false); } };

  return (
    <div className="w-sheet" role="dialog" aria-modal="true" aria-label={item ? `Edit ${noun}` : `Add ${noun}`}>
      <button className="w-scrim" aria-label="Close" onClick={onClose} />
      <form className="w-form" onSubmit={(e) => { e.preventDefault(); run(() => onSave({ ...form }, item?.id)); }}>
        <header><h2>{item ? `Edit ${noun}` : `Add a ${noun}`}</h2><button type="button" className="w-x" onClick={onClose} aria-label="Close">×</button></header>
        <div className="w-fields">
          {fields.map((f, n) => (
            <label key={f.key} className={f.wide ? "w-wide" : undefined}>{f.label}
              {f.type === "select" ? <select value={form[f.key]} onChange={set(f.key)}>{f.options!.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
                : f.type === "area" ? <textarea value={form[f.key]} onChange={set(f.key)} rows={4} placeholder={f.placeholder} />
                : <input type={f.type === "date" ? "date" : "text"} value={form[f.key]} onChange={set(f.key)} required={f.required} placeholder={f.placeholder} autoFocus={!item && n === 0} />}
            </label>
          ))}
        </div>
        {error && <p className="w-error" role="alert">{error}</p>}
        <footer>
          {item && (confirm
            ? <button type="button" className="w-btn w-btn-danger" disabled={busy} onClick={() => run(() => onRemove(item.id))}>Yes, delete it</button>
            : <button type="button" className="w-btn w-btn-ghost" onClick={() => setConfirm(true)}>Delete</button>)}
          <span />
          <button type="button" className="w-btn w-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="w-btn w-btn-dark" disabled={busy}>{busy ? "Saving…" : item ? "Save" : `Add ${noun}`}</button>
        </footer>
      </form>
    </div>
  );
}
