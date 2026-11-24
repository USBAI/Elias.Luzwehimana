export const STATUSES = ["saved", "applied", "interview", "offer", "rejected"] as const;
export type Status = (typeof STATUSES)[number];
export const STATUS_LABEL: Record<Status, string> = { saved: "To apply", applied: "Applied", interview: "Interview", offer: "Offer", rejected: "Closed" };

export type Job = {
  id: string;
  company: string;
  role: string;
  url: string;
  location: string;
  source: string;
  salary: string;
  status: Status;
  appliedAt: string;   // yyyy-mm-dd, or ""
  nextStep: string;
  nextDate: string;    // yyyy-mm-dd, or ""
  notes: string;
  createdAt: string;
  updatedAt: string;
};
export type JobInput = Omit<Job, "id" | "createdAt" | "updatedAt">;

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const date = (v: unknown) => (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "");

/* Only known fields, trimmed and length-limited, ever reach the database. */
export function cleanJob(body: Record<string, unknown>, partial = false): Partial<JobInput> {
  const out: Partial<JobInput> = {};
  const has = (k: string) => !partial || k in body;
  if (has("company")) out.company = text(body.company, 120);
  if (has("role")) out.role = text(body.role, 160);
  if (has("url")) { const u = text(body.url, 600); out.url = /^https?:\/\//i.test(u) ? u : u ? `https://${u}` : ""; }
  if (has("location")) out.location = text(body.location, 120);
  if (has("source")) out.source = text(body.source, 80);
  if (has("salary")) out.salary = text(body.salary, 80);
  if (has("status")) out.status = (STATUSES as readonly string[]).includes(body.status as string) ? (body.status as Status) : "saved";
  if (has("appliedAt")) out.appliedAt = date(body.appliedAt);
  if (has("nextStep")) out.nextStep = text(body.nextStep, 200);
  if (has("nextDate")) out.nextDate = date(body.nextDate);
  if (has("notes")) out.notes = text(body.notes, 6000);
  return out;
}
