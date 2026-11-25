"use client";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { PREP_SECTIONS, type Job, type Prep as PrepDoc } from "@/lib/work/types";

const DEFAULT_CHECKLIST = ["Research the company", "Read the job ad again", "Write the two-minute pitch", "Prepare five questions to ask", "Test camera, mic and the meeting link", "Send a thank-you note after"];
type Todo = { done: boolean; text: string };
const readTodos = (raw: string): Todo[] => raw.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => ({ done: /^\[x\]/i.test(l), text: l.replace(/^\[[ x]\]\s*/i, "") }));
const writeTodos = (t: Todo[]) => t.map((x) => `[${x.done ? "x" : " "}] ${x.text}`).join("\n");

const dayDiff = (d: string) => Math.round((new Date(d + "T12:00:00").getTime() - new Date(new Date().toLocaleDateString("sv-SE") + "T12:00:00").getTime()) / 864e5);
const longDate = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
const host = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };

/* Plain text with a little structure: "## heading", "- bullet", "Q: question", and links. */
const inline = (s: string): ReactNode[] => s.split(/(https?:\/\/[^\s)]+)/g).map((part, i) => (/^https?:\/\//.test(part) ? <a key={i} href={part} target="_blank" rel="noreferrer">{host(part)} ↗</a> : part));
function Rich({ text }: { text: string }) {
  const out: ReactNode[] = []; let list: string[] = [];
  const flush = () => { if (list.length) { const items = list; out.push(<ul key={out.length}>{items.map((l, i) => <li key={i}>{inline(l)}</li>)}</ul>); list = []; } };
  for (const raw of text.split("\n")) {
    const l = raw.trim();
    if (/^[-•*]\s+/.test(l)) { list.push(l.replace(/^[-•*]\s+/, "")); continue; }
    flush();
    if (!l) continue;
    if (l.startsWith("## ")) out.push(<h4 key={out.length}>{l.slice(3)}</h4>);
    else if (/^Q[:.]\s*/i.test(l)) out.push(<p key={out.length} className="p-q"><b>Q</b>{inline(l.replace(/^Q[:.]\s*/i, ""))}</p>);
    else out.push(<p key={out.length}>{inline(l)}</p>);
  }
  flush();
  return <>{out}</>;
}

export function Prep({ job, prep }: { job: Job; prep: PrepDoc | null }) {
  const [form, setForm] = useState<Record<string, string>>(() => ({ ...(prep as unknown as Record<string, string> | null) }));
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [state, setState] = useState<"" | "saving" | "saved" | "error">("");
  const [newTodo, setNewTodo] = useState("");
  const area = useRef<HTMLTextAreaElement>(null);

  const save = async (change: Record<string, string>) => {
    setForm((f) => ({ ...f, ...change })); setState("saving");
    try {
      const res = await fetch(`/api/work/prep/job/${job.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(change) });
      if (!res.ok) throw new Error();
      setState("saved");
    } catch { setState("error"); }
  };
  /* Research written through the API while the page is open shows up without a reload. */
  const refresh = async () => {
    if (editing) return;
    const res = await fetch(`/api/work/prep/job/${job.id}`).catch(() => null);
    const data = res?.ok ? await res.json() : null;
    if (data?.item) setForm(data.item);
  };
  useEffect(() => {
    const onFocus = () => { refresh(); };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  });
  useEffect(() => { if (editing && area.current) { const a = area.current; a.focus(); a.style.height = "auto"; a.style.height = `${Math.max(180, a.scrollHeight + 4)}px`; } }, [editing]);

  const todos = useMemo(() => (form.checklist ? readTodos(form.checklist) : DEFAULT_CHECKLIST.map((text) => ({ done: false, text }))), [form.checklist]);
  const setTodos = (t: Todo[]) => save({ checklist: writeTodos(t) });
  const filled = PREP_SECTIONS.filter((s) => (form[s.key] ?? "").trim()).length;
  const doneTodos = todos.filter((t) => t.done).length;
  const ready = Math.round(((filled + doneTodos) / (PREP_SECTIONS.length + Math.max(todos.length, 1))) * 100);
  const days = job.nextDate ? dayDiff(job.nextDate) : null;
  const countdown = days === null ? "No date set" : days > 1 ? `In ${days} days` : days === 1 ? "Tomorrow" : days === 0 ? "Today" : "Done";

  const open = (key: string) => { setDraft(form[key] ?? ""); setEditing(key); };
  const close = (key: string) => { if (draft !== (form[key] ?? "")) save({ [key]: draft }); setEditing(null); };

  return (
    <main className="p-app">
      <section className="p-hero">
        <div className="p-hero-top">
          <a className="p-back" href="/work">← Work</a>
          <span className="p-state" data-state={state}>{state === "saving" ? "Saving…" : state === "saved" ? "Saved" : state === "error" ? "Could not save" : "Interview prep"}</span>
        </div>
        <div className="p-hero-main">
          <div>
            <h1>{job.company}</h1>
            <p className="p-role">{job.role}</p>
            <div className="p-chips">
              {job.location && <span>{job.location}</span>}
              {job.url && <a href={job.url} target="_blank" rel="noreferrer">Job ad ↗</a>}
              {job.salary && <span>{job.salary}</span>}
            </div>
          </div>
          <div className="p-when" data-soon={days !== null && days >= 0 && days <= 1}>
            <b>{countdown}</b>
            <span>{job.nextDate ? longDate(job.nextDate) : "Add a next step date on the board"}</span>
            <input aria-label="Time and place" placeholder="Time · Teams, Meet, on site…" defaultValue={form.when ?? ""} onBlur={(e) => e.target.value !== (form.when ?? "") && save({ when: e.target.value })} />
            <input aria-label="Format" placeholder="Format · intro call, tech interview…" defaultValue={form.format ?? ""} onBlur={(e) => e.target.value !== (form.format ?? "") && save({ format: e.target.value })} />
          </div>
        </div>
        <div className="p-meter" role="progressbar" aria-valuenow={ready} aria-valuemin={0} aria-valuemax={100}><i style={{ width: `${ready}%` }} /><span>{ready}% ready · {filled} of {PREP_SECTIONS.length} sections · {doneTodos} of {todos.length} done</span></div>
      </section>

      <div className="p-body">
        <aside className="p-side">
          <nav aria-label="Sections">
            {PREP_SECTIONS.map((s, n) => <a key={s.key} href={`#${s.key}`} data-filled={!!(form[s.key] ?? "").trim()}><i>{n + 1}</i>{s.label}</a>)}
          </nav>
          <div className="p-check">
            <h3>Checklist</h3>
            {todos.map((t, i) => (
              <label key={i} data-done={t.done}>
                <input type="checkbox" checked={t.done} onChange={() => setTodos(todos.map((x, k) => (k === i ? { ...x, done: !x.done } : x)))} />
                <span>{t.text}</span>
                <button aria-label={`Remove ${t.text}`} onClick={(e) => { e.preventDefault(); setTodos(todos.filter((_, k) => k !== i)); }}>×</button>
              </label>
            ))}
            <form onSubmit={(e) => { e.preventDefault(); const text = newTodo.trim(); if (text) { setTodos([...todos, { done: false, text }]); setNewTodo(""); } }}>
              <input placeholder="Add a step" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} aria-label="Add a step" />
            </form>
          </div>
          {job.notes && <div className="p-note"><h3>From the board</h3><p>{job.nextStep}</p><p>{job.notes}</p></div>}
        </aside>

        <div className="p-sections">
          {PREP_SECTIONS.map((s, n) => {
            const value = form[s.key] ?? "", isOpen = editing === s.key;
            return (
              <article key={s.key} id={s.key} className="p-card" data-filled={!!value.trim()} data-open={isOpen}>
                <header>
                  <i>{n + 1}</i>
                  <div><h2>{s.label}</h2><p>{s.hint}</p></div>
                  {isOpen ? <button className="w-mini" onClick={() => close(s.key)}>Done</button> : <button className="w-mini p-edit" onClick={() => open(s.key)}>{value.trim() ? "Edit" : "Write"}</button>}
                </header>
                {isOpen
                  ? <textarea ref={area} value={draft} onChange={(e) => { setDraft(e.target.value); e.target.style.height = "auto"; e.target.style.height = `${Math.max(180, e.target.scrollHeight + 4)}px`; }} onBlur={() => close(s.key)} placeholder={`${s.hint}\n\n## Heading\n- bullet\nQ: a question`} />
                  : value.trim() ? <div className="p-text" onDoubleClick={() => open(s.key)}><Rich text={value} /></div> : <button className="p-empty" onClick={() => open(s.key)}>Nothing here yet. Click to write.</button>}
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
