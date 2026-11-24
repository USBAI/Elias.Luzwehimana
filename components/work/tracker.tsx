"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { STATUSES, STATUS_LABEL, type Job, type JobInput, type Status } from "@/lib/work/types";

const today = () => new Date().toLocaleDateString("sv-SE"); // yyyy-mm-dd, local time
const EMPTY: JobInput = { company: "", role: "", url: "", location: "", source: "", salary: "", status: "saved", appliedAt: "", nextStep: "", nextDate: "", notes: "" };
const nice = (d: string) => (d ? new Date(d + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "");
const host = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return "link"; } };

async function api<T>(url: string, method: string, body?: unknown): Promise<T> {
  const res = await fetch(url, { method, headers: body ? { "Content-Type": "application/json" } : undefined, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
  return data as T;
}

export function Tracker({ initial, loadError }: { initial: Job[]; loadError: string }) {
  const router = useRouter();
  const [jobs, setJobs] = useState(initial);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Status>("saved");
  const [editing, setEditing] = useState<Job | "new" | null>(null);
  const [error, setError] = useState(loadError);
  const [over, setOver] = useState<Status | null>(null);
  const dragId = useRef<string | null>(null);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? jobs.filter((j) => [j.company, j.role, j.location, j.source, j.notes, j.nextStep].join(" ").toLowerCase().includes(q)) : jobs;
  }, [jobs, query]);
  const byStatus = (s: Status) => shown.filter((j) => j.status === s).sort((a, b) => (a.nextDate || "9999").localeCompare(b.nextDate || "9999") || b.updatedAt.localeCompare(a.updatedAt));
  const count = (s: Status) => jobs.filter((j) => j.status === s).length;
  const due = jobs.filter((j) => j.nextDate && j.nextDate <= today() && j.status !== "rejected").length;

  /* Change first, save after: the board answers at once and rolls back if saving fails. */
  const patch = async (job: Job, change: Partial<JobInput>) => {
    const before = jobs;
    setJobs((all) => all.map((j) => (j.id === job.id ? { ...j, ...change } : j)));
    try {
      const { job: saved } = await api<{ job: Job }>(`/api/work/jobs/${job.id}`, "PATCH", change);
      setJobs((all) => all.map((j) => (j.id === saved.id ? saved : j)));
      setError("");
    } catch (e) { setJobs(before); setError((e as Error).message); }
  };
  const move = (job: Job, status: Status) => {
    if (job.status === status) return;
    patch(job, { status, ...(status === "applied" && !job.appliedAt ? { appliedAt: today() } : {}) });
  };
  const save = async (input: JobInput, id?: string) => {
    if (id) { const { job } = await api<{ job: Job }>(`/api/work/jobs/${id}`, "PATCH", input); setJobs((all) => all.map((j) => (j.id === id ? job : j))); }
    else { const { job } = await api<{ job: Job }>("/api/work/jobs", "POST", input); setJobs((all) => [job, ...all]); setTab(job.status); }
    setEditing(null); setError("");
  };
  const remove = async (id: string) => {
    await api(`/api/work/jobs/${id}`, "DELETE");
    setJobs((all) => all.filter((j) => j.id !== id)); setEditing(null);
  };
  const signOut = async () => { await fetch("/api/work/login", { method: "DELETE" }); router.refresh(); };

  return (
    <main className="w-app">
      <header className="w-top">
        <div>
          <a className="w-kicker" href="/">← Portfolio</a>
          <h1>Work</h1>
          <p className="w-sub">{jobs.length === 0 ? "No roles yet. Add the first one you find interesting." : `${jobs.length} role${jobs.length === 1 ? "" : "s"} · ${count("applied") + count("interview") + count("offer")} in progress${due ? ` · ${due} to follow up` : ""}`}</p>
        </div>
        <div className="w-tools">
          <input className="w-search" type="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search roles" />
          <button className="w-btn w-btn-dark" onClick={() => setEditing("new")}>+ Add role</button>
          <button className="w-btn w-btn-ghost" onClick={signOut}>Sign out</button>
        </div>
      </header>

      {error && <p className="w-error" role="alert">{error}</p>}

      <nav className="w-tabs" aria-label="Status">
        {STATUSES.map((s) => (
          <button key={s} data-active={tab === s} data-status={s} onClick={() => setTab(s)}>{STATUS_LABEL[s]}<b>{count(s)}</b></button>
        ))}
      </nav>

      <section className="w-board">
        {STATUSES.map((s) => {
          const list = byStatus(s);
          return (
            <div key={s} className="w-col" data-status={s} data-active={tab === s} data-over={over === s}
              onDragOver={(e) => { e.preventDefault(); setOver(s); }}
              onDragLeave={() => setOver((o) => (o === s ? null : o))}
              onDrop={() => { const job = jobs.find((j) => j.id === dragId.current); setOver(null); if (job) move(job, s); }}>
              <h2><i />{STATUS_LABEL[s]}<b>{list.length}</b></h2>
              {list.length === 0 && <p className="w-empty">{s === "saved" ? "Roles you want to apply for land here." : "Nothing here yet."}</p>}
              {list.map((j) => {
                const late = !!j.nextDate && j.nextDate <= today() && s !== "rejected";
                return (
                  <article key={j.id} className="w-card" draggable onDragStart={() => { dragId.current = j.id; }}>
                    <button className="w-card-main" onClick={() => setEditing(j)}>
                      <span className="w-company">{j.company}</span>
                      <span className="w-role">{j.role}</span>
                      {(j.location || j.source) && <span className="w-meta">{[j.location, j.source].filter(Boolean).join(" · ")}</span>}
                      {(j.nextStep || j.nextDate) && <span className="w-next" data-late={late}>{j.nextDate && <b>{nice(j.nextDate)}</b>}{j.nextStep || "Follow up"}</span>}
                      {j.appliedAt && <span className="w-meta">Applied {nice(j.appliedAt)}</span>}
                    </button>
                    <div className="w-card-foot">
                      {j.url ? <a href={j.url} target="_blank" rel="noreferrer">{host(j.url)} ↗</a> : <span />}
                      {s === "saved"
                        ? <button className="w-mini" onClick={() => move(j, "applied")}>Mark applied</button>
                        : <select aria-label={`Status for ${j.company}`} value={j.status} onChange={(e) => move(j, e.target.value as Status)}>{STATUSES.map((x) => <option key={x} value={x}>{STATUS_LABEL[x]}</option>)}</select>}
                    </div>
                  </article>
                );
              })}
            </div>
          );
        })}
      </section>

      {editing && <Editor job={editing === "new" ? null : editing} onClose={() => setEditing(null)} onSave={save} onRemove={remove} />}
    </main>
  );
}

function Editor({ job, onClose, onSave, onRemove }: { job: Job | null; onClose: () => void; onSave: (input: JobInput, id?: string) => Promise<void>; onRemove: (id: string) => Promise<void> }) {
  const [form, setForm] = useState<JobInput>(() => (job ? { ...EMPTY, ...Object.fromEntries(Object.keys(EMPTY).map((k) => [k, job[k as keyof JobInput]])) } as JobInput : EMPTY));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  const set = (k: keyof JobInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const run = async (fn: () => Promise<void>) => { setBusy(true); setError(""); try { await fn(); } catch (e) { setError((e as Error).message); setBusy(false); } };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    run(() => onSave({ ...form, appliedAt: form.status !== "saved" && !form.appliedAt ? today() : form.appliedAt }, job?.id));
  };

  return (
    <div className="w-sheet" role="dialog" aria-modal="true" aria-label={job ? "Edit role" : "Add role"}>
      <button className="w-scrim" aria-label="Close" onClick={onClose} />
      <form className="w-form" onSubmit={submit}>
        <header><h2>{job ? "Edit role" : "Add a role"}</h2><button type="button" className="w-x" onClick={onClose} aria-label="Close">×</button></header>
        <div className="w-fields">
          <label>Company<input value={form.company} onChange={set("company")} required autoFocus={!job} maxLength={120} /></label>
          <label>Role<input value={form.role} onChange={set("role")} required maxLength={160} placeholder="Senior Engineer" /></label>
          <label className="w-wide">Link to the posting<input value={form.url} onChange={set("url")} inputMode="url" placeholder="https://" /></label>
          <label>Location<input value={form.location} onChange={set("location")} placeholder="Stockholm · Hybrid" /></label>
          <label>Found via<input value={form.source} onChange={set("source")} placeholder="LinkedIn, referral…" /></label>
          <label>Status<select value={form.status} onChange={set("status")}>{STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}</select></label>
          <label>Applied on<input type="date" value={form.appliedAt} onChange={set("appliedAt")} /></label>
          <label>Next step<input value={form.nextStep} onChange={set("nextStep")} placeholder="Follow up with recruiter" /></label>
          <label>Next step date<input type="date" value={form.nextDate} onChange={set("nextDate")} /></label>
          <label className="w-wide">Salary / terms<input value={form.salary} onChange={set("salary")} /></label>
          <label className="w-wide">Notes<textarea value={form.notes} onChange={set("notes")} rows={5} placeholder="Why it is interesting, contacts, what was said in interviews…" /></label>
        </div>
        {error && <p className="w-error" role="alert">{error}</p>}
        <footer>
          {job && (confirm
            ? <button type="button" className="w-btn w-btn-danger" disabled={busy} onClick={() => run(() => onRemove(job.id))}>Yes, delete it</button>
            : <button type="button" className="w-btn w-btn-ghost" onClick={() => setConfirm(true)}>Delete</button>)}
          <span />
          <button type="button" className="w-btn w-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="w-btn w-btn-dark" disabled={busy}>{busy ? "Saving…" : job ? "Save" : "Add role"}</button>
        </footer>
      </form>
    </div>
  );
}
