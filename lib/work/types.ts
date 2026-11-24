/* Three collections: roles to apply for, people contacted, and the platforms used to find roles. */
export const COLLECTIONS = ["jobs", "contacts", "platforms"] as const;
export type Col = (typeof COLLECTIONS)[number];
export const isCol = (v: string): v is Col => (COLLECTIONS as readonly string[]).includes(v);

type Base = { id: string; createdAt: string; updatedAt: string };

export const STATUSES = ["saved", "applied", "interview", "offer", "rejected"] as const;
export type Status = (typeof STATUSES)[number];
export const STATUS_LABEL: Record<Status, string> = { saved: "To apply", applied: "Applied", interview: "Interview", offer: "Offer", rejected: "Closed" };
export type JobInput = { company: string; role: string; url: string; location: string; source: string; salary: string; status: Status; appliedAt: string; nextStep: string; nextDate: string; notes: string };
export type Job = Base & JobInput;

export const CONTACT_STATUSES = ["todo", "sent", "replied", "call", "closed"] as const;
export type ContactStatus = (typeof CONTACT_STATUSES)[number];
export const CONTACT_LABEL: Record<ContactStatus, string> = { todo: "To contact", sent: "Sent", replied: "Replied", call: "Call booked", closed: "Closed" };
export const CHANNELS = ["LinkedIn", "Email", "Other"] as const;
export type ContactInput = { name: string; company: string; title: string; channel: string; handle: string; about: string; status: ContactStatus; sentAt: string; nextStep: string; nextDate: string; notes: string };
export type Contact = Base & ContactInput;

export const PLATFORM_STATUSES = ["todo", "account", "ready", "active"] as const;
export type PlatformStatus = (typeof PLATFORM_STATUSES)[number];
export const PLATFORM_LABEL: Record<PlatformStatus, string> = { todo: "No account yet", account: "Account created", ready: "Profile complete", active: "Checking weekly" };
export type PlatformInput = { name: string; url: string; focus: string; why: string; status: PlatformStatus; notes: string };
export type Platform = Base & PlatformInput;

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const date = (v: unknown) => (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "");
const link = (v: unknown) => { const u = text(v, 600); return !u || /^https?:\/\//i.test(u) || u.includes("@") ? u : `https://${u}`; };
const oneOf = <T extends string>(list: readonly T[], v: unknown, fallback: T) => (list.includes(v as T) ? (v as T) : fallback);

type Field = (v: unknown) => string;
const SHAPES: Record<Col, { fields: Record<string, Field>; required: string[] }> = {
  jobs: {
    required: ["company", "role"],
    fields: {
      company: (v) => text(v, 120), role: (v) => text(v, 160), url: link, location: (v) => text(v, 120), source: (v) => text(v, 80), salary: (v) => text(v, 80),
      status: (v) => oneOf(STATUSES, v, "saved"), appliedAt: date, nextStep: (v) => text(v, 200), nextDate: date, notes: (v) => text(v, 6000),
    },
  },
  contacts: {
    required: ["name"],
    fields: {
      name: (v) => text(v, 120), company: (v) => text(v, 120), title: (v) => text(v, 160), channel: (v) => oneOf(CHANNELS, v, "LinkedIn"), handle: link, about: (v) => text(v, 200),
      status: (v) => oneOf(CONTACT_STATUSES, v, "todo"), sentAt: date, nextStep: (v) => text(v, 200), nextDate: date, notes: (v) => text(v, 6000),
    },
  },
  platforms: {
    required: ["name"],
    fields: {
      name: (v) => text(v, 120), url: link, focus: (v) => text(v, 120), why: (v) => text(v, 400), status: (v) => oneOf(PLATFORM_STATUSES, v, "todo"), notes: (v) => text(v, 3000),
    },
  },
};

/* Only known fields, trimmed and length-limited, ever reach the database. */
export function clean(col: Col, body: unknown, partial = false): { data: Record<string, string>; error?: string } {
  const src = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const { fields, required } = SHAPES[col];
  const data: Record<string, string> = {};
  for (const [key, fn] of Object.entries(fields)) if (!partial || key in src) data[key] = fn(src[key]);
  const missing = required.find((k) => (!partial || k in data) && !data[k]);
  return missing ? { data, error: `"${missing}" is required.` } : { data };
}

/* The starting list of places to look for roles. Added once, when the list is empty. */
export const DEFAULT_PLATFORMS: PlatformInput[] = [
  { name: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs/", focus: "Everything · recruiters", why: "Where recruiters search and message. Set job alerts for Founding, Lead and Senior Engineer in Stockholm and remote, and turn on Open to work.", status: "ready", notes: "" },
  { name: "The Hub", url: "https://thehub.io/jobs/location/sweden/stockholm", focus: "Nordic startups", why: "The Nordic startup board. Stockholm AI companies post here, including founding and product engineer roles.", status: "todo", notes: "" },
  { name: "Wellfound", url: "https://wellfound.com/location/sweden", focus: "Startups · equity shown", why: "The largest startup job board, with salary and equity listed. Use it for Sweden and for remote roles.", status: "todo", notes: "" },
  { name: "Y Combinator · Work at a Startup", url: "https://www.workatastartup.com/", focus: "YC startups · remote", why: "One profile reaches every YC company that is hiring. Many founding engineer roles, a good share of them remote.", status: "todo", notes: "" },
  { name: "Demando", url: "https://demando.se/", focus: "Sweden · companies apply to you", why: "Swedish tech marketplace where companies contact you with the salary up front. Low effort once the profile is done.", status: "todo", notes: "" },
  { name: "ai-jobs.net", url: "https://ai-jobs.net/", focus: "AI roles only", why: "A board only for AI and ML roles. Good for finding AI companies you have not heard of.", status: "todo", notes: "" },
  { name: "Company career pages", url: "", focus: "Direct · Stockholm AI", why: "Apply straight on the career page of the companies you want most, and message someone on the team the same day. Track each one under Roles and People.", status: "todo", notes: "Start list: Lovable, Tandem Health, evroc, Tendium." },
  { name: "Hacker News · Who is hiring", url: "https://news.ycombinator.com/jobs", focus: "Monthly thread · founders", why: "Founders post directly in the monthly thread, so replies go to a decision maker. Check it at the start of each month.", status: "todo", notes: "" },
  { name: "Arbetsförmedlingen · Platsbanken", url: "https://arbetsformedlingen.se/platsbanken", focus: "Required from 19 Dec", why: "You have to be registered here for a-kassa and report the roles you apply for each month. This tracker is your record.", status: "todo", notes: "Register on 19 December, the first unemployed day." },
];
